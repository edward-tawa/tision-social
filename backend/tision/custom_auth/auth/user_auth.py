from django.contrib.auth.backends import BaseBackend
from users.models.user_model import User
from django.contrib.auth.hashers import check_password

class CustomAuthBackend(BaseBackend):
    #custom authentication for user using either username or email
    print("custom auth checked")
    def authenticate(self, request, username=None, password=None ):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                return None
         
        if user and user.is_active and check_password(password, user.password):
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None