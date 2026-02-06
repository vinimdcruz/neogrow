from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from .routes import baby_data, baby, auth
from .database import get_db
from .exceptions import register_exception_handlers
import logging

logger = logging.getLogger(__name__)

app = FastAPI(redirect_slashes=False)

# Register exception handlers for database errors
register_exception_handlers(app)

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

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint that verifies database connectivity.
    Returns 200 if healthy, raises exception if database is unavailable.
    """
    try:
        # Execute a simple query to verify database connection
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }
