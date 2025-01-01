from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
import logging

# 

router = APIRouter()
logger = logging.getLogger(__name__)

class Update(BaseModel):
    Id: int
    Emp_Id: str
    Date: str
    Status: str


@router.put("/api/update/review")
def update_status(updates: list[Update]):
    try:
        # Load existing data from the file
        with open("../Data/data.json", "r", encoding="utf-8") as f:
            data = json.load(f)

        # Create a dictionary of existing reviews
        existing_reviews = {review["Id"]: review for review in data.get("review", [])}

        # Update existing reviews or add new ones
        for update in updates:
            update_dict = update.dict()
            if update_dict["Id"] in existing_reviews:
                existing_reviews[update_dict["Id"]]["Status"] = update_dict["Status"]
                existing_reviews[update_dict["Id"]]["Emp_Id"] = update_dict["Emp_Id"]
                existing_reviews[update_dict["Id"]]["Date"] = update_dict["Date"]
            else:
                existing_reviews[update_dict["Id"]] = update_dict

        # Convert the dictionary back to a list
        data["review"] = list(existing_reviews.values())

        # Write the updated data back to the file
        with open("../Data/data.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        return {"message": "Status updated successfully"}
    except Exception as e:
        logger.error("An error occurred: %s", e)
        raise HTTPException(status_code=500, detail=str(e)) from e
