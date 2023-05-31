from rest_framework import serializers

from sidejobhub.chats.models import Message, Conversation
from sidejobhub.users.models import User
from sidejobhub.users.serializers import UserMessageSerializer, UserSerializer


class ConversationSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ("id", "name", 'other_user', "last_message")

    def get_last_message(self, obj):
        messages = obj.messages.all()
        if not messages.exists():
            return {"content": ""}
        message = messages[0]
        return MessageSerializer(message).data

    def get_other_user(self, obj):
        usernames = obj.name.split("__")
        context = {}
        for username in usernames:
            if username != self.context["user"]:
                other_user = User.objects.get(first_name=username)
                return UserSerializer(other_user, context=context).data


class MessageSerializer(serializers.ModelSerializer):
    conversation = serializers.SerializerMethodField()
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = (
            "id",
            "conversation",
            "from_user",
            "to_user",
            "content",
            "timestamp",
            "read",
        )

    def get_conversation(self, obj):
        return str(obj.conversation.id)

    def get_from_user(self, obj):
        return UserMessageSerializer(obj.from_user).data

    def get_to_user(self, obj):
        return UserMessageSerializer(obj.to_user).data
