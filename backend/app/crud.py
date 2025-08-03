from sqlalchemy.orm import Session
from . import models, schemas
from .auth.hashing import get_password_hash
from datetime import date
from typing import List
from app.schemas import Gender

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

def create_baby(db: Session, baby: schemas.BabyCreate, user_id: int) -> schemas.Baby:
    baby_data = baby.dict()
    baby_data["gender"] = baby.gender.to_db()  # "M" or "F" for the database

    db_baby = models.Baby(**baby_data, user_id=user_id)
    db.add(db_baby)
    db.commit()
    db.refresh(db_baby)

    # Converte "M"/"F" de volta para Gender Enum antes de retornar
    return schemas.Baby(
        id=db_baby.id,
        name=db_baby.name,
        birth_date=db_baby.birth_date,
        gender=Gender.from_db(db_baby.gender),
        user_id=db_baby.user_id,
        created_at=db_baby.created_at,
        updated_at=db_baby.updated_at,
        deleted_at=db_baby.deleted_at,
        growth_data=[],  # or use another CRUD to fetch growth data if needed
    )



def get_baby(db: Session, baby_id: int):
    db_baby = db.query(models.Baby).filter(models.Baby.id == baby_id).first()
    if db_baby:
        return schemas.Baby(
            id=db_baby.id,
            name=db_baby.name,
            birth_date=db_baby.birth_date,
            gender=Gender.from_db(db_baby.gender),  # <- converte de 'M'/'F' para Enum
            user_id=db_baby.user_id,
            created_at=db_baby.created_at,
            updated_at=db_baby.updated_at,
            deleted_at=db_baby.deleted_at,
            growth_data=[]  # pode ser populado com dados se necessário
        )
    return None


def get_babies_by_user(db: Session, user_id: int) -> List[schemas.Baby]:
    db_babies = db.query(models.Baby).filter(models.Baby.user_id == user_id).all()
    return [
        schemas.Baby(
            id=baby.id,
            name=baby.name,
            birth_date=baby.birth_date,
            gender=Gender.from_db(baby.gender),
            user_id=baby.user_id,
            created_at=baby.created_at,
            updated_at=baby.updated_at,
            deleted_at=baby.deleted_at,
            growth_data=[]
        )
        for baby in db_babies
    ]


def create_baby_data(db: Session, baby_data: schemas.BabyDataCreate, baby_id: int):
    db_baby_data = models.BabyData(**baby_data.dict(), baby_id=baby_id)
    db.add(db_baby_data)
    db.commit()
    db.refresh(db_baby_data)
    return db_baby_data

def get_baby_data(db: Session, baby_id: int):
    return db.query(models.BabyData).filter(models.BabyData.baby_id == baby_id, models.BabyData.deleted_at == None).all()

def get_single_baby_data(db: Session, baby_id: int, data_id: int):
    return db.query(models.BabyData).filter(
        models.BabyData.id == data_id,
        models.BabyData.baby_id == baby_id,
        models.BabyData.deleted_at == None
    ).first()

def get_baby_data_by_date_range(db: Session, baby_id: int, start_date: date, end_date: date):
    return db.query(models.BabyData).filter(
        models.BabyData.baby_id == baby_id,
        models.BabyData.date >= start_date,
        models.BabyData.date <= end_date,
        models.BabyData.deleted_at == None
    ).all()

def delete_baby_data(db: Session, data_id: int):
    from datetime import datetime
    db_baby_data = db.query(models.BabyData).filter(models.BabyData.id == data_id).first()
    if db_baby_data:
        db_baby_data.deleted_at = datetime.utcnow()
        db.commit()
        return True
    return False
