# backend/ml/preprocess.py

from PIL import Image as PILImage
import numpy as np
import cv2


def apply_clahe(img_array: np.ndarray) -> np.ndarray:
    """
    Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    to improve local skin texture contrast.
    """

    lab = cv2.cvtColor(img_array, cv2.COLOR_RGB2LAB)

    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    lab[:, :, 0] = clahe.apply(lab[:, :, 0])

    return cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)


def apply_unsharp_mask(
    img_array: np.ndarray,
    strength: float = 0.6
) -> np.ndarray:
    """
    Enhance lesion texture details.
    """

    blurred = cv2.GaussianBlur(
        img_array,
        (0, 0),
        3
    )

    sharpened = cv2.addWeighted(
        img_array,
        1 + strength,
        blurred,
        -strength,
        0
    )

    return np.clip(
        sharpened,
        0,
        255
    ).astype(np.uint8)


def normalize_color(
    img_array: np.ndarray
) -> np.ndarray:
    """
    Normalize image color channels to reduce
    lighting and white-balance variations.
    """

    result = img_array.copy().astype(np.float32)

    for channel_idx in range(3):

        channel = result[:, :, channel_idx]

        p2 = np.percentile(channel, 2)
        p98 = np.percentile(channel, 98)

        if p98 > p2:
            result[:, :, channel_idx] = np.clip(
                (channel - p2) / (p98 - p2) * 255,
                0,
                255
            )

    return result.astype(np.uint8)


def crop_lesion(
    img_array: np.ndarray,
    margin: float = 0.10
) -> np.ndarray:
    """
    Crop image center area where lesion
    is most likely located.
    """

    h, w = img_array.shape[:2]

    margin_h = int(h * margin)
    margin_w = int(w * margin)

    cropped = img_array[
        margin_h:h - margin_h,
        margin_w:w - margin_w
    ]

    if cropped.shape[0] > 50 and cropped.shape[1] > 50:
        return cropped

    return img_array


def preprocess_phone_photo(
    image: PILImage.Image
) -> PILImage.Image:
    """
    Full preprocessing pipeline for phone images.

    Steps:
    1. Center crop
    2. CLAHE enhancement
    3. Color normalization
    4. Texture sharpening
    """

    img_array = np.array(
        image.convert("RGB")
    )

    img_array = crop_lesion(img_array)

    img_array = apply_clahe(img_array)

    img_array = normalize_color(img_array)

    img_array = apply_unsharp_mask(
        img_array,
        strength=0.5
    )

    return PILImage.fromarray(img_array)