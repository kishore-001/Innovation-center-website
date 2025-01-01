from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt
import json

# Router
router = APIRouter()

# Secret key for JWT
SECRET_KEY = "Innovation_Center"  # Replace with a secure key

class LoginRequest(BaseModel):
    username: str
    password: str

# Function to create JWT tokens
def create_token(username: str, role: str):
    expiration = datetime.utcnow() + timedelta(hours=1)  # Token valid for 1 hour
    payload = {
        "sub": username,
        "role": role,
        "exp": expiration
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

@router.put("/api/login")
def login(request: LoginRequest):
    # Load user data
    with open('../Data/data.json', encoding='utf-8') as f:
        data = json.load(f)

    username = request.username
    password = request.password

    # Check credentials for staff
    if username in data["allowed_user"] and data["credentials"].get(username) == password:
        role = "staff"
    # Check credentials for admin
    elif username == data["admin_credentials"]["username"] and password == data["admin_credentials"].get("password"):
        role = "admin"
    else:
        # Invalid credentials
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate token
    token = create_token(username, role)

    return {"token": token}
