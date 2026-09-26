"""Inference preprocessing for DermAssist AI EfficientNet-B0 V1.

This intentionally matches the validation/test preprocessing used during
training. Do not add CLAHE, sharpening, color normalization, or a different
crop here unless the model is retrained with the same preprocessing.
"""

from PIL import Image
from torchvision import transforms


IMAGE_SIZE = 224
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]


inference_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=IMAGENET_MEAN,
        std=IMAGENET_STD,
    ),
])


def preprocess_image(image_path: str):
    """Load and transform an uploaded image into a model-ready tensor."""
    with Image.open(image_path) as image:
        image = image.convert("RGB")
        tensor = inference_transform(image)

    return tensor.unsqueeze(0)
