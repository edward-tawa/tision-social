import pytest
from unittest.mock import patch, MagicMock
from custom_auth.auth.token_auth import CustomTokenAuthentication
from rest_framework.exceptions import AuthenticationFailed


@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_success(MockUser, MockRefreshToken):
    # Arrange
    mock_request = MagicMock()
    mock_request.COOKIES = {'refresh_token': 'valid_token'}
    MockRefreshToken.return_value = {'user_id': 1}

    mock_user = MagicMock()
    mock_user.id = MockRefreshToken.return_value['user_id']
    MockUser.objects.get.return_value = mock_user

    auth = CustomTokenAuthentication()

    result = auth.authenticate(mock_request)

    # Assertions

    MockUser.objects.get.assert_called_once_with(id=mock_user.id)

    MockRefreshToken.assert_called_once_with(mock_request.COOKIES['refresh_token'])

    assert result == (mock_user, mock_request.COOKIES['refresh_token'])



@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_invalid_token(MockUser, MockRefreshToken):
    # Arrange
    mock_request = MagicMock()
    mock_request.COOKIES = {'refresh_token': 'invalid_token'}
    MockRefreshToken.side_effect = AuthenticationFailed('Expired or Invalid token')

    auth = CustomTokenAuthentication()
    
    # Act & Assert
    with pytest.raises(AuthenticationFailed) as exc_info:
        auth.authenticate(mock_request)

    assert str(exc_info.value) == 'Expired or Invalid token'

    MockRefreshToken.assert_called_once_with('invalid_token')
    MockUser.objects.get.assert_not_called()


@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_user_not_found(MockUser, MockRefreshToken):
    # Arrange Mocks

    MockUser.objects.get.side_effect = MockUser.DoesNotExist
    mock_request = MagicMock()

    mock_request.COOKIES = {'refresh_token': 'valid_token'}

    MockRefreshToken.return_value = {'user_id': 1}

    auth = CustomTokenAuthentication()
    with pytest.raises(AuthenticationFailed) as exc_info:
        auth.authenticate(mock_request)

    # Assertions

    MockUser.objects.get.assert_called_once_with(id=1)

    MockRefreshToken.assert_called_once_with('valid_token')

    assert str(exc_info.value) == "User not found"


@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_no_token(MockUser, MockRefreshToken):
    # Arrange mocks
    mock_request = MagicMock()
    mock_request.COOKIES = {}
    auth = CustomTokenAuthentication()
    result = auth.authenticate(mock_request)

    MockUser.objects.get.assert_not_called()

    MockRefreshToken.assert_not_called()

    assert result is None

@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_malformed_token(MockUser, MockRefreshToken):
    # Arrange
    mock_request = MagicMock()
    mock_request.COOKIES = {'refresh_token': 'malformed_token'}
    MockRefreshToken.side_effect = Exception("Malformed token")
    auth = CustomTokenAuthentication()

    # Act & Assert
    with pytest.raises(AuthenticationFailed) as exc_info:
        auth.authenticate(mock_request)

    assert str(exc_info.value) == "Expired or Invalid token"
    MockRefreshToken.assert_called_once_with('malformed_token')
    MockUser.objects.get.assert_not_called()


@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_token_missing_user_id(MockUser, MockRefreshToken):
    # Arrange
    mock_request = MagicMock()
    mock_request.COOKIES = {'refresh_token': 'valid_token'}
    MockRefreshToken.return_value = {}  # user_id missing
    auth = CustomTokenAuthentication()

    # Act & Assert
    with pytest.raises(AuthenticationFailed) as exc_info:
        auth.authenticate(mock_request)

    assert str(exc_info.value) == "Expired or Invalid token"
    MockRefreshToken.assert_called_once_with('valid_token')
    MockUser.objects.get.assert_not_called()


@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_inactive_user(MockUser, MockRefreshToken):
    # Arrange
    mock_request = MagicMock()
    mock_request.COOKIES = {'refresh_token': 'valid_token'}
    MockRefreshToken.return_value = {'user_id': 1}

    mock_user = MagicMock()
    mock_user.id = 1
    mock_user.is_active = False  # inactive user
    MockUser.objects.get.return_value = mock_user

    auth = CustomTokenAuthentication()

    # Act & Assert
    with pytest.raises(AuthenticationFailed) as exc_info:
        auth.authenticate(mock_request)

    # Optionally, you may need to modify authenticate() to check is_active
    # For now we assert that it should fail if inactive
    MockRefreshToken.assert_called_once_with('valid_token')
    MockUser.objects.get.assert_called_once_with(id=1)
    # Example message
    # assert str(exc_info.value) == "User is inactive"


@patch('custom_auth.auth.token_auth.RefreshToken')
@patch('custom_auth.auth.token_auth.User')
def test_token_auth_expired_token(MockUser, MockRefreshToken):
    # Arrange
    mock_request = MagicMock()
    mock_request.COOKIES = {'refresh_token': 'expired_token'}
    MockRefreshToken.side_effect = AuthenticationFailed("Expired or Invalid token")
    auth = CustomTokenAuthentication()

    # Act & Assert
    with pytest.raises(AuthenticationFailed) as exc_info:
        auth.authenticate(mock_request)

    assert str(exc_info.value) == "Expired or Invalid token"
    MockRefreshToken.assert_called_once_with('expired_token')
    MockUser.objects.get.assert_not_called()