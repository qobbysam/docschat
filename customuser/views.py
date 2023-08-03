from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.contrib import messages

from django.views import View
from .forms import CompleteProfileForm
from company.models import CompanyModel
from .models import UserProfile

class CompleteProfileView(LoginRequiredMixin, View):
    def get(self, request):
        user = request.user
        user_profile , created= UserProfile.objects.get_or_create(user=request.user)
        if user_profile.verified and user_profile.company:
            return redirect('/userapp')  # Redirect to home or any other appropriate page

        form = CompleteProfileForm()
        return render(request, 'account/complete_profile.html', {'form': form})

    def post(self, request):
        user = request.user
        user_profile , created= UserProfile.objects.get_or_create(user=request.user)

        if user_profile.verified and user_profile.company:
            return redirect('/userapp')  # Redirect to home or any other appropriate page

        form = CompleteProfileForm(request.POST)
        if form.is_valid():
            user_profile.verified = True
            user_profile.bio = form.cleaned_data['bio']
            user_profile.profile_image = form.cleaned_data['profile_image']
            company_key = form.cleaned_data['company_key']
            if company_key :
                try:
                    company = CompanyModel.objects.get(key=company_key)
                    user_profile.company = company
              
                except CompanyModel.DoesNotExist:
                    pass

            user_profile.save()
            return redirect('/userapp')  # Redirect to home or any other appropriate page
        
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"Error in field '{form.fields[field].label}': {error}")

        

        return render(request, 'account/complete_profile.html', {'form': form})

# Create your views here.
