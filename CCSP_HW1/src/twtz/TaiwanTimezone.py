## http://practicalappengine.blogspot.com/2010_08_01_archive.html
from google.appengine.dist import use_library
use_library('django', '1.2')

from datetime import tzinfo, timedelta 

## Taiwan time zone of tzinfo
class TaiwanTimeZone(tzinfo):  
    def utcoffset(self, dt):  #@UnusedVariable
        return timedelta(hours=8)  
    def tzname(self, dt):  #@UnusedVariable
        return 'CST'  
    def dst(self, dt):  #@UnusedVariable
        return timedelta(hours=0) 