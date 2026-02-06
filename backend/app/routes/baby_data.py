from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from .. import crud, schemas, models
from ..database import get_db
from ..auth.oauth2 import get_current_user

router = APIRouter()

async def verify_baby_ownership(
    baby_id: int,
    current_user: models.User,
    db: Session
) -> models.Baby:
    baby = crud.get_baby(db, baby_id=baby_id)
    if baby is None:
        raise HTTPException(status_code=404, detail="Baby not found")
    if baby.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this baby's data")
    return baby

@router.post("/babies/{baby_id}/data", response_model=schemas.BabyData)
async def create_baby_data(
    baby_id: int,
    baby_data: schemas.BabyDataCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    await verify_baby_ownership(baby_id, current_user, db)
    return crud.create_baby_data(db=db, baby_data=baby_data, baby_id=baby_id)

@router.get("/babies/{baby_id}/data", response_model=List[schemas.BabyData])
async def read_baby_data(
    baby_id: int,
    start_date: date = None,
    end_date: date = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    await verify_baby_ownership(baby_id, current_user, db)
    
    if start_date and end_date:
        return crud.get_baby_data_by_date_range(db, baby_id, start_date, end_date)
    return crud.get_baby_data(db, baby_id)

@router.delete("/babies/{baby_id}/data/{data_id}")
async def delete_baby_data(
    baby_id: int,
    data_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    await verify_baby_ownership(baby_id, current_user, db)
    
    baby_data = crud.get_single_baby_data(db, data_id=data_id, baby_id=baby_id)
    if not baby_data:
        raise HTTPException(status_code=404, detail="Baby data not found")
    
    crud.delete_baby_data(db=db, data_id=data_id)
    return {"detail": "Baby data deleted successfully"}
