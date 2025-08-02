from pydantic import BaseModel
from datetime import date, datetime
from typing import List, Optional
from enum import Enum

class Gender(str, Enum):
    male = "male"
    female = "female"

    def to_db(self) -> str:
        return "M" if self == Gender.male else "F"

    @classmethod
    def from_db(cls, db_value: str) -> "Gender":
        if db_value == "M":
            return cls.male
        elif db_value == "F":
            return cls.female
        raise ValueError(f"Invalid DB gender value: {db_value}")

class BabyDataBase(BaseModel):
    weight: float
    height: float
    head_circumference: float
    date: date

class BabyDataCreate(BabyDataBase):
    pass


class BabyData(BabyDataBase):
    id: int
    baby_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]

    class Config:
        orm_mode = True

class BabyBase(BaseModel):
    name: str
    birth_date: date
    gender: Gender

class BabyCreate(BabyBase):
    pass


class Baby(BabyBase):
    id: int
    user_id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]
    growth_data: List[BabyData] = []

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]
    babies: List[Baby] = []

    class Config:
        from_attributes = True
