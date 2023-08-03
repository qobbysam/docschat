from django.db import models
from django.contrib.auth.models import User
from company.models import CompanyModel
# Create your models here.


# class UserProfile(AbstractBaseUser):
#     bio = models.TextField(max_length=500, blank=True)
#     is_company_admin= models.BooleanField()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    verified = models.BooleanField(default=False)
    # Add any additional fields you want for the user profile
    # For example:
    bio = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True)
    company = models.ForeignKey(CompanyModel, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.user.username