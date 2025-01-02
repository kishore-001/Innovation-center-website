import pandas as pd
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Define the request body model

class StatusUpdateRequest(BaseModel):
    Id: int
    Status: str


@router.put("/api/update/status")
async def update_status(request: StatusUpdateRequest):
    # Load the Excel file
    file_path = "../Data/data.xlsx"
    df = pd.read_excel(file_path)

    # Find the row with the matching ID
    row_index = df.index[df["ID"] == request.Id].tolist()

    if not row_index:
        raise HTTPException(status_code=404, detail="ID not found")

    # Update the status
    df.at[row_index[0], "Status"] = request.Status

    # Save the updated Excel file
    df.to_excel(file_path, index=False)

    return {"message": "Status updated successfully"}

