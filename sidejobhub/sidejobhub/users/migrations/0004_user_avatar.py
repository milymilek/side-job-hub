# Generated by Django 4.1.9 on 2023-05-29 21:14

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_alter_user_last_login"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="avatar",
            field=models.CharField(default="default.jpg", max_length=255),
        ),
    ]