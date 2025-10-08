import pytest

@pytest.fixture
def email_data():
    return {
        "email_subject": "Test Subject",
        "email_body": "Test Body",
        "to": "test@example.com",
    }

