from fastapi import APIRouter, HTTPException, Request
from jose import JWTError, jwt

router = APIRouter()


@router.get("/api/decode")
def decode(request: Request):

    SECRET_KEY = "Innovation_Center"
    ALGORITHM = "HS256"

    token = request.cookies.get("token")
    if not token:
        raise HTTPException(
            status_code=400, detail="JWT token not found in cookies")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        role = payload.get("role")
        username = payload.get("sub")
        if role is None:
            raise HTTPException(
                status_code=400, detail="Role not found in token")
        return {"username": username, "role": role}
    except JWTError as exc:
        raise HTTPException(
            status_code=400, detail="Invalid JWT token") from exc
