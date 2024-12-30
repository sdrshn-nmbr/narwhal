from tests.base import BaseTest
from pprint import pprint

class StorageListTest(BaseTest):
    def test_list(self):
        """Test file listing endpoint"""
        response = self._make_request(
            method="GET",
            endpoint="/files/list"
        )
        
        # Verify response structure
        files = response.get("files")
        assert isinstance(files, list), "Files should be a list"
        
        # If files exist, verify their structure
        for file in files:
            assert "name" in file, "File should have a name"
            assert "size" in file, "File should have a size"
            assert "created_at" in file, "File should have created_at"
            assert "updated_at" in file, "File should have updated_at"
            assert "path" in file, "File should have a path"
            assert file["path"].startswith("uploads/"), "File path should be in uploads directory"
        
        print("\n✅ List test passed!")
        if files:
            print(f"\nFound {len(files)} files:")
            for file in files:
                print(f" • {file['name']} (UUID: {file['size']} bytes)")

if __name__ == "__main__":
    test = StorageListTest()
    test.test_list()