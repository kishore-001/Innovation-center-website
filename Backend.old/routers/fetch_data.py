from fastapi import APIRouter
import pandas as pd
import json

# This Api is used to send the form data


router = APIRouter()

@router.get("/api/fetch/data")
def get_data():
    # Load the Excel file
    df = pd.read_excel("../Data/data.xlsx")   
    # Convert the DataFrame to JSON
    data_json = df.to_json(orient="records")
    data_json_encoded = json.loads(data_json)
    return {"data": data_json_encoded}
