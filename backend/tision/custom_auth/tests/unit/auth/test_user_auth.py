import pytest
from unittest.mock import patch, MagicMock
from custom_auth.auth.user_auth import CustomAuthBackend



@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_success(MockUser, MockPasswordCheck, username, password):
    # Arrange
    mock_user = MagicMock()
    MockUser.objects.get.return_value = mock_user
    mock_user.is_active = True
    mock_user.password = password
    MockPasswordCheck.return_value = True

    backend = CustomAuthBackend()
    result = backend.authenticate(None, username, password)

    # Assertions
    MockUser.objects.get.assert_called_once_with(username=username)

    MockPasswordCheck.assert_called_once_with(password, mock_user.password)

    assert result == mock_user
    


@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_user_not_found(MockUser, MockPasswordCheck, username, password):
    # Arrange mocks
    mock_user = MagicMock()
    MockUser.objects.get.side_effect = MockUser.DoesNotExist

    backend = CustomAuthBackend()
    result = backend.authenticate(None, username, password)

    # Assertions

    MockUser.objects.get.assert_called_once_with(username=username)

    MockPasswordCheck.assert_not_called()

    assert result is None


@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_wrong_password(MockUser, MockPasswordCheck, username, password):
    # Arrange
    mock_user = MagicMock()
    MockUser.objects.get.return_value = mock_user
    mock_user.is_active = True
    mock_user.password = password
    MockPasswordCheck.return_value = False

    backend = CustomAuthBackend()
    result = backend.authenticate(None, username, password)

    # Assertions

    MockUser.objects.get.assert_called_once_with(username=username)

    MockPasswordCheck.assert_called_once_with(password, mock_user.password)

    assert result is None

@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_password_none(MockUser, MockPasswordCheck, username):
    # Arrange mocks
    MockUser.objects.get.side_effect = MockUser.DoesNotExist

    backend = CustomAuthBackend()

    result = backend.authenticate(None, username, None)

    # Assertions 
    MockUser.objects.get.assert_called_once_with(username=username)

    MockPasswordCheck.assert_not_called()

    assert result is None

@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_passwordcheck_exception(MockUser, MockPasswordCheck, username, password):
    # Arrange
    mock_user = MagicMock()
    MockUser.objects.get.return_value = mock_user
    mock_user.password = password
    mock_user.is_active = True

    MockPasswordCheck.side_effect = Exception("Password check error")

    backend = CustomAuthBackend()

    result = backend.authenticate(None, username, password)

    # Asssertions

    MockUser.objects.get.assert_called_once_with(username=username)

    MockPasswordCheck.assert_called_once_with(password, mock_user.password)

    assert result is None


    

@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_wrong_username(MockUser, MockPasswordCheck, username, password):
    # Arrange Mocks
    MockUser.objects.get.side_effect = MockUser.DoesNotExist

    backend = CustomAuthBackend()

    result = backend.authenticate(None, username, password)

    # Assertions

    MockUser.objects.get.assert_called_once_with(username=username)

    MockPasswordCheck.assert_not_called()

    assert result is None


@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_username_none(MockUser, MockPasswordCheck, password):
    # Arrange Mocks
    MockUser.objects.get.side_effect = MockUser.DoesNotExist

    backend = CustomAuthBackend()

    result = backend.authenticate(None, None, password)
    # Assertions

    MockUser.objects.get.assert_called_once_with(username=None)

    MockPasswordCheck.assert_not_called()

    assert result is None


@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_user_inactive(MockUser, MockPasswordCheck, username, password):
    # Arrange
    mock_user = MagicMock()
    MockUser.objects.get.return_value = mock_user
    mock_user.is_active = False
    mock_user.password = password

    MockPasswordCheck.return_value = True
    backend = CustomAuthBackend()

    result = backend.authenticate(None, username, password)

    # Assertions

    MockUser.objects.get.assert_called_once_with(username=username)

    assert mock_user.is_active == False

    MockPasswordCheck.assert_called_once_with(password, mock_user.password)

    assert result is None
 

@patch('custom_auth.auth.user_auth.check_password')
@patch('custom_auth.auth.user_auth.User')
def test_authenticate_wrong_username_type(MockUser, MockPasswordCheck, username, password):
    # Arrange Mocks
    MockUser.objects.get.side_effect = MockUser.DoesNotExist

    backend = CustomAuthBackend()

    result = backend.authenticate(None, 12345, password)

    # Assertions

    MockUser.objects.get.assert_called_once_with(username=12345)

    MockPasswordCheck.assert_not_called()

    assert result is None

