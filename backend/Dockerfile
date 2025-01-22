# Use a specific Python version as the base image
FROM python:3.12-slim

# Set environment variables to ensure that Python outputs logs and errors in the terminal
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt into the container (assuming it's in ./backend)
COPY requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r /app/requirements.txt

# Copy the backend application code into the container
COPY . /app

# Expose the port FastAPI will run on
EXPOSE 8000

# Run the FastAPI app with Uvicorn when the container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]
