from django.urls import path

from sidejobhub.users.views import (
    # user_detail_view,
    # user_redirect_view,
    # user_update_view,
    user_avatar_update_view,
)

app_name = "users"
urlpatterns = [
    # path("~redirect/", view=user_redirect_view, name="redirect"),
    # path("~update/", view=user_update_view, name="update"),
    # path("<str:username>/", view=user_detail_view, name="detail"),
    path("update_avatar/", view=user_avatar_update_view, name="update_avatar")
]
