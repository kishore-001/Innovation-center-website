from fastapi import APIRouter 
import json
from pathlib import Path


#  this API is used to send the review data to the admin page review box


router = APIRouter()

data_file = Path("../Data/data.json")
@router.get("/api/fetch/review")
def fetch_review():
    with data_file.open() as f:
        data = json.load(f)
    return data.get("review", {})