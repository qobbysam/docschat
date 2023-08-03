from logging import getLogger

from django.contrib.auth.models import Group
from django.db.models.signals import post_migrate
from django.dispatch import receiver




logger = getLogger(__name__)
'''
This will create some user groups that will be used through out the application.
I figured just a company owner and invited users

The plan is to restrict some views and view elements only to users that belong to a group

This method will make sure the groups are created on startup of application

this is initialized in the apps.py 

'''
@receiver(post_migrate)
def create_user_group(sender, **kwargs):
    if kwargs.get('app') == 'customuser':
        #these group names can also be defined in the settings
        #this will give it access throughout the project
        group_name = 'company_owner'
        group,created = Group.objects.get_or_create(name=group_name)

        if created:
            logger.info("User group {} created successfully".format(group_name))

        #create other groups
