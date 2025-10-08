from django.contrib.auth.models import Permission, Group
from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from permissions.permissions_config import user_permissions
from permissions.get_content_type import get_content_type
from django.apps import apps




class Command(BaseCommand):
    help = 'Load user permissions from config and apply them to groups'

    def handle(self, *args, **kwargs):
        model_content_types = {}
        permissions_cache = {}
        for config in user_permissions.values():
            #group_name = config['group']
            permissions = config['permissions']

            if permissions == '*':
                continue
            for model, permissions_list in permissions.items():
                try:
                    app_label = apps.get_app_config(model.lower()).label
                    if model not in model_content_types:
                        model_content_types[model.lower()] = ContentType.objects.get(app_label=app_label, model=model.lower())
                except LookupError:
                    # Fallback: get content type from DummyModel
                    model_content_types[model.lower()] = get_content_type(model)
                    continue
                except ContentType.DoesNotExist:
                    self.stdout.write(self.style.ERROR(f'Content type for {model} does not exist'))
                    continue
                for perm in permissions_list:
                    key = (model.lower(), perm)
                    if key not in permissions_cache:
                        permission_obj, created = Permission.objects.get_or_create(
                            codename=perm,
                            name=f"Can {perm.replace('_', ' ')} {model}",
                            content_type=model_content_types[model.lower()]
                        )
                        permissions_cache[key] = permission_obj
        
        for config in user_permissions.values():
            group_name = config['group']
            permissions = config['permissions']
            group, created = Group.objects.get_or_create(name=group_name)
            if permissions == "*":
                all_permissions = list(permissions_cache.values())
                group.permissions.set(all_permissions)
                continue
            for model, permissions_list in permissions.items():
                perms_to_add = [permissions_cache[model.lower(), perm] for perm in permissions_list]
                group.permissions.add(*perms_to_add)
                    