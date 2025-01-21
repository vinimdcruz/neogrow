from pydantic import ConfigDict, BaseModel
from datetime import date

class BabyDataCreate(BaseModel):
    weight: float
    height: float
    head_circumference: float
    date: date

class BabyDataResponse(BabyDataCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
