from sqlalchemy import Column, Integer, Float, String, Date
from app.database import Base

class BabyData(Base):
    __tablename__ = "baby_data"

    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    head_circumference = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
