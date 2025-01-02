import os
import shutil
from fastapi import APIRouter, File, UploadFile
from openpyxl import load_workbook

router = APIRouter()

UPLOAD_FOLDER = os.path.abspath("../Data")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, "data.xlsx")

    try:
        # Save the uploaded file first
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Now, open the Excel file and delete the first row
        wb = load_workbook(file_path)
        sheet = wb.active

        # Delete the first row
        sheet.delete_rows(1)

        # Save the modified file back
        wb.save(file_path)

        return {"message": "File uploaded and first row deleted successfully."}
    except (shutil.Error, IOError, ValueError) as e:
        return {"error": f"An error occurred: {str(e)}"}
