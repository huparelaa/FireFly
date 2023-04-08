from django.urls import path, include, re_path
from django.views.generic import TemplateView
from accounts import views as vAccounts
from games import views as vGames
from friendlist import views as vFriendList
from match import views as vMatch
from chat import views as vChat
urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('user/has_entered_before/', vAccounts.has_entered_before, name='has_entered_before'),
    path('user/has_entered_before_true/', vAccounts.has_entered_before_true, name='has_entered_before_true'), 
    path('api/games_selected/', vGames.select_games, name='select_games'),
    path('api/profile/', vAccounts.get_user_profile, name = 'get_user_profile'),
    path('api/get_name_photo/', vAccounts.get_user_name_photo, name = "get_user_photo"),
    path('api/get_friends/', vFriendList.get_friends, name = "get_friends"), 
    path('api/add_friends/', vFriendList.add_friend, name = "add_friend"),

    path('api/profile/change_info/', vAccounts.change_user_info, name = "change_user_info" ), 
    path('search/', vAccounts.get_user_by_search, name='buscar_usuario'),
    path('profile/<int:user_id>/', vAccounts.get_user_by_id, name='profile_by_id'),


    path('agregar_juegos/', vGames.agregar_juegos, name='agregar_juegos'),
    path('match/', vMatch.match, name = "match"), 
    path('analytics/more_played_games/', vGames.more_played_games, name = "more_played_games"), 
    
    path('agregar_juegos/', vGames.agregar_juegos, name='agregar_juegos'),

    path('api/messages/<int:receiver_id>/', vChat.lista_mensajes, name='message-detail'),  # For GET request.
    path('api/messenger/<int:receiver_id>/', vChat.send_message, name='message-list'),   # For POST
    path('api/contacts/', vChat.lista_contactos, name="message-contacts"),      #GET
    path('api/users/<int:pk>/', vChat.user_list, name='user-detail'),      # GET request for user with id
    path('api/users/', vChat.user_list, name='user-list'),    # POST for new user and GET for all users list
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
