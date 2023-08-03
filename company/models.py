from django.db import models

# Create your models here.


class CompanyModel(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    key = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self) -> str:
        return self.name