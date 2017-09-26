# voveo

LIVE SITE: http://voveo.herokuapp.com/

# purpose

voveo is intended to make participating in the political process as easy and accessible as possible by providing polling and election, and representative information to users through an intuitive user interface and a data driven mindset.

# technical summary

tech used: HTML, CSS, JavaScript, SQL, Rails, Node.js, Express, AngularJS

voveo will be a single page application powered by Rails and AngularJS. voveo acts as a demo page for the broader tech provided by voveo-services. This application will consume the Google Civic Information API, which will representative data. There is two models - users (client) and data (analytics on searches).

- API: https://developers.google.com/civic-information/


# user stories

- A user doesn't have to login/create an account to query for polling/election information, you will be able to do this from the landing page right away.
- If a user wants to save any information they can create a user account that will have JWT auth.
- Once a user is logged in they will be able to query just as before but they will have the option to save this information to their user profile, and can update this info by personalizing based upon the users intentionality of saving this info.
- A user will be able to add and delete as many polling/election pieces of data to their page as they want.
-  A user will be able to add personal information to each saved query (ie: putting a first and last name if they are tracking for individuals.)


# PLANNED FEATURES

- Add an email model to collect names/emails of voluntary users to add to a newsletter.
- Add a multiple search options during election season so you can query for polling locations.
