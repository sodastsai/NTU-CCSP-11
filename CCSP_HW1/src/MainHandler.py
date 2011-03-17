from google.appengine.dist import use_library
use_library('django', '1.2')

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

import os


class MainPage(webapp.RequestHandler):    
    def get(self):
        # Get user information
        user = users.get_current_user()
        if user is None:
            # Not logged
            self.redirect(users.create_login_url(self.request.uri))
            return
        
        # Output
        templateDict = { "logout": users.create_logout_url("http://www.google.com/") }
        indexPath = os.path.join(os.path.dirname(__file__), "index.html")
        self.response.out.write(template.render(indexPath, templateDict))

application = webapp.WSGIApplication([('/', MainPage)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
