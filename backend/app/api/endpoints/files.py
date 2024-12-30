from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.storage import StorageService
import uuid
import os

router = APIRouter()
storage = StorageService()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload a file to storage."""
    try:
        # Generate unique filename with original name
        ext = os.path.splitext(file.filename)[1]
        uuid_str = str(uuid.uuid4())
        # Create filename with UUID to ensure uniqueness
        unique_filename = f"{os.path.splitext(file.filename)[0]}_{uuid_str}{ext}"
        path = f"uploads/{unique_filename}"
        
        # Read file content
        content = await file.read()
        
        # Upload and get URL
        url = await storage.upload_file(
            file=content,
            path=path,
            content_type=file.content_type
        )
        
        return {
            "url": url,
            "filename": file.filename,
            "path": path,
            "content_type": file.content_type
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_files():
    """List all files in storage."""
    try:
        files = await storage.list_files()
        return {"files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{file_id}")
async def get_file(file_id: str):
    """Get file endpoint placeholder"""
    return {"file_id": file_id}

@router.delete("/{file_id}")
async def delete_file(file_id: str):
    """Delete file endpoint placeholder"""
    return {"message": f"File {file_id} deleted"} 