from django import forms
from allauth.account.forms import SignupForm
from company.models import CompanyModel
from .models import UserProfile


# class CustomSignupForm(SignupForm):
#     #company_key = forms.CharField(max_length=50, required=False)

#     # def custom_signup(self, request, user):
#     #     profile = UserProfile.objects.create(user=user)
#     #     profile.bio = self.cleaned_data['bio']
#     #     profile.profile_image = self.cleaned_data['profile_image']
#     #     profile.save()

#     # def save(self, request):
#     #     user = super(CustomSignupForm, self).save(request)
#     #     #company_key = self.cleaned_data['company_key']

#     #     # if company_key:
#     #     #     # Assuming Company model has a 'key' field
#     #     #     try:
#     #     #         company = CompanyModel.objects.get(key=company_key)
#     #     #         user.company = company
#     #     #         user.save()
#     #     #     except CompanyModel.DoesNotExist:
#     #     #         pass

#     #     return user

class CompleteProfileForm(forms.ModelForm):
    company_key = forms.CharField(max_length=100, required=True)
    class Meta:
        model = UserProfile
        fields = ['bio', 'profile_image', 'company_key']

    def clean_company_key(self):
        company_key = self.cleaned_data['company_key']
        if not company_key:
            raise forms.ValidationError("Company key is required.")

        try:
            company = CompanyModel.objects.get(key=company_key)

        except Exception as e:
            raise forms.ValidationError("{} company key does not exist".format(company_key))

        return company_key
    

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('bio', 'profile_image')