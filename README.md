# Voice-Operated-Monopoly

### Authors
Nick Wilbur, Ernie Chu, and Dileep Rajput

### Description
A voice operated Monopoly game that takes the monotony out of Monopoly. Users can speak commands such as "Roll dice" and "Buy Park Place" and watch as the system takes care of all of the piece moving and money handling. This project uses Dialogflow to handle all NLU and google assistant as its main interface.

### Installation

##### Prerequisites

 * [nodejs v8.1.3](https://nodejs.org/en/download/)
 	* you can see what version of node you have by running `node -v ` in the terminal.
 * [Dialogflow project](https://dialogflow.com/)
 * Hosting Service
 * Heroku, AWS, Firebase, or ngrok should do the trick.

##### Installation Steps

1. run `npm install` to add all dependencies. This only needs to be done once.
2. run `node app.js` in the terminal to start the server.
3. Add the url this project is hosted on to your Dialogflow fulfillment page. Remember to use https!
4. you're good to go!
