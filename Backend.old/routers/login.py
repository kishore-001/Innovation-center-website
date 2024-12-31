from fastapi import APIRouter

router = APIRouter()


@router.post("/api/login")
def login():
    pass