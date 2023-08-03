from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_username

from .forms import UserProfileForm
from .models import UserProfile

class CustomAccountAdapter(DefaultAccountAdapter):

    def create_user(self, request, user, **kwargs):
        user = super().create_user(request, user, **kwargs)
        profile = UserProfile.objects.create(user=user)
        return user
    
    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, commit=False)
        if not user.username:
            user_username(user, user.email.split('@')[0])
        if commit:
            user.save()

        # Create user profile
        # profile = user.userprofile  # Access the user profile
        # profile.bio = form.cleaned_data.get('bio')
        # profile.profile_image = form.cleaned_data.get('profile_image')
        # profile.save()

        return user
    
    def get_login_redirect_url(self, request):
        user = request.user
        user_profile, created = UserProfile.objects.get_or_create(user=user)

        print(request)

        if created:
            return '/complete-profile/'
        
        if not user_profile.verified or not user_profile.company:
            return '/complete-profile/'  # Replace with your complete profile URL
        return super().get_login_redirect_url(request)

    def get_signup_redirect_url(self, request):
        return '/complete-profile/'