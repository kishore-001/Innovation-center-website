from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import pandas as pd

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class StatusUpdate(BaseModel):
    ID: int
    Emp_Id: int
    Date: str
    Status: str

@app.get("/api")
def read_root():
    return {"message": "Welcome to the Innovation Center API"}

# form data 

@app.get("/api/data")
def get_data():
    # Load the Excel file
    df = pd.read_excel("../Data/data.xlsx")   
    # Convert the DataFrame to JSON
    data_json = df.to_json(orient="records")
    data_json_encoded = json.loads(data_json)
    return {"data": data_json_encoded}

# review request

@app.put("/api/update-status")
def update_status(updates: list[StatusUpdate]):
    try:
        # Read the existing data from the file
        with open("../Data/data.json", "r", encoding="utf-8") as f:
            data = json.load(f)   
        # Create a dictionary for quick lookup of existing reviews by ID
        existing_reviews = {review["ID"]: review for review in data.get("review", [])}
        
        # Update existing reviews or add new ones
        for update in updates:
            if update.ID in existing_reviews:
                existing_reviews[update.ID]["Status"] = update.Status
                existing_reviews[update.ID]["Emp_Id"] = update.Emp_Id
                existing_reviews[update.ID]["Date"] = update.Date
            else:
                existing_reviews[update.ID] = update.dict()
        
        # Convert the dictionary back to a list
        data["review"] = list(existing_reviews.values())
        
        # Write the updated data back to the file
        with open("../Data/data.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        
        return {"message": "Status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e