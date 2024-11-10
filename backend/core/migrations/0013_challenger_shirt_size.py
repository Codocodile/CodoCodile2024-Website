# Generated by Django 4.1.13 on 2024-11-10 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_group_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenger',
            name='shirt_size',
            field=models.CharField(choices=[('S', 'Small'), ('M', 'Medium'), ('L', 'Large'), ('XL', 'Extra Large'), ('XXL', 'Extra Extra Large'), ('XXXL', 'Extra Extra Extra Large')], default='XL', max_length=4),
        ),
    ]
