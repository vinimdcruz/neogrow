import os
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import Pool
import logging

logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/neogrow")

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,          # Test connections before using them
    pool_size=5,                 # Number of connections to keep in pool
    max_overflow=10,             # Maximum overflow connections
    pool_recycle=3600,           # Recycle connections after 1 hour
    pool_timeout=30,             # Timeout for getting connection from pool
    connect_args={
        "connect_timeout": 10,   # PostgreSQL connection timeout in seconds
        "options": "-c statement_timeout=30000"  # 30 second query timeout
    }
)

# Event listener to handle disconnections gracefully
@event.listens_for(Pool, "connect")
def receive_connect(dbapi_conn, connection_record):
    logger.info("Database connection established")

@event.listens_for(Pool, "checkout")
def receive_checkout(dbapi_conn, connection_record, connection_proxy):
    logger.debug("Connection checked out from pool")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """
    Database session dependency with automatic recovery from connection failures.
    """
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database error occurred: {e}")
        db.rollback()
        raise
    finally:
        db.close()
