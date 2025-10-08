#conftest.py
import pytest

@pytest.fixture
def username():
    return 'testuser'

@pytest.fixture
def password():
    return 'hashed_pw'