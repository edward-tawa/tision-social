from django.db import models
from django.contrib.contenttypes import ContentType

class Notification(models.Model):
    # Actor
    id = models.AutoField(primary_key=True)
    actor_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='actor_notification')
    actor_id = models.PositiveIntegerField()
    actor = models.GenericForeignKey('actor_content_type', 'actor_id')

    # Target 
    recipient_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='target_notification')
    recipient_id = models.PositiveIntegerField()
    recipient = models.GenericForeignKey('target_content_type', 'target_id')

    verb = models.CharField(max_length=255)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f'Notification from {self.actor_content_type} -> {self.target_contenttype}'