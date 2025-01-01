import json

from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.delete("/api/delete/user/{username}")
async def delete_user(username: str):
    try:
        with open("../Data/data.json", "r+", encoding="utf-8") as file:
            data = json.load(file)
            if username not in data["allowed_user"]:
                raise HTTPException(status_code=404, detail="User not found")
            del data["allowed_user"][username]
            file.seek(0)
            json.dump(data, file, indent=4)
            file.truncate()
        return {"message": "User removed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
