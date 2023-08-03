from django.urls import path 

from . import views_api

urlpatterns = [
        path('api-new-session/', views_api.NewSession.as_view(), name='api-new-session'),
        path('api-recent-sessions/', views_api.RecentSessions.as_view(), name='api-recent-sessions'),
        path('api-send-prompt-super/', views_api.SuperSendPrompt.as_view(), name='api-send-prompt-super'),
        path('api-chat-history/<int:session_id>', views_api.SessionChatHistory.as_view(), name='api-chat-history')

]