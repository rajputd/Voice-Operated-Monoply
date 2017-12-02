'use strict';

//Enable actions client library debugging
process.env.DEBUG = 'actions-on-google:*';

let App = require('actions-on-google').DialogflowApp;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));

// the context names
const SET_NAMES_CONTEXT = 'set_names';
const CONFIRM_NAMES_CONTEXT = 'confirmNames';
const TURN_ACTION_CONTEXT = 'turn_action';

// the action name from the make_name Dialogflow intent
const SET_PLAYER_NUM_ACTION = 'set_player_num';
const SET_NAMES_ACTION = 'get_names';
const SET_NAMES_YES_ACTION = 'setNames.setNames-yes';

// the parameters that are parsed from the make_name intent 
const NUM_PLAYERS_ARGUMENT = 'num_players';
const PLAYER_NAMES_ARGUMENT = 'player';


app.post('/', function (request, response) {
	console.log('headers: ' + JSON.stringify(request.headers));
	console.log('body: ' + JSON.stringify(request.body));

	const app = new App({request: request, response: response});
		
	let actionMap = new Map();
	actionMap.set(SET_PLAYER_NUM_ACTION, set_player_num);
	actionMap.set(SET_NAMES_ACTION, set_names);
	actionMap.set(SET_NAMES_YES_ACTION, start_game);


	app.handleRequest(actionMap);


	//response.sendStatus(200); // OK
});

// Start the server
var server = app.listen(app.get('port'), function () {
	console.log('App listening on port %s', server.address().port);
	console.log('Press Ctrl+C to quit.');
});


function set_player_num(app) {
	app.data.player_num = app.getArgument(NUM_PLAYERS_ARGUMENT);
	app.ask('Alright, so we are going to have ' + app.data.player_num + 
		' players then? Is that correct?');
}

function set_names(app) {
	let player_names = app.getArgument(PLAYER_NAMES_ARGUMENT);
	if(player_names.length < app.data.player_num || player_names.length > app.data.player_num) {
		if (app.setContext(SET_NAMES_CONTEXT, 1) == null) {
			console.log(SET_NAMES_CONTEXT + ' context does not exist');
		} else {
			console.log('successfully set ' + SET_NAMES_CONTEXT + ' context');
		}
		app.ask('I\'m sorry I heard ' + player_names.length + ' names when there are '
			+ app.data.player_num + ' players. Please list the names again');
	} else {
		app.setContext(CONFIRM_NAMES_CONTEXT, 1);
		app.data.player_names = player_names;
		app.ask('Alright, so our ' + app.data.player_num + ' players are ' + player_names.slice(0, player_names.length - 1) + 
				' and ' + player_names[player_names.length - 1] + '. Did I get everyone?');
	}
}

function start_game(app) {
	//instantiate players from app.data.player_names
	//app.data.board = new Board
	//select a random player
	var current_player = 'some player';
	app.setContext(TURN_ACTION_CONTEXT);
	app.ask('Great! The game will now start. ' + current_player + ' will go first. During your turn, you can  check your balance, mortgage and unmortgage any properties you own, buy and sell houses on any properties you have a monopoly on, trade with other players, and roll the dice to move.');
}



