# voveo


# purpose

voveo is intended to making voting as easy and accessible as possible by providing polling and election information to users through an intuitive user interface and a data driven mindset.

# technical summary

voveo will be a single page application powered by Rails and AngularJS. voveo will act as a resource for finding election and polling information based upon a users address. This application will consume the Google Civic Information API, which will provide the polling and election information. There will be three models: users, election info, and polling info.

- API: https://developers.google.com/civic-information/

# user stories

- A user doesn't have to login/create an account to query for polling/election information, you will be able to do this from the landing page right away.
- If a user wants to save any information they can create a user account that will have JWT auth.
- Once a user is logged in they will be able to query just as before but they will have the option to save this information to their user profile, and can update this info by personalizing based upon the users intentionality of saving this info.
- A user will be able to add and delete as many polling/election pieces of data to their page as they want.
-  A user will be able to add personal information to each saved query (ie: putting a first and last name if they are tracking for individuals.)


# stretch goals

- You have the option to add an email to your saved polling/election information that will send you your info.
- Add the ability to query for your representatives and add links to their sites/ways to contact them.
