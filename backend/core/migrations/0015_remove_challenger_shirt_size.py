# Generated manually to remove shirt_size field

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0014_alter_challenger_shirt_size"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="challenger",
            name="shirt_size",
        ),
    ]
