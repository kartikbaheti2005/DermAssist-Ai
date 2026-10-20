"""EfficientNet-B0 V1 inference engine for DermAssist AI."""

from __future__ import annotations

from pathlib import Path
from threading import Lock

import torch

from .models import MODEL_VERSION, create_model
from .preprocess import preprocess_image


BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_MODEL_PATH = BASE_DIR / "ml_models" / "weights" / "dermassist_b0_v1.pth"

THRESHOLD = 0.50
NEGATIVE_LABEL = "other_non_cancer"
POSITIVE_LABEL = "cancer_related_high_risk"

_MODEL = None
_MODEL_LOCK = Lock()


def _load_checkpoint(model_path: Path):
    """Load the trusted production checkpoint created by the training pipeline."""
    if not model_path.exists():
        raise FileNotFoundError(
            f"DermAssist AI model not found: {model_path}. "
            "Place dermassist_b0_v1.pth in backend/ml_models/weights/."
        )

    # The production artifact is a trusted application-owned checkpoint and
    # contains a model_state_dict plus metadata. weights_only=False is required
    # for this checkpoint format.
    return torch.load(
        model_path,
        map_location="cpu",
        weights_only=False,
    )


def load_model(model_path: str | Path | None = None):
    """Load the model once and cache it for subsequent predictions."""
    global _MODEL

    if _MODEL is not None:
        return _MODEL

    path = Path(model_path) if model_path else DEFAULT_MODEL_PATH

    with _MODEL_LOCK:
        if _MODEL is not None:
            return _MODEL

        checkpoint = _load_checkpoint(path)

        if "model_state_dict" not in checkpoint:
            raise RuntimeError(
                "Invalid DermAssist checkpoint: model_state_dict is missing."
            )

        model = create_model(pretrained=False)
        model.load_state_dict(checkpoint["model_state_dict"])
        model.eval()

        _MODEL = model

    return _MODEL


def get_model_metadata(model_path: str | Path | None = None) -> dict:
    """Return production metadata without changing the cached model."""
    path = Path(model_path) if model_path else DEFAULT_MODEL_PATH
    checkpoint = _load_checkpoint(path)

    return {
        "model_name": checkpoint.get("model_name", "EfficientNet-B0"),
        "model_version": checkpoint.get("model_version", MODEL_VERSION),
        "task": checkpoint.get(
            "task",
            "binary_cancer_related_high_risk_screening",
        ),
        "input_size": checkpoint.get("input_size", 224),
        "class_mapping": checkpoint.get(
            "class_mapping",
            {
                "0": NEGATIVE_LABEL,
                "1": POSITIVE_LABEL,
            },
        ),
        "threshold": checkpoint.get("threshold", THRESHOLD),
        "positive_classes": checkpoint.get(
            "positive_classes",
            ["akiec", "bcc", "mel"],
        ),
    }


def predict_image(
    image_path: str,
    model_path: str | Path | None = None,
) -> dict:
    """Run binary cancer-related high-risk screening on one image."""
    model = load_model(model_path)
    metadata = get_model_metadata(model_path)
    threshold = float(metadata.get("threshold", THRESHOLD))

    tensor = preprocess_image(image_path)

    with torch.inference_mode():
        logit = model(tensor).squeeze().item()
        probability = torch.sigmoid(torch.tensor(logit)).item()

    is_positive = probability >= threshold

    if is_positive:
        label = POSITIVE_LABEL
        risk_level = "high"
        confidence = probability
    else:
        label = NEGATIVE_LABEL
        risk_level = "low"
        confidence = 1.0 - probability

    return {
        "predicted_label": label,
        "confidence_score": round(float(confidence), 6),
        "positive_probability": round(float(probability), 6),
        "risk_level": risk_level,
        "stage_used": "efficientnet_b0_v1",
        "model_version": metadata.get("model_version", MODEL_VERSION),
        "threshold": threshold,
        "task": metadata.get(
            "task",
            "binary_cancer_related_high_risk_screening",
        ),
    }
