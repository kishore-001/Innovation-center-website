from fastapi import APIRouter
from pydantic import BaseModel
import json

router = APIRouter()

class User(BaseModel):
    username: str
    password: str

@router.put("/api/register")
def register(request: User):
    data = request.dict()  # Convert the request object to a dictionary
    file_path = '../Data/data.json'
    
    # Open the JSON file
    with open(file_path, 'r+', encoding='utf-8') as file:
        try:
            # Load existing data
            json_data = json.load(file)
        except json.JSONDecodeError:
            return {"error": "Invalid JSON in file"}
        
        # Ensure the 'credentials' field exists and is a dictionary
        if not isinstance(json_data.get("credentials"), dict):
            return {"error": "The 'credentials' field is missing or invalid"}
        
        # Update the credentials field
        json_data["credentials"][data["username"]] = data["password"]
        
        # Write back to the file
        file.seek(0)
        file.truncate()  # Clear the file before writing
        json.dump(json_data, file, indent=4)
    
    return {"message": "User registered successfully"}
