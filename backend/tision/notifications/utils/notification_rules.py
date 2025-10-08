NOTIFICATION_RULES_MAPPING = {
    'Message': {
        'actor': 'sender',
        'recipient': 'receiver',
        'verb': 'sent you a message',
    },
    'Connection': {
        'actor': 'sender',
        'recipient': 'receiver',
        'verb': 'sent you a connection request',        
    },
    
    'Post':{
            'actor': 'sender',
            'recipient': 'sender.connections',
            'verb': 'created a new post',
        },
    'Job': {
        'actor': 'sender',
        'recipient': 'followers',
        'verb': 'posted a new job',
    },

    'Gig': {
        'actor': 'sender',
        'recipient': 'followers',
        'verb': 'posted a new job',
    },

    'Institution': {
        'actor': 'sender',
        'recipient': 'followers',
        'verb': 'created a new institution',
    },
    'Scholarship': {
        'actor': 'sender',
        'recipient': 'followers',
        'verb': 'posted a new scholarship',
    },
    
}



def field_resolver(instance, field_path):
    """
    Resolves a nested field path dynamically, and if a manager/queryset is encountered,
    it returns a flat list of all objects.
    """
    value = instance
    for attr in field_path.split('.'):
        value = getattr(value, attr)

        # If the value is a related manager (ManyToMany, reverse FK), get all objects
        if hasattr(value, 'all'):
            value = value.all()

    # Ensure the return is always a list
    if not isinstance(value, (list, tuple)):
        value = [value]
    return value


