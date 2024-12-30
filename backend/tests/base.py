import requests
from typing import Optional, Dict, Any

class BaseTest:
    def __init__(self):
        self.base_url = "http://localhost:8000/api"
        
    def _make_request(
        self,
        method: str,
        endpoint: str,
        files: Optional[Dict] = None,
        json: Optional[Dict] = None,
        params: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """Make HTTP request and return response"""
        url = f"{self.base_url}{endpoint}"
        
        response = requests.request(
            method=method,
            url=url,
            files=files,
            json=json,
            params=params
        )
        
        print(f"\nRequest: {method} {url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        return response.json() 