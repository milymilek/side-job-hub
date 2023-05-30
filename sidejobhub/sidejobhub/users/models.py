from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    avatar = models.CharField(max_length=255, default="default.jpg")
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
