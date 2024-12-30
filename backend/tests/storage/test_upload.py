from tests.base import BaseTest
import os

class StorageUploadTest(BaseTest):
    def __init__(self):
        super().__init__()
        self.test_file = "test.txt"
        self.content = "Hello, this is a test file"
        self.display_name = "my-important-document.txt"
        
    def setup(self):
        """Create test file"""
        with open(self.test_file, "w") as f:
            f.write(self.content)
            
    def cleanup(self):
        """Remove test file"""
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
            
    def test_upload(self):
        """Test file upload endpoint"""
        try:
            self.setup()
            
            with open(self.test_file, "rb") as f:
                files = {"file": (self.display_name, f, "text/plain")}
                response = self._make_request(
                    method="POST",
                    endpoint="/files/upload",
                    files=files
                )
                
            assert response.get("url"), "No URL in response"
            assert response.get("path"), "No path in response"
            assert response.get("filename") == self.display_name, "Original filename not preserved"
            print("\n✅ Upload test passed!")
            
        finally:
            self.cleanup()

if __name__ == "__main__":
    test = StorageUploadTest()
    test.test_upload() 