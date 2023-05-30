from asgiref.sync import async_to_sync

from channels.generic.websocket import JsonWebsocketConsumer

from .models import Conversation, Message
from sidejobhub.users.models import User
from .api.serializers import MessageSerializer, ConversationSerializer

import json
from uuid import UUID


class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return obj.hex
        return json.JSONEncoder.default(self, obj)


class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status,
    and send notifications.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.user_obj = None
        self.conversation_name = None
        self.conversation = None

    def connect(self):
        self.user = self.scope["user"]
        if not self.user:
            return
        self.user_obj = User.objects.get(email=self.scope['user']["email"])

        print("Connected!")
        self.accept()
        self.conversation_name = f"{self.scope['url_route']['kwargs']['conversation_name']}"

        self.conversation, created = Conversation.objects.get_or_create(name=self.conversation_name)

        async_to_sync(self.channel_layer.group_add)(
            self.conversation_name,
            self.channel_name,
        )

        self.send_json(
            {
                "type": "online_user_list",
                "users": [user.first_name for user in self.conversation.online.all()],
            }
        )
        #
        async_to_sync(self.channel_layer.group_send)(
            self.conversation_name,
            {
                "type": "user_join",
                "user": self.user['first_name'],
            },
        )
        #
        self.conversation.online.add(self.user['id'])

        print(f"\n\n\n\n\n\n\n\n{self.conversation.online.all()}\n\n\n\n\n\n\n")

        messages = self.conversation.messages.all().order_by("timestamp")[0:50]
        past_conversations = Conversation.objects.filter(name__contains=self.user['first_name'])

        self.send_json({
            "type": "last_50_messages",
            "messages": MessageSerializer(messages, many=True).data,
            "past_conversations": ConversationSerializer(past_conversations, context={"user": self.user['first_name']}, many=True).data,
        })

    def disconnect(self, code):
        print("Disconnected!")
        async_to_sync(self.channel_layer.group_send)(
            self.conversation_name,
            {
              "type": "user_leave",
              "user": self.user['first_name'],
            },
        )
        self.conversation.online.remove(self.user['id'])

        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            message = Message.objects.create(
                from_user=self.user_obj,
                to_user=self.get_receiver(),
                content=content["message"],
                conversation=self.conversation
            )

            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "chat_message_echo",
                    "name": self.user['first_name'],
                    "message": MessageSerializer(message).data,
                },
            )
        if message_type == "typing":
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "typing",
                    "user": self.user['first_name'],
                    "typing": content["typing"],
                },
            )

        return super().receive_json(content, **kwargs)

    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)

    def get_receiver(self):
        usernames = self.conversation_name.split("__")
        for username in usernames:
            if username != self.user['first_name']:
                # This is the receiver
                print(f"\n\n\n\n\n\n\n\nusername: {username}\n\n\n\n\n\n\n")
                return User.objects.get(first_name=username)

    @classmethod
    def encode_json(cls, content):
        return json.dumps(content, cls=UUIDEncoder)

    def user_join(self, event):
        self.send_json(event)

    def user_leave(self, event):
        self.send_json(event)

    def typing(self, event):
        self.send_json(event)
