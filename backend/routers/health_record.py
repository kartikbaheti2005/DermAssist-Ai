from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from database.session import get_db

from core.dependencies import (
    get_current_user,
)

from schemas.health_record import (
    HealthRecordCreateRequest,
    HealthRecordUpdateRequest,
)

from services.health_record_service import (
    create_health_record,
    get_user_health_records,
    get_health_record,
    update_health_record,
    delete_health_record,
    get_latest_record,
)

router = APIRouter(
    prefix="/health-records",
    tags=["Health Records"],
)


# =====================================================
# Create Health Record
# =====================================================

@router.post("")
def create_record(
    payload: HealthRecordCreateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    record = create_health_record(
        db,
        current_user,
        payload,
    )

    return {
        "message": "Health record created",
        "record": record.to_dict(),
    }


# =====================================================
# Get All Records
# =====================================================

@router.get("")
def get_records(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    records = get_user_health_records(
        db,
        current_user.id,
    )

    return [
        record.to_dict()
        for record in records
    ]


# =====================================================
# Get Latest Record
# =====================================================

@router.get("/latest")
def latest_record(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    record = get_latest_record(
        db,
        current_user.id,
    )

    if not record:
        return {
            "message": "No health records found"
        }

    return record.to_dict()


# =====================================================
# Get Single Record
# =====================================================

@router.get("/{record_id}")
def get_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    record = get_health_record(
        db,
        record_id,
        current_user.id,
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Health record not found",
        )

    return record.to_dict()


# =====================================================
# Update Record
# =====================================================

@router.put("/{record_id}")
def update_record(
    record_id: int,
    payload: HealthRecordUpdateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    record = get_health_record(
        db,
        record_id,
        current_user.id,
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Health record not found",
        )

    updated = update_health_record(
        db,
        record,
        payload,
    )

    return {
        "message": "Health record updated",
        "record": updated.to_dict(),
    }


# =====================================================
# Delete Record
# =====================================================

@router.delete("/{record_id}")
def delete_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        delete_health_record(
            db,
            record_id,
            current_user.id,
        )

        return {
            "message":
                "Health record deleted"
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )