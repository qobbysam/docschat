
from django.urls import path 
from .views import CompleteProfileView
urlpatterns = [
        path('', CompleteProfileView.as_view(), name='complete_profile'),
]
