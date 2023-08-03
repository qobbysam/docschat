import json
from django import template
from django.utils.safestring import mark_safe
from customuser.models import UserProfile
register = template.Library()

@register.simple_tag(takes_context=True)
def load_config_vars(context):

    request = context['request']

    script_html = """
                <script>
                    window.ConfigVars = {config_vars}
                    window.Q = "sa"
                </script>
                """
    
    config_vars = {
        'companyid': "0"
    }

    try:
        userprofile = UserProfile.objects.get(user=request.user)

        company_id = userprofile.company.id 
        config_vars['companyid'] = str(company_id)
        config_vars['userid'] = str(request.user.id)

        return mark_safe(script_html.format(config_vars=json.dumps(config_vars)))
    
    except Exception as e:
        return mark_safe(script_html.format(config_vars=json.dumps(config_vars)))
 
