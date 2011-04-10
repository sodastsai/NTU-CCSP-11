## http://practicalappengine.blogspot.com/2010_08_01_archive.html
# ericsk's blog

from datetime import timedelta

# Use django 1.2
from google.appengine.dist import use_library
use_library('django', '1.2')

from google.appengine.ext.webapp import template

from TaiwanTimezone import TaiwanTimeZone

# get template register  
register = template.create_template_register()  
 
@register.filter  
def twtz(value):    
    return (value + timedelta(hours=8)).replace(tzinfo=TaiwanTimeZone())

register.filter(twtz)