from django.db import models
from users.models.user_model import User


class Education(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='education')
    institution = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=30, blank=True, null=True)
    location = models.CharField(max_length=30, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    qualifications = models.JSONField(blank=True, null=True)


    def __str__(self):
        return f'{self.institution}'
