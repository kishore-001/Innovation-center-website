from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json

router = APIRouter()

class User(BaseModel):
    username: str

@router.post("/api/add/user")
async def add_user(user: User):
    try:
        with open("../Data/data.json", "r+", encoding="utf-8") as file:
            data = json.load(file)
            if user.username in data["allowed_user"]:
                raise HTTPException(status_code=400, detail="User already exists")
            data["allowed_user"][user.username] = {}
            file.seek(0)
            json.dump(data, file, indent=4)
            file.truncate()
        return {"message": "User added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
