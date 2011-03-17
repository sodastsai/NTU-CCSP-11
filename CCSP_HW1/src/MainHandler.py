from google.appengine.dist import use_library
use_library('django', '1.2')

from google.appengine.api import users
from google.appengine.ext import webapp, db
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

import os

## Timezone filter
template.register_template_library('twtz.DjangoTwtz')

class Message(db.Model):
    author = db.UserProperty()
    content = db.StringProperty(multiline=True)
    date = db.DateTimeProperty(auto_now_add=True)

class MainPage(webapp.RequestHandler):    
    def get(self):
        # Get user information
        user = users.get_current_user()
        if user is None:
            # Not logged
            self.redirect(users.create_login_url(self.request.uri))
            return
        
        # Messages
        messages = Message.all().order('-date').fetch(10)
        
        # Output
        templateDict = {
                        "logout": users.create_logout_url(self.request.uri),
                        "username": user.nickname(),
                        "messages": messages
                        }
        indexPath = os.path.join(os.path.dirname(__file__), "index.html")
        self.response.out.write(template.render(indexPath, templateDict))
        
class Guestbook(webapp.RequestHandler):
    def post(self):
        msg = Message()
        if users.get_current_user():
            msg.author = users.get_current_user()
        
        msg.content = self.request.get('content')
        msg.put()
        self.redirect('/')
        
class NotFound(webapp.RequestHandler):
    def get(self):
        self.redirect("/")

application = webapp.WSGIApplication([('/', MainPage), ('/send', Guestbook), ('/.*', NotFound)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
