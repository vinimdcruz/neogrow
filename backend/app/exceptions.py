"""
Database exception handlers for graceful error recovery.
"""
from fastapi import Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import OperationalError, DBAPIError, DisconnectionError
import logging

logger = logging.getLogger(__name__)


async def database_exception_handler(request: Request, exc: Exception):
    """
    Handle database connection errors gracefully.
    """
    logger.error(f"Database error on {request.url}: {exc}")
    
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "detail": "Database temporarily unavailable. Please try again in a moment.",
            "type": "database_error"
        }
    )


def register_exception_handlers(app):
    """
    Register all database exception handlers with the FastAPI app.
    """
    app.add_exception_handler(OperationalError, database_exception_handler)
    app.add_exception_handler(DBAPIError, database_exception_handler)
    app.add_exception_handler(DisconnectionError, database_exception_handler)
