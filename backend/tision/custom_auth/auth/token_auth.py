from rest_framework.authentication import BaseAuthentication
from users.models.user_model import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed



class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES['refresh_token']
        if not token:
            return None
        try:
            refresh_token = RefreshToken(token)
            user_id = refresh_token['user_id']
        except Exception:
            raise AuthenticationFailed('Expired or Invalid token')
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")
        return (user, token)


