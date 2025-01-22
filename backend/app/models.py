from sqlalchemy import Column, Integer, Float, String, Date
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class BabyData(Base):
    __tablename__ = "baby_data"

    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    head_circumference = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
