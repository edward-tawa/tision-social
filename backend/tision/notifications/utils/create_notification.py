from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.contenttypes import ContentType
from notifications.models.notification_model import Notification
from notifications.utils.notification_rules import NOTIFICATION_RULES_MAPPING, field_resolver




@receiver(post_save)
def create_notification(sender, instance, created, **kwargs):
    if not created:
        return

    model_name = sender.__name__
    rule = NOTIFICATION_RULES_MAPPING.get(model_name)
    if not rule:
        return  # no rule defined

    # Resolve actor (should always be a single object)
    actor_list = field_resolver(instance, rule['actor'])
    actor = actor_list[0] if actor_list else None
    if not actor:
        return

    # Resolve recipients (can be multiple)
    recipients = field_resolver(instance, rule['recipient'])

    verb = rule['verb']

    # Create notifications for all recipients
    for recipient in recipients:
        if recipient and recipient != actor:  # avoid notifying self
            Notification.objects.create(
                actor=actor,
                recipient=recipient,
                verb=verb,
            )
