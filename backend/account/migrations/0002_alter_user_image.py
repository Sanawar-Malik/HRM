# Generated by Django 4.2.2 on 2023-07-19 04:05

import account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(default='register/default.jpg', upload_to=account.models.upload_to),
        ),
    ]