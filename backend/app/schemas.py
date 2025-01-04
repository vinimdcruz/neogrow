from pydantic import BaseModel
from datetime import date

class BabyDataCreate(BaseModel):
    weight: float
    height: float
    head_circumference: float
    date: date

class BabyDataResponse(BabyDataCreate):
    id: int

    class Config:
        orm_mode = True
