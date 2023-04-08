from django.http import HttpResponse
from django.conf import settings
from django.http import HttpResponse
import jwt
from jwt.exceptions import InvalidSignatureError

def get_user_id(request):
    auth_header = request.headers.get('Authorization', None)
    if auth_header is None: 
        return HttpResponse(status=401)
    auth_parts = auth_header.split(' ')
    if len(auth_parts) != 2 or auth_parts[0] != 'JWT': 
        return HttpResponse(status=401)
    token = auth_parts[1]
        # Decodificar el token
    payload = verify_token(token)
    if payload is None: 
        return HttpResponse(status=401)    
    
    user_id = payload.get('user_id', None)
    return user_id

def verify_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except InvalidSignatureError:
        return None