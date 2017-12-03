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
const ROLL_DICE_ACTION = 'roll_dice';
const GET_MY_ACCOUNT_BALANCE_ACTION = 'get_my_account_balance';
const GET_PLAYER_ACCOUNT_BALANCE_ACTION = 'get_player_account_balance';
const GET_MY_PROPERTIES_ACTION = 'get_my_properties';
const GET_PLAYER_PROPERTIES_ACTION = 'get_player_properties';
const MORTGAGE_PROPERTY_ACTION = 'mortgage_property';
const UNMORTGAGE_PROPERTY_ACTION = 'unmortgage_property';

// the parameters that are parsed from the make_name intent 
const NUM_PLAYERS_ARGUMENT = 'num_players';
const PLAYER_NAMES_ARGUMENT = 'player';
const PROPERTIES_ARGUMENT = 'properties';


app.post('/', function (request, response) {
	console.log('headers: ' + JSON.stringify(request.headers));
	console.log('body: ' + JSON.stringify(request.body));

	const app = new App({request: request, response: response});
		
	let actionMap = new Map();
	actionMap.set(SET_PLAYER_NUM_ACTION, set_player_num);
	actionMap.set(SET_NAMES_ACTION, set_names);
	actionMap.set(SET_NAMES_YES_ACTION, start_game);
	actionMap.set(ROLL_DICE_ACTION, roll_dice);
	actionMap.set(GET_MY_ACCOUNT_BALANCE_ACTION, get_my_account_balance);
	actionMap.set(GET_PLAYER_ACCOUNT_BALANCE_ACTION, get_player_account_balance);
	actionMap.set(GET_MY_PROPERTIES_ACTION, get_my_properties);
	actionMap.set(GET_PLAYER_PROPERTIES_ACTION, get_player_properties);
	actionMap.set(MORTGAGE_PROPERTY_ACTION, mortgage_property);
	actionMap.set(UNMORTGAGE_PROPERTY_ACTION, unmortgage_property);

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

function roll_dice(app) {
	//get player whose turn it is
	//check if they've rolled the dice already
	//check if they're in jail, if yes roll for doubles for freedom, else wait
	//roll the dice
	//move them to the appropriate spot
	//tell them where they landed
	//execute any special thing they have to do e.g. go to jail, buy a property or auction it off
	//let them know if they've passed go
	//let them know that they've rolled doubles and can go again
	//send them to jail for speeding if they've rolled doubles 3 times
	app.ask('You rolled double sixes hurray!');
}

function get_my_account_balance(app) {
	//get current player name
	//look up how much money they have
	app.ask('You have $1500 in your bank account');
}

function get_player_account_balance(app) {
	var player_name = app.getArgument(PLAYER_NAMES_ARGUMENT);
	//check if it is a valid player name
	//look up how much money they have.
	app.ask(player_name + ' has $200.');
}

function get_my_properties(app) {
	//get current player name
	app.ask('you own park place');
}

function get_player_properties(app) {
	var player_name = app.getArgument(PLAYER_NAMES_ARGUMENT);
	//check if it is a valid player name
	app.ask(player_name + ' owns vermont avenue.');
}

function mortgage_property(app) {
	var properties = app.getArgument(PROPERTIES_ARGUMENT);
	//check if player owns those properties
	//check if properties are already mortgaged
	//mortgage given properties
	app.ask('OK, I mortgaged ' + properties);
}

function unmortgage_property(app) {
	var properties = app.getArgument(PROPERTIES_ARGUMENT);
	//check if player owns those properties
	//check if properties are mortgaged
	//unmortgage those properties
	app.ask('OK, I unmortgaged ' + properties);
}
