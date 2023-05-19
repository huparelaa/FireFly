from django.db import models
from accounts.models import UserAccount

# Create your models here.
class Match(models.Model):
    usuario = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='usuario')
    user_matched = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='User_matched')
    timestamp = models.DateTimeField(auto_now_add=True)
    match_successful = models.BooleanField(blank=True, default=True)
    class Meta:
        unique_together = ('usuario', 'user_matched')
        #ordering = ('timestamp',)