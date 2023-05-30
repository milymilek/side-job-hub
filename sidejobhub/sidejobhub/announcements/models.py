from django.db import models
from django.utils import timezone

from sidejobhub.users.models import User


class Announcement(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(max_length=255)
    price = models.CharField(max_length=20)
    availability = models.CharField(max_length=20)
    contact = models.CharField(max_length=20)
    longitude = models.FloatField()
    latitude = models.FloatField()
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, default=1)
    created_at = models.DateTimeField(editable=True, default=timezone.now())
    updated_at = models.DateTimeField(default=timezone.now())

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Announcement, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Side Job Announcements"
