# Generated by Django 4.1.9 on 2023-05-29 18:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("announcements", "0002_alter_announcement_created_at_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="announcement",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(2023, 5, 29, 18, 10, 3, 34722, tzinfo=datetime.timezone.utc)
            ),
        ),
        migrations.AlterField(
            model_name="announcement",
            name="latitude",
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name="announcement",
            name="longitude",
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name="announcement",
            name="updated_at",
            field=models.DateTimeField(
                default=datetime.datetime(2023, 5, 29, 18, 10, 3, 34739, tzinfo=datetime.timezone.utc)
            ),
        ),
    ]
