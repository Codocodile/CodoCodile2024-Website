# Generated by Django 4.0.6 on 2023-10-20 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_group_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='judge_password',
            field=models.TextField(blank=True, max_length=50),
        ),
    ]
