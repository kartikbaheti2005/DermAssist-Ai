from pathlib import Path

import cv2
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image

from .inference import load_model
from .preprocess import preprocess_image


def _find_target_layer(model):
    """
    Find the final convolutional feature layer of EfficientNet-B0.

    torchvision EfficientNet structure:
        model.features[-1][0]
    is the final convolutional block.
    """

    try:
        return model.features[-1][0]
    except (AttributeError, IndexError, TypeError) as exc:
        raise RuntimeError(
            "Unable to locate the EfficientNet-B0 Grad-CAM target layer."
        ) from exc


def generate_gradcam(
    image_path: str,
    model_path: str,
    output_dir: str | Path = "uploads/heatmaps",
):
    """
    Generate Grad-CAM visualization for the positive/high-risk class.

    Returns:
        {
            "heatmap_overlay_path": "...",
            "heatmap_only_path": "..."
        }
    """

    image_path = Path(image_path)
    output_dir = Path(output_dir)

    if not image_path.exists():
        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )

    output_dir.mkdir(
        parents=True,
        exist_ok=True,
    )

    # --------------------------------------------------
    # Load model
    # --------------------------------------------------

    model = load_model(model_path)

    model.eval()

    device = next(model.parameters()).device

    # --------------------------------------------------
    # Locate target convolutional layer
    # --------------------------------------------------

    target_layer = _find_target_layer(model)

    activations = []
    gradients = []

    # --------------------------------------------------
    # Forward hook
    # --------------------------------------------------

    def forward_hook(module, inputs, output):
        activations.append(output)

    # --------------------------------------------------
    # Backward hook
    # --------------------------------------------------

    def backward_hook(module, grad_input, grad_output):
        gradients.append(grad_output[0])

    forward_handle = target_layer.register_forward_hook(
        forward_hook
    )

    backward_handle = target_layer.register_full_backward_hook(
        backward_hook
    )

    try:
        # --------------------------------------------------
        # Preprocess image
        # --------------------------------------------------

        input_tensor = preprocess_image(
            str(image_path)
        ).to(device)
        # --------------------------------------------------
        # Forward pass
        # --------------------------------------------------

        model.zero_grad(set_to_none=True)

        output = model(input_tensor)

        # Binary classifier output
        if output.ndim == 1:
            score = output[0]
        elif output.shape[-1] == 1:
            score = output[0, 0]
        else:
            # For safety if a 2-class output is encountered
            score = output[0, 1]

        # --------------------------------------------------
        # Backward pass
        # --------------------------------------------------

        score.backward()

        if not activations:
            raise RuntimeError(
                "Grad-CAM activation hook did not capture output."
            )

        if not gradients:
            raise RuntimeError(
                "Grad-CAM gradient hook did not capture gradients."
            )

        activation = activations[0]
        gradient = gradients[0]

        # --------------------------------------------------
        # Global average pooling of gradients
        # --------------------------------------------------

        weights = gradient.mean(
            dim=(2, 3),
            keepdim=True,
        )

        # --------------------------------------------------
        # Weighted activation maps
        # --------------------------------------------------

        cam = (
            weights * activation
        ).sum(
            dim=1,
            keepdim=True,
        )

        cam = F.relu(cam)

        # --------------------------------------------------
        # Resize to input image dimensions
        # --------------------------------------------------

        cam = F.interpolate(
            cam,
            size=input_tensor.shape[-2:],
            mode="bilinear",
            align_corners=False,
        )

        cam = cam.squeeze().detach().cpu().numpy()

        # --------------------------------------------------
        # Normalize CAM
        # --------------------------------------------------

        cam -= cam.min()

        max_value = cam.max()

        if max_value > 0:
            cam /= max_value

        heatmap = np.uint8(
            255 * cam
        )

        # OpenCV expects BGR
        heatmap_color = cv2.applyColorMap(
            heatmap,
            cv2.COLORMAP_JET,
        )

        # --------------------------------------------------
        # Load original image
        # --------------------------------------------------

        original = Image.open(
            image_path
        ).convert("RGB")

        original_np = np.array(
            original
        )

        original_bgr = cv2.cvtColor(
            original_np,
            cv2.COLOR_RGB2BGR,
        )

        heatmap_color = cv2.resize(
            heatmap_color,
            (
                original_bgr.shape[1],
                original_bgr.shape[0],
            ),
        )

        # --------------------------------------------------
        # Overlay
        # --------------------------------------------------

        overlay = cv2.addWeighted(
            original_bgr,
            0.60,
            heatmap_color,
            0.40,
            0,
        )

        # --------------------------------------------------
        # Output paths
        # --------------------------------------------------

        stem = image_path.stem

        heatmap_only = (
            output_dir
            / f"{stem}_gradcam.jpg"
        )

        heatmap_overlay = (
            output_dir
            / f"{stem}_gradcam_overlay.jpg"
        )

        # --------------------------------------------------
        # Save
        # --------------------------------------------------

        cv2.imwrite(
            str(heatmap_only),
            heatmap_color,
        )

        cv2.imwrite(
            str(heatmap_overlay),
            overlay,
        )

        return {
            "heatmap_overlay_path": str(
                heatmap_overlay
            ),
            "heatmap_only_path": str(
                heatmap_only
            ),
        }

    finally:
        forward_handle.remove()
        backward_handle.remove()