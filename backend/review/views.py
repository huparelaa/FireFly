from accounts.models import UserAccount 
from django.http.response import JsonResponse
from firefly.utils import get_user_id
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Review
import json

@api_view(['POST'])
def save_review(request):
    data = json.loads(request.body.decode('utf-8'))
    user_id = get_user_id(request)
    rate = data.get('rating')
    review = data.get('review')
    reviewer = UserAccount.objects.get(id=user_id)
    reviewed = UserAccount.objects.get(id= data.get('id_person'))

    complete_review = Review(person_reviewer=reviewer, person_reviewed=reviewed,review_info=review ,calification=rate)

    complete_review.save()

    return JsonResponse({'Confirm':'Review saved'})
