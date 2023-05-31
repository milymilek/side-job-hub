from urllib.parse import parse_qs
from channels.db import database_sync_to_async
import jwt
from django.contrib.auth import get_user_model

import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
django.setup()
from sidejobhub.users.models import User
from sidejobhub.users.serializers import UserSerializer



@database_sync_to_async
def get_user(scope):
    from django.contrib.auth.models import AnonymousUser

    if "token" not in scope:
        raise ValueError(
            "Cannot find token in scope. You should wrap your consumer in "
            "TokenAuthMiddleware."
        )

    token = scope["token"]
    user = None
    try:
        if not token:
            raise AuthenticationFailed("Unauthenticated")

        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        user = User.objects.filter(id=payload['id']).first()
        user = UserSerializer(user).data
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed("Unauthenticated")

    return user or AnonymousUser()


class TokenAuthMiddleware:

    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["token"][0]
        scope["token"] = token
        scope["user"] = await get_user(scope)
        return await self.app(scope, receive, send)
