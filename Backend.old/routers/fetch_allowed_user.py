from fastapi import APIRouter
import json

router = APIRouter()


@router.get("/api/fetch/allowed_user")
def allowed_user():
    data_file = "../Data/data.json"

    with open(data_file, encoding='utf-8') as f:
        data = json.load(f)

    return data.get("allowed_user")