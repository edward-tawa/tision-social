import pytest
from unittest.mock import MagicMock, patch
from rest_framework.serializers import ValidationError
from custom_auth.auth.token_generation import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


@patch.object(TokenObtainPairSerializer, 'validate')
def test_token_obtain_pair_active_user(MockSuperValidate):
    # Arrange Mocks
    mock_attrs = MagicMock()
    mock_attrs.return_value = {'username': 'testuser', 'password': 'testpass'}
    MockSuperValidate.return_value = {'access': 'test_access', 'refresh': 'test_refresh'}
    mock_user = MagicMock()
    mock_user.is_active = True
    serializer = CustomTokenObtainPairSerializer()

    serializer.user = mock_user

    # Act
    result = serializer.validate(mock_attrs())

    # Assertions

    MockSuperValidate.assert_called_once_with(mock_attrs())

    assert mock_user.is_active is True

    assert result == {'access': 'test_access', 'refresh': 'test_refresh'}

    
