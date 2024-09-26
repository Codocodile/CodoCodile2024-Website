# Generated by Django 4.0.6 on 2023-10-09 00:26

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
            name='Challenger',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name_persian', models.CharField(max_length=50)),
                ('last_name_persian', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=11)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default='M', max_length=1)),
                ('status', models.CharField(choices=[('J', 'Junior'), ('S', 'Senior'), ('P', 'Pro')], default='J', max_length=1)),
                ('is_workshop_attender', models.BooleanField(default=False)),
                ('profile_pic', models.ImageField(blank=True, upload_to='profile_pics')),
                ('bio', models.TextField(blank=True, max_length=500)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(blank=True, choices=[('M', 'Member'), ('L', 'Leader')], default='M', max_length=1)),
                ('status', models.CharField(blank=True, choices=[('A', 'Accepted'), ('P', 'Pending'), ('R', 'Rejected')], default='P', max_length=1)),
                ('challenger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.challenger')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.group')),
            ],
        ),
    ]