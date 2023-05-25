# Generated by Django 4.1.9 on 2023-05-25 20:01

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Announcement",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=30)),
                ("description", models.TextField(max_length=255)),
                ("price", models.CharField(max_length=20)),
                ("availability", models.CharField(max_length=20)),
                ("contact", models.CharField(max_length=20)),
                ("longitude", models.DecimalField(decimal_places=6, max_digits=9)),
                ("latitude", models.DecimalField(decimal_places=6, max_digits=9)),
                (
                    "created_at",
                    models.DateTimeField(
                        default=datetime.datetime(2023, 5, 25, 20, 1, 24, 372487, tzinfo=datetime.timezone.utc)
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(
                        default=datetime.datetime(2023, 5, 25, 20, 1, 24, 372504, tzinfo=datetime.timezone.utc)
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        default=1, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Side Job Announcements",
            },
        ),
    ]