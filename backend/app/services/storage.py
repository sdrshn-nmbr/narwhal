from typing import BinaryIO, Optional
from supabase import create_client, Client
from app.core.config import settings
import os

class StorageService:
    def __init__(self):
        try:
            self.supabase: Client = create_client(
                settings.SUPABASE_URL,
                settings.SUPABASE_SERVICE_KEY
            )
            self.bucket = settings.SUPABASE_STORAGE_BUCKET
            print(f"Initialized Supabase client with URL: {settings.SUPABASE_URL}")
        except Exception as e:
            print(f"Failed to initialize Supabase client: {str(e)}")
            raise

    async def initialize_bucket(self) -> None:
        """Test storage connection."""
        try:
            # Simple list operation to test connection
            result = self.supabase.storage.from_(self.bucket).list()
            print(f"Successfully connected to bucket '{self.bucket}'. Found {len(result)} files.")
        except Exception as e:
            print(f"Storage connection error - URL: {settings.SUPABASE_URL}, Bucket: {self.bucket}")
            print(f"Error details: {str(e)}")
            raise Exception(f"Storage connection failed: {str(e)}")

    async def upload_file(
        self,
        file: BinaryIO,
        path: str,
        content_type: Optional[str] = None
    ) -> str:
        """Upload a file to storage and return its signed URL."""
        try:
            # Make sure path doesn't start with 'uploads/' since we add it
            if path.startswith("uploads/"):
                path = path[8:]  # Remove 'uploads/' prefix if present
                
            file_path = f"uploads/{path}"
            self.supabase.storage.from_(self.bucket).upload(
                path=file_path,
                file=file,
                file_options={"contentType": content_type} if content_type else None
            )
            
            # Get signed URL valid for 1 hour
            signed_url = self.supabase.storage.from_(self.bucket).create_signed_url(file_path, 3600)
            return {
                "signedURL": signed_url,
                "path": file_path
            }
        except Exception as e:
            print(f"Upload failed for path: {file_path}")
            print(f"Error details: {str(e)}")
            raise Exception(f"Upload failed: {str(e)}")

    async def delete_file(self, path: str) -> None:
        """Delete a file from storage."""
        try:
            self.supabase.storage.from_(self.bucket).remove([path])
        except Exception as e:
            print(f"Delete failed for path: {path}")
            print(f"Error details: {str(e)}")
            raise Exception(f"Delete failed: {str(e)}")

    async def get_file_url(self, path: str, expires_in: int = 3600) -> str:
        """Get a signed URL for file access."""
        try:
            return self.supabase.storage.from_(self.bucket).create_signed_url(path, expires_in)
        except Exception as e:
            print(f"Failed to get URL for path: {path}")
            print(f"Error details: {str(e)}")
            raise Exception(f"Failed to get URL: {str(e)}")

    async def get_file_info(self, path: str) -> dict:
        """Get file metadata."""
        try:
            result = self.supabase.storage.from_(self.bucket).list(path)
            if not result:
                raise Exception("File not found")
            return result[0]
        except Exception as e:
            print(f"Failed to get info for path: {path}")
            print(f"Error details: {str(e)}")
            raise Exception(f"Failed to get file info: {str(e)}")

    async def list_files(self) -> list:
        """List all files in the bucket."""
        try:
            files = []
            # List contents of uploads directory directly
            contents = self.supabase.storage.from_(self.bucket).list("uploads")
            print(f"Raw contents from storage: {contents}")
            
            if not contents:
                return []
            
            for file in contents:
                if not isinstance(file, dict) or file.get("name") == ".emptyFolderPlaceholder":
                    continue
                
                files.append({
                    "name": file.get("name", ""),
                    "size": file.get("metadata", {}).get("size", 0),
                    "created_at": file.get("created_at", ""),
                    "updated_at": file.get("updated_at", ""),
                    "path": f"uploads/{file.get('name', '')}"
                })
            
            print(f"Processed files list: {files}")
            return files
        except Exception as e:
            print(f"Failed to list files")
            print(f"Error details: {str(e)}")
            raise Exception(f"Failed to list files: {str(e)}") 