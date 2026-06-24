from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_user,
)

from services.image_service import (
    upload_image,
    get_image,
    get_user_images,
    delete_image,
    get_lesion_history,
)

router = APIRouter(
    prefix="/images",
    tags=["Images"],
)


# =====================================================
# Upload Image
# =====================================================

@router.post("/upload")
def upload_image_route(
    file: UploadFile = File(...),
    body_part: str | None = Form(None),
    lesion_id: str | None = Form(None),
    is_followup: bool = Form(False),

    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    image = upload_image(
        db=db,
        current_user=current_user,
        file=file,
        body_part=body_part,
        lesion_id=lesion_id,
        is_followup=is_followup,
    )

    return {
        "message": "Image uploaded successfully",
        "image": image.to_dict(),
    }


# =====================================================
# Get All User Images
# =====================================================

@router.get("")
def get_images(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    images = get_user_images(
        db,
        current_user.id,
    )

    return [
        image.to_dict()
        for image in images
    ]

# =====================================================
# Lesion Tracking History
# =====================================================

@router.get("/lesion/{lesion_id}")
def lesion_history(
    lesion_id: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    images = get_lesion_history(
        db,
        lesion_id,
        current_user.id,
    )

    return [
        image.to_dict()
        for image in images
    ]

# =====================================================
# Get Single Image
# =====================================================

@router.get("/{image_id}")
def get_image_route(
    image_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    image = get_image(
        db,
        image_id,
        current_user.id,
    )

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Image not found",
        )

    return image.to_dict()


# =====================================================
# Delete Image
# =====================================================

@router.delete("/{image_id}")
def delete_image_route(
    image_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:

        delete_image(
            db,
            image_id,
            current_user.id,
        )

        return {
            "message":
                "Image deleted successfully"
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )

