from rest_framework import serializers
from tision.users.models.user_model import User
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "User Example",
            value={
                "firstname": "John",
                "lastname": "Doe",
                "username": "johndoe",
                "email": "johndoe@example.com",
                "is_superuser": False,
                "is_active": True,
                "dob": "01/01/1990",
                "role": "general_user",
                "gender": "male",
                "phone_number": "+263771234567",
                "date_joined": "28/08/2025 14:30",
                "last_login": "28/08/2025 14:30"
            },
        )
    ]
)
class UserSerializer(serializers.ModelSerializer):
    dob = serializers.DateField(
        format="%d/%m/%Y",
        input_formats=["%d/%m/%Y", "%Y-%m-%d"],
        help_text="Date of birth of the user in DD/MM/YYYY format."
    )
    phone_number = serializers.CharField(
        max_length=15,
        required=False,
        allow_blank=True,
        help_text="User's contact phone number (optional)."
    )
    
    class Meta:
        model = User
        fields = [
            'firstname',
            'lastname',
            'username',
            'email',
            'is_superuser',
            'is_active',
            'dob',
            'role',
            'gender',
            'phone_number',
            'date_joined',
            'last_login'
        ]
        read_only_fields = ['role', 'is_superuser', 'is_active', 'date_joined', 'last_login']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True},
            'email': {'required': True},
            'dob': {'required': False},
        }

    def create(self, validated_data):
        """
        Create a new user instance with validated data.
        """
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')
        role = validated_data.get('role', 'general_user')

        if not username or not email or not password:
            raise serializers.ValidationError(_("Username, email, and password are required fields."))

        try:
            user = User.objects.create_user(username, email, password, role)
            return user
        except ValueError as e:
            raise serializers.ValidationError({'detail': str(e)})
        except Exception:
            raise serializers.ValidationError({'detail': _('An error occurred while creating the user.')})

    def update(self, instance, validated_data):
        """
        Update a user instance with validated data.
        """
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            setattr(instance, attr, value)
        instance.save()
        return instance
