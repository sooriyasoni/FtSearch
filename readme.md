About:
This is a task from Financial Times given to me to design and build a server-rendered site that displays the article list from The Financial Times.
It will provide a search box for users to search for headlines containing specific words (i.e. searching for
"brexit" should return a list of brexit-related headlines).

It includes follwing features :
● Be responsive: The developed site is responsive and tested using DevTool for different types of devices using Google Chrome browser.
● Be accessible: Basic accessibilty implemented for buttons, page language, search box and search button. Like, <html lang="en-GB" .... > <a title="Go to Financial Times homepage">
● Have pagination: Implemented pagination with previous,current page number and next page button icons. When on page 1 ,the previous will hide and not show until the user will move to next page using next button.
● Built using Javascript and node.js : Developed using NodeJS with Express framework and request module for server side rendering. Used Javascript ES5 for client side as suggested.
● Not reliant on client-side frameworks (i.e. Angular, React) or libraries like jQuery as suggested.
● Progressively enhanced: It is compatible with all browsers like Chrome, Mozilla FireFox, Internet Explorer, Safari. Here, I have used ES5 rather than ES6 specifically to make it compatible with Internet Explorer browser.
● Deployed on Heroku : Build and Deployed using Heroku as per suggestion .
● Have a similar look and feel as ft.com
● Performs well over 3G networks : Tested and working fine using browser network throtteling with slow networks.
● Works offline : Implemented this functionality in Google Chrome using service worker. Cached the pages and site using JavaScript event listeners. Works offline successfully once the site is cached.

website: https://ftsearch-v1.herokuapp.com/

Requirements:
Node
Git

Common setup:
Clone the repo and install the dependencies.
heroku git:clone -a ftsearch-v1
cd ftsearch-v1
npm install

To start the express server, run the following
npm run start

Open http://localhost:5000 and take a look around.
