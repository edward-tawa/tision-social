from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Custom class to obtain jwt tokens after checking if user is active. ie has successfully signed in

    def validate(self, attrs):
        tokens = super().validate(attrs)

        if not self.user.is_active:
            raise serializers.ValidationError(_('User account is inactive'))
        return tokens