# test_email_util.py
from unittest.mock import patch
from custom_auth.utils.email_util import Util




@patch("custom_auth.utils.email_util.EmailThread")
@patch("custom_auth.utils.email_util.EmailMessage")
def test_send_email(MockEmailMessage, MockEmailThread, email_data):
    # Setup mock instances
    mock_email_instance = MockEmailMessage.return_value
    mock_thread_instance = MockEmailThread.return_value

    # Call the function
    Util.send_email(email_data)

    # Assert EmailMessage class was called correctly
    MockEmailMessage.assert_called_once_with(
        subject=email_data["email_subject"],
        body=email_data["email_body"],
        to=[email_data["to"]],
    )

    # Assert EmailThread class was called with the email instance
    MockEmailThread.assert_called_once_with(mock_email_instance)

    # Assert the thread instance's start() method was called
    mock_thread_instance.start.assert_called_once()
