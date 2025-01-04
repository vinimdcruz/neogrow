from sqlalchemy.orm import Session
from app.models import BabyData
from app.schemas import BabyDataCreate

def create_baby_data(db: Session, data: BabyDataCreate):
    db_data = BabyData(**data.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

def get_baby_data(db: Session):
    return db.query(BabyData).all()
