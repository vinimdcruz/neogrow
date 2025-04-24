#!/bin/sh

set -e

# Function to wait for postgres
wait_for_postgres() {
    echo "Waiting for PostgreSQL..."
    while ! nc -z db 5432; do
        sleep 0.1
    done
    echo "PostgreSQL started"
}

# Wait for postgres to be ready
wait_for_postgres

# Initialize database
echo "Initializing database..."
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U $POSTGRES_USER -d postgres -c "SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB'" | grep -q 1 || PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U $POSTGRES_USER -d postgres -c "CREATE DATABASE $POSTGRES_DB"

# Run migrations
echo "Running database migrations..."
alembic upgrade head

# Start the FastAPI application
echo "Starting FastAPI application..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

exec "$@"
