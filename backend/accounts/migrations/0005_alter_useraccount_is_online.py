# Generated by Django 3.2 on 2023-05-21 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_useraccount_is_online'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='is_online',
            field=models.CharField(default='false', max_length=15),
        ),
    ]
