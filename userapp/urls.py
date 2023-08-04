
from django.urls import path 

from . import views

urlpatterns = [
    
     path("", views.DashboardView.as_view(), name="dashboard" ),
     path("chat/",views.GeneralChatView.as_view(), name="general-chat"),
     path("science-chat/", views.ScienceChatView.as_view(), name="science-chat"),
     path("law-chat/", views.LawChatView.as_view(), name="law-chat"),
     path("reports/", views.ReportsView.as_view(), name="reports" ),
     path("uploads/", views.UploadView.as_view(), name="uploads")
]
