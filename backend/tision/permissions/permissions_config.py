user_permissions = {
    "super_admin": {
        "permissions": "*",
        "group": "super_admin",
    },
    "admin": {
        "permissions": {
            "user": ["add_user", "update_user", "delete_user", "view_user"],
            "user_profile": [
                "add_user_profile",
                "update_user_profile",
                "delete_user_profile",
                "view_user_profile",
                "share_user_profile",
            ],
            "post": [
                "add_post",
                "update_post",
                "delete_post",
                "view_post",
                "share_post",
                "approve_post",
            ],
            "comment": [
                "add_comment",
                "update_comment",
                "delete_comment",
                "view_comment",
            ],
            "group": ["add_group", "update_group", "delete_group", "view_group"],
            "reaction": ["add_reaction", "delete_reaction", "view_reaction"],
            "notification": [
                "add_notification",
                "delete_notification",
                "view_notification",
            ],
            "file": [
                "add_file",
                "update_file",
                "delete_file",
                "view_file",
                "share_file",
            ],
            "setting": ["update_setting", "view_setting"],
            "role": ["add_role", "update_role", "delete_role", "view_role"],
            "permission": [
                "add_permission",
                "update_permission",
                "delete_permission",
                "view_permission",
            ],
        },
        "group": "admin",
    },
    "moderator": {
        "permissions": {
            "post": ["approve_post", "delete_post", "view_post"],
            "comment": ["delete_comment", "view_comment"],
            "group": ["delete_group", "view_group"],
            "reaction": ["delete_reaction", "view_reaction"],
            "notification": ["delete_notification", "view_notification"],
        },
        "group": "moderator",
    },
    "general_user": {
        "permissions": {
            "user_profile": ["add_user_profile", "update_user_profile", "view_user_profile"],
            "post": [
                "add_post",
                "update_post",
                "delete_post",
                "view_post",
                "share_post",
            ],
            "comment": [
                "add_comment",
                "update_comment",
                "delete_comment",
                "view_comment",
            ],
            "reaction": ["add_reaction", "delete_reaction", "view_reaction"],
            "notification": ["view_notification"],
        },
        "group": "general_user",
    },
    "read_only": {
        "permissions": {
            "user_profile": ["view_user_profile"],
            "post": ["view_post"],
            "comment": ["view_comment"],
            "reaction": ["view_reaction"],
            "notification": ["view_notification"],
        },
        "group": "read_only",
    },
}
