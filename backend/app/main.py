from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import baby_data, baby, auth

app = FastAPI(redirect_slashes=False)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(baby.router, prefix="/api", tags=["babies"])
app.include_router(baby_data.router, prefix="/api", tags=["baby-data"])

@app.get("/")
def read_root():
    return {"message": "Welcome to NeoGrow API"}
