from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to NeoGrow API"}

def test_create_baby_data():
    payload = {
        "weight": 3.5,
        "height": 50.0,
        "head_circumference": 34.0,
        "date": "2025-01-01"
    }
    response = client.post("/api/baby/", json=payload)
    assert response.status_code == 200
    assert response.json()["weight"] == 3.5
