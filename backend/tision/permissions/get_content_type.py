#get_content_type.py
from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from django.db import models

class DummyModel(models.Model):
    class Meta:
        managed = False
        app_label = 'dummy_app'  
        verbose_name = 'Dummy'
        verbose_name_plural = 'Dummies'


def get_content_type(model_name):
    model_name = model_name.lower()
    try:
        app_label = apps.get_app_config(model_name).label
        return ContentType.objects.get(app_label=app_label, model=model_name)
    except LookupError:
        # Return the DummyModel content type for all non-model keys
        return ContentType.objects.get_for_model(DummyModel)




