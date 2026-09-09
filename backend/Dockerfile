FROM python:3.12-slim

WORKDIR /app

# Create a non-root user and group to run the application (privileges dropped before CMD)
RUN groupadd --system appuser && useradd --system --gid appuser --create-home appuser

# Upgrade system packages and install dependencies including PostgreSQL development files and netcat
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    postgresql-client \
    libpq-dev \
    gcc \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /app

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Hand ownership of the application directory to the non-root user
RUN chown -R appuser:appuser /app

# Expose the port the app runs on
EXPOSE 8000

# Drop root privileges before running the application
USER appuser

# Command to run the application
CMD ["/app/entrypoint.sh"]
