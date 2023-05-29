from django.urls import path

from sidejobhub.chats.consumers import ChatConsumer

websocket_urlpatterns = [
    path("chat_socket/<conversation_name>", ChatConsumer.as_asgi()),
    #path("chat_socket", ChatConsumer.as_asgi()),
]
