from fastapi import APIRouter, HTTPException
import json
import os

router = APIRouter()

@router.delete("/api/delete/review/{review_id}")
def delete_review(review_id: int):
    file_path = '../Data/data.json'
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Data file not found")

    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Check the structure of data
    if not isinstance(data, dict) or 'review' not in data or not isinstance(data['review'], list):
        raise HTTPException(status_code=500, detail="Invalid data structure")

    reviews = data['review']
    review_to_delete = next((review for review in reviews if review['Id'] == review_id), None)
    
    if review_to_delete is None:
        raise HTTPException(status_code=404, detail="Review not found")

    reviews.remove(review_to_delete)

    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

    return {"message": "Review deleted successfully"}