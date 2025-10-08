from django.db import models
from tision.users.models.user_model import User


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.Charfield(max_length=50, blank=True, null=True)
    description = models.Charfield(max_length=50, blank=True, null=True)
    location = models.Charfield(max_length=50, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()