# Generated by Django 4.1.13 on 2024-10-13 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_visit'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenger',
            name='cv_file',
            field=models.FileField(blank=True, upload_to='cv_uploads/'),
        ),
    ]
