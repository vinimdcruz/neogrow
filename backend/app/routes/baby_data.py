from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import BabyDataCreate, BabyDataResponse
from app.crud import create_baby_data, get_baby_data
from app.database import get_db

router = APIRouter()

@router.post("", response_model=BabyDataResponse)
def create_data(data: BabyDataCreate, db: Session = Depends(get_db)):
    return create_baby_data(db=db, data=data)

@router.get("", response_model=list[BabyDataResponse])
def read_data(db: Session = Depends(get_db)):
    return get_baby_data(db=db)
