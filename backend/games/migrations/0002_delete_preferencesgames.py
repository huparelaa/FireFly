# Generated by Django 3.2 on 2023-03-12 04:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PreferencesGames',
        ),
    ]