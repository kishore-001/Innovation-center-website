from fastapi import File, UploadFile, APIRouter
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = os.path.abspath("../Data")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, "data.xlsx")

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"message": "File uploaded successfully."}
    except OSError as e:
        return {"error": str(e)}