#user_model.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import Group
from django.db.models import Q



class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, role='general_user', **kwargs):
        """
            takes username, email, password and create a user.
        """
        if not email:
            raise ValueError('User must have an email address')
        if not username:
            raise ValueError('User must have username')
        user = self.model(
            email=self.normalize_email(email),
            username=username,       
        )
    
        
        user.set_password(password)
        user.is_active = True
        user.role = role
        user.save(using=self._db)

        group, created = Group.objects.get_or_create(name=role)
        user.groups.add(group)

        return user
    
    def create_superuser(self, username, email, password=None, **kwargs):
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("User must have username")
        
        user = self.create_user(username, email, password, role='super_admin')
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('super_admin', 'Super Admin'),
        ('admin', 'Admin'),
        ('moderator', 'Moderator'),
        ('general_user', 'General User'),
        ('read_only', 'Read Only'),
    ]

    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=150, blank=True)
    lastname = models.CharField(max_length=150, blank=True)
    username = models.CharField(max_length=150, blank=False, null=False, unique=True)
    email = models.EmailField(unique=True)
    dob = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('M', 'MALE'), ('F', 'FEMALE')])
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='general_user')
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    connections = models.ManyToManyField('self', through='connection.Connection', symmetrical=False, related_name='user_connections')


    REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = 'username'
    objects = UserManager()


    def __str__(self):
        return self.username
    


    def connections_list(self):
        """
        Return only ACCEPTED friends.
        """
        from connections.models import Connection

        connections = Connection.objects.filter(
            Q(sender=self, status=Connection.ACCEPTED) |
            Q(receiver=self, status=Connection.ACCEPTED)
        )

        connections_ids = [
            conn.receiver.id if conn.sender == self else conn.sender.id
            for conn in connections
        ]
        return User.objects.filter(id__in=connections_ids)

    def is_connected_with(self, user):
        # Guard: prevent checking against self
        if self.id == user.id:
            return False
        return self.connections_list().filter(id=user.id).exists()




