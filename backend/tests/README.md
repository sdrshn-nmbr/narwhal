# API Tests

Simple test scripts to verify API functionality.

## Structure

- `base.py`: Base test class with common functionality
- `storage/`: Storage-related tests
  - `test_upload.py`: File upload tests
  - `test_list.py`: File listing tests

## Running Tests

Each test can be run individually:

```bash
# Run upload test
python -m tests.storage.test_upload

# Run list test
python -m tests.storage.test_list
```

## Adding New Tests

1. Create a new test file in the appropriate directory
2. Inherit from `BaseTest` class
3. Implement test methods
4. Add a `__main__` block to run the test directly

Example:

```python
from tests.base import BaseTest

class MyTest(BaseTest):
    def test_something(self):
        response = self._make_request(
            method="GET",
            endpoint="/my/endpoint"
        )
        assert response.get("key"), "Expected key not found"
        print("\n✅ Test passed!")

if __name__ == "__main__":
    test = MyTest()
    test.test_something()
```
