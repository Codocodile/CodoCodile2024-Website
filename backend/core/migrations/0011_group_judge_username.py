# Generated by Django 4.1.13 on 2024-10-31 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_alter_challenger_password_reset_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='judge_username',
            field=models.TextField(blank=True, max_length=50),
        ),
    ]
