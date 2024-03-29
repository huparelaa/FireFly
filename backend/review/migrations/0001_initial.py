# Generated by Django 3.2 on 2023-04-17 21:58

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
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review_info', models.CharField(max_length=1200)),
                ('calification', models.FloatField(choices=[(1.0, '1.0'), (1.5, '1.5'), (2.0, '2.0'), (2.5, '2.5'), (3.5, '3.5'), (4.0, '4.0'), (4.5, '4,5'), (5.0, '5.0')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('person_reviewed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='person_review', to=settings.AUTH_USER_MODEL)),
                ('person_reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='person_reviewer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
