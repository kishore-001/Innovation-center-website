import pandas as pd
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/api/fetch/data")
def get_data():
    try:
        # Load the Excel file, skipping the first row
        df = pd.read_excel("../Data/data.xlsx")
        
        # Ensure the DataFrame has enough columns
        required_indices = [0,7, 2, 6, 15, 9, 24]  # Adjust indices based on your column positions
        # Strip and sanitize the 'Employee ID' column (index 7)
        df.iloc[:, 7] = df.iloc[:, 7].str.strip().str.upper()
        # Select the required columns by index
        df_selected = df.iloc[:, required_indices]
        
        # Rename columns for clarity
        df_selected.columns = [
            "ID",
            "Employee ID",
            "Start time",
            "Name",
            "Idea",
            "Department",
            "Status"
        ]
        
        # Replace NaN values with None
        df_selected = df_selected.where(pd.notnull(df_selected), None)
        
        # Convert the DataFrame to JSON
        data_json = df_selected.to_dict(orient="records")
        
        return {"data": data_json}
    
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail="File not found") from exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e