from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, models
from ..database import get_db
from ..auth.oauth2 import get_current_user

router = APIRouter()

@router.post("/babies/", response_model=schemas.Baby)
def create_baby(
    baby: schemas.BabyCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_baby(db=db, baby=baby, user_id=current_user.id)

@router.get("/babies/{baby_id}/", response_model=schemas.Baby)
def read_baby(
    baby_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_baby = crud.get_baby(db, baby_id=baby_id)
    if db_baby is None:
        raise HTTPException(status_code=404, detail="Baby not found")
    if db_baby.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to access this baby's data")
    return db_baby

@router.get("/babies/", response_model=List[schemas.Baby])
def read_user_babies(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_babies_by_user(db, user_id=current_user.id)