from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    babies = relationship("Baby", back_populates="user")

class Baby(Base):
    __tablename__ = "babies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    birth_date = Column(Date, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="babies")
    growth_data = relationship("BabyData", back_populates="baby", cascade="all, delete-orphan")

class BabyData(Base):
    __tablename__ = "baby_data"

    id = Column(Integer, primary_key=True, index=True)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    head_circumference = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    baby_id = Column(Integer, ForeignKey('babies.id'))
    baby = relationship("Baby", back_populates="growth_data")
