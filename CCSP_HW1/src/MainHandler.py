import os
from datetime import timedelta

# Use django 1.2
from google.appengine.dist import use_library
use_library('django', '1.2')

from google.appengine.api import users
from google.appengine.ext import webapp, db
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
from django.utils import simplejson as json 

from twtz.TaiwanTimezone import TaiwanTimeZone

## Taiwan time zone filter
template.register_template_library('twtz.DjangoTwtz')

## Message data model
class Message(db.Model):
    author = db.UserProperty()
    content = db.StringProperty(multiline=True)
    date = db.DateTimeProperty(auto_now_add=True)

## Main page to show
class MainPage(webapp.RequestHandler):    
    def get(self):
        # Get user information
        user = users.get_current_user()
        if user is None:
            # Not logged in
            self.redirect(users.create_login_url(self.request.uri))
            return
        
        # Fetch Messages from datastore
        messages = Message.all().order('-date').fetch(10)
        
        # Output
        templateDict = {"logout": users.create_logout_url(self.request.uri),
                        "username": user.nickname(),
                        "messages": messages}
        indexPath = os.path.join(os.path.dirname(__file__), "index.html")
        self.response.out.write(template.render(indexPath, templateDict))

## Write message into datastore
class WriteBook(webapp.RequestHandler):
    def post(self):
        # A new data model object
        msg = Message()
        # Get user value
        if users.get_current_user():
            msg.author = users.get_current_user()
        # Get content
        msg.content = self.request.get('content')
        # Write!
        key = msg.put()
        
        # convert date for display
        date = (msg.date+timedelta(hours=8)).replace(tzinfo=TaiwanTimeZone()).strftime("%I:%M %p, %a, %d %b. '%y")
        # return json for ajax
        msgDict = {"author":msg.author.nickname(), "content": msg.content, "date": date, "key": str(key)}
        self.response.out.write(json.dumps(msgDict))

## Delete message from datastore
class DeleteBook(webapp.RequestHandler):
    def post(self):
        # Get data model object
        msg = db.get(self.request.get("key"))
        # Check and delete
        if msg is not None:
            msg.delete()
        # Report the key of deleted message for ajax
        self.response.out.write(self.request.get("key"))
        
## Not found - Redirect back to root
class NotFound(webapp.RequestHandler):
    def get(self):
        self.redirect("/")

## Webapp object
application = webapp.WSGIApplication([('/', MainPage),
                                      ('/send', WriteBook),
                                      ('/delete', DeleteBook),
                                      ('/.*', NotFound)], debug=True)

## Memcached main function
def main():
    run_wsgi_app(application)

# Check self
if __name__ == "__main__":
    main()
