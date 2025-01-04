from fastapi import FastAPI
from app.routes import baby_data

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to NeoGrow API"}

app.include_router(baby_data.router, prefix="/api/baby", tags=["Baby Data"])
