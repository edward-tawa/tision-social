from django.db import models
from users.models.user_model import User



class Bio(models.Model):
    #Profile Bio model
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='bio')
    name = models.CharField(max_length=50, blank=False, null=False)
    location = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    employment_status = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f'{self.name} Bio'