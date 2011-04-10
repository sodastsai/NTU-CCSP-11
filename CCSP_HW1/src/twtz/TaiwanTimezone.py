## http://practicalappengine.blogspot.com/2010_08_01_archive.html
# ericsk's blog

from datetime import tzinfo, timedelta

# use django 1.2
from google.appengine.dist import use_library
use_library('django', '1.2') 

## Taiwan time zone of tzinfo
class TaiwanTimeZone(tzinfo):  
    def utcoffset(self, dt):
        return timedelta(hours=8)  
    def tzname(self, dt):
        return 'CST'  
    def dst(self, dt):
        return timedelta(hours=0) 