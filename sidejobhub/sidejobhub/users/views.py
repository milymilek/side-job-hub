from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView, RedirectView, UpdateView

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer

#
# class UserDetailView(LoginRequiredMixin, DetailView):
#     model = User
#     slug_field = "username"
#     slug_url_kwarg = "username"
#
#
# user_detail_view = UserDetailView.as_view()
#
#
# class UserUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
#     model = User
#     fields = ["name"]
#     success_message = _("Information successfully updated")
#
#     def get_success_url(self):
#         assert self.request.user.is_authenticated  # for mypy to know that the user is authenticated
#         return self.request.user.get_absolute_url()
#
#     def get_object(self):
#         return self.request.user
#
#
# user_update_view = UserUpdateView.as_view()
#
#
# class UserRedirectView(LoginRequiredMixin, RedirectView):
#     permanent = False
#
#     def get_redirect_url(self):
#         return reverse("users:detail", kwargs={"username": self.request.user.username})
#
#
# user_redirect_view = UserRedirectView.as_view()


class UpdateAvatarView(APIView):
    def post(self, request):
        data = request.data
        update_data = {"avatar": data['avatar']}
        user = User.objects.filter(id=data['id']).first()
        serializer = UserSerializer(user, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


user_avatar_update_view = UpdateAvatarView.as_view()
