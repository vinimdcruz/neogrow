from sqlalchemy.orm import Session
from . import models, schemas
from .auth.hashing import get_password_hash
from datetime import date
from typing import List

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_baby(db: Session, baby: schemas.BabyCreate, user_id: int):
    db_baby = models.Baby(**baby.dict(), user_id=user_id)
    db.add(db_baby)
    db.commit()
    db.refresh(db_baby)
    return db_baby

def get_baby(db: Session, baby_id: int):
    return db.query(models.Baby).filter(models.Baby.id == baby_id).first()

def get_babies_by_user(db: Session, user_id: int):
    return db.query(models.Baby).filter(models.Baby.user_id == user_id).all()

def create_baby_data(db: Session, baby_data: schemas.BabyDataCreate, baby_id: int):
    db_baby_data = models.BabyData(**baby_data.dict(), baby_id=baby_id)
    db.add(db_baby_data)
    db.commit()
    db.refresh(db_baby_data)
    return db_baby_data

def get_baby_data(db: Session, baby_id: int):
    return db.query(models.BabyData).filter(models.BabyData.baby_id == baby_id).all()

def get_baby_data_by_date_range(db: Session, baby_id: int, start_date: date, end_date: date):
    return db.query(models.BabyData).filter(
        models.BabyData.baby_id == baby_id,
        models.BabyData.date >= start_date,
        models.BabyData.date <= end_date
    ).all()
