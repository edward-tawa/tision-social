from django.db import models
from users.models.user_model import User

class Message(models.Model):

    TEXT = 'text'
    IMAGE = 'image'
    VIDEO = 'video'
    AUDIO = 'audio'

    MESSAGE_TYPE_Choices = [
        (TEXT, 'Text'),
        (IMAGE, 'Image'),
        (VIDEO, 'Video'),
        (AUDIO, 'Audio'),
    ]

    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    timestamp = models.DateTimeField(auto_now_add=True)
    message_type = models.CharField(max_length=30, choices=MESSAGE_TYPE_Choices, default=TEXT)

    text = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='message/images', blank=True, null=True)
    video = models.FileField(upload_to='message/videos', blank=True, null=True)
    audio = models.FileField(upload_to='message/audios', blank=True, null=True)

    class Meta:
        ordering = ['timestamp']
    
    @property
    def content(self):
        if self.message_type == self.TEXT:
            return {"content": self.text}    
            
        file_field_mapping = {
            self.VIDEO: 'video',
            self.IMAGE: 'image',
            self.AUDIO: 'audio',
        }

        field_name = file_field_mapping.get(self.message_type)
        if field_name:
            file = getattr(self, field_name)
            return {
                    field_name: file.url if file else None, 
                    "text": self.text or None
                    }
        
        return {}

        
    def __str__(self):
        return f'{self.sender} -> {self.receiver}: {self.message_type}'