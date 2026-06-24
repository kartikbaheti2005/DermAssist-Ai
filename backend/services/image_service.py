import os
import uuid

from fastapi import UploadFile
from sqlalchemy.orm import Session

from models.image import Image
from models.user import User


# =====================================================
# Configuration
# =====================================================

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


# =====================================================
# Save Uploaded File
# =====================================================

def save_uploaded_file(
    file: UploadFile,
):
    extension = (
        os.path.splitext(
            file.filename
        )[1]
        .lower()
    )

    filename = (
        f"{uuid.uuid4()}"
        f"{extension}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        filename,
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            file.file.read()
        )

    return (
        filename,
        file_path,
    )


# =====================================================
# Upload Image
# =====================================================

def upload_image(
    db: Session,
    current_user: User,
    file: UploadFile,
    body_part: str | None = None,
    lesion_id: str | None = None,
    is_followup: bool = False,
):
    filename, path = (
        save_uploaded_file(
            file
        )
    )

    image = Image(
        user_id=current_user.id,

        image_name=filename,

        image_path=path,

        image_format=file.content_type,

        image_size_kb=(
            round(
                os.path.getsize(path)
                / 1024
            )
        ),

        lesion_id=lesion_id,

        body_part=body_part,

        is_followup=is_followup,
    )

    db.add(image)

    db.commit()

    db.refresh(image)

    return image


# =====================================================
# Get Image
# =====================================================

def get_image(
    db: Session,
    image_id: int,
    user_id: int,
):
    return (
        db.query(Image)
        .filter(
            Image.id == image_id,
            Image.user_id == user_id,
        )
        .first()
    )


# =====================================================
# Get User Images
# =====================================================

def get_user_images(
    db: Session,
    user_id: int,
):
    return (
        db.query(Image)
        .filter(
            Image.user_id == user_id
        )
        .order_by(
            Image.uploaded_at.desc()
        )
        .all()
    )


# =====================================================
# Delete Image
# =====================================================

def delete_image(
    db: Session,
    image_id: int,
    user_id: int,
):
    image = (
        db.query(Image)
        .filter(
            Image.id == image_id,
            Image.user_id == user_id,
        )
        .first()
    )

    if not image:
        raise ValueError(
            "Image not found"
        )

    if (
        image.image_path
        and os.path.exists(
            image.image_path
        )
    ):
        os.remove(
            image.image_path
        )

    db.delete(image)

    db.commit()

    return True


# =====================================================
# Get Followup Images
# =====================================================

def get_lesion_history(
    db: Session,
    lesion_id: str,
    user_id: int,
):
    return (
        db.query(Image)
        .filter(
            Image.user_id == user_id,
            Image.lesion_id == lesion_id,
        )
        .order_by(
            Image.uploaded_at.asc()
        )
        .all()
    )