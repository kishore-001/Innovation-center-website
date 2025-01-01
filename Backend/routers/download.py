from fastapi.responses import FileResponse
import os
from fastapi import APIRouter, HTTPException


router = APIRouter()

@router.get("/api/download")
async def download_file():
    file_path = "../Data/data.xlsx"
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename="data.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    else:
        raise HTTPException(status_code=404, detail="File not found")