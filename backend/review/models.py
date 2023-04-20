from accounts.models import UserAccount
from django.db import models
class Review(models.Model):
    person_reviewer = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='person_reviewer')        
    person_reviewed = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='person_review')
    review_info = models.CharField(max_length=1200)
    CALIFICATION_CHOICES = (
        (1.0, '1.0'),
        (1.5, '1.5'),
        (2.0, '2.0'),
        (2.5, '2.5'),
        (3.5, '3.5'),
        (4.0, '4.0'),
        (4.5, '4,5'),
        (5.0, '5.0')
    )
    calification = models.FloatField(choices=CALIFICATION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)