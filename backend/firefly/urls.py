from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts import views as vAccounts
from games import views as vGames
from friendlist import views as vFriendList
from match import views as vMatch
from chat import views as vChat
from roomChat import views as vRoom
from review import views as vReview
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('user/has_entered_before/', vAccounts.has_entered_before, name='has_entered_before'),
    path('user/has_entered_before_true/', vAccounts.has_entered_before_true, name='has_entered_before_true'), 
    path('api/games_selected/', vGames.select_games, name='select_games'),
    path('api/profile/', vAccounts.get_user_profile, name = 'get_user_profile'),
    path('profile/<int:user_id>/', vAccounts.get_user_by_id, name='profile_by_id'),
    path('api/profile_juegos/', vAccounts.user_games, name = 'user_games'),
    path('api/profile_juegos/<int:user_id>/', vAccounts.user_games_by_id, name = 'user_games_by_id'),
    path('api/get_name_photo/', vAccounts.get_user_name_photo, name = "get_user_photo"),
    path('api/get_user_state/', vAccounts.set_status_user, name = "set_user_state"),
    path('api/logout_user/', vAccounts.logout_status, name = "logout_state"),
    
    path('api/get_friends/', vFriendList.get_friends, name = "get_friends"), 
    path('api/add_friends/', vFriendList.add_friend, name = "add_friend"),
    path('api/delete_friends/', vFriendList.delete_friend, name = "delete_friend"),
    path('api/block_friends/', vFriendList.block_friend, name = "block_friend"),

    path('api/profile/change_info/', vAccounts.change_user_info, name = "change_user_info" ), 
    path('search/', vAccounts.get_user_by_search, name='buscar_usuario'),

    path('agregar_juegos/', vGames.agregar_juegos, name='agregar_juegos'),
    path('analytics/more_played_games/', vGames.more_played_games, name = "more_played_games"), 
    path('analytics/select_more_played_games/', vGames.recommended_games, name = "recommended_games"),
    path('api/games_selected_recommended/', vGames.select_gamesRecommended, name='select_games'),
    path('api/games_blocked_recommended/', vGames.block_gamesRecommended, name='block_games'),
    path('agregar_juegos/', vGames.agregar_juegos, name='agregar_juegos'),

    #MENSAJERIA ENTRE USUARIOS
    path('api/messages/<int:receiver_id>/', vChat.lista_mensajes, name='message-detail'),  # For GET request.
    path('api/messenger/<int:receiver_id>/', vChat.send_message, name='message-list'),   # For POST
    path('api/contacts/', vChat.lista_contactos, name="message-contacts"),      #GET

    #MENSAJERÍA DE ROOMS
    path('api/room/', vRoom.create_room, name='room-post'),
    path('api/room/<room_id>/', vRoom.get_chatroom_members, name='room-get-member'),
    path('api/room_contacts/', vRoom.get_rooms, name='room-get-list-rooms'),
    path('api/room_messenger/<room_id>/', vRoom.send_message, name='send-message-to-room'), #POST
    path('api/room_messages/<room_id>/', vRoom.lista_mensajes, name='message-list-room'), 

    #REVIEWS
    path('api/review/', vReview.save_review, name='review-post'),

    #MATCH HISTORY
    path('match/', vMatch.match, name = "match"), 
    path('do_match/', vMatch.doMatch, name = "do_match"), #POST
    path('get_last_matches/', vMatch.getLastThreeMatches, name = "get_last_matches"), #GET
    path('get_matches/', vMatch.getMatches, name = "get_matches"), #GET
    path('block_match/', vMatch.blockMatch, name = "block_match"), #POST

    #SWAGGER
    path('api/schema/',SpectacularAPIView.as_view(),name='schema'),
    path('api/schemas/docs/',SpectacularSwaggerView.as_view(url_name='schema')),
    
    #UPLOAD 
    path('api/profile/upload_profile_photo/', vAccounts.upload_profile_photo, name='upload_profile_photo'),
    path('api/profile/upload_background_photo/', vAccounts.upload_background_photo, name='upload_background_photo'),
    # GET Profile Photo URL
    path('api/profile/get_profile_photo_url/', vAccounts.get_profile_photo_url, name='get_profile_photo_url'),
    
    # GET Background Photo URL
    path('api/profile/get_background_photo_url/', vAccounts.get_background_photo_url, name='get_background_photo_url'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
