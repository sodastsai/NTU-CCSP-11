## http://practicalappengine.blogspot.com/2010_08_01_archive.html

from datetime import tzinfo, timedelta 

class TaiwanTimeZone(tzinfo):  
    def utcoffset(self, dt):  #@UnusedVariable
        return timedelta(hours=8)  
    def tzname(self, dt):  #@UnusedVariable
        return 'CST'  
    def dst(self, dt):  #@UnusedVariable
        return timedelta(hours=0) 