"""Model architecture used by DermAssist AI V1."""

import torch.nn as nn
from torchvision.models import EfficientNet_B0_Weights, efficientnet_b0


MODEL_VERSION = "dermassist-b0-v1"


def create_model(pretrained: bool = False):
    """Create the exact EfficientNet-B0 architecture used for V1 training."""
    model = efficientnet_b0(
        weights=EfficientNet_B0_Weights.DEFAULT if pretrained else None
    )
    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        1,
    )
    return model
