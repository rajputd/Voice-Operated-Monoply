'use strict';

//Enable actions client library debugging
process.env.DEBUG = 'actions-on-google:*';

let App = require('actions-on-google').DialogflowApp;
let express = require('express');
let bodyParser = require('body-parser');
let Game = require('./game');
let GameObjects = require('./gameObjects');
let game;

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
const GET_PROPERTY_OWNER_ACTION = 'get_property_owner';
const BUILD_HOUSE_ACTION = 'build_house';
const BUILD_HOTEL_ACTION = 'build_hotel';
const END_TURN_ACTION = 'end_turn';
const SELL_HOUSE_ACTION = 'sell_houses';
const USE_JAIL_CARD_ACTION = 'use_jail_card';
const BUY_CURRENT_PROPERTY_ACTION = 'buy_current_property';


// the parameters that are parsed from the make_name intent
const NUM_PLAYERS_ARGUMENT = 'num_players';
const PLAYER_NAMES_ARGUMENT = 'player';
const PROPERTIES_ARGUMENT = 'properties';
const NUMBER_OF_HOUSES_ARGUMENT = 'house_number';


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
	actionMap.set(GET_PROPERTY_OWNER_ACTION, get_property_owner);
	actionMap.set(BUILD_HOUSE_ACTION, build_house);
	actionMap.set(BUILD_HOTEL_ACTION, build_hotel);
	actionMap.set(END_TURN_ACTION, end_turn);
	actionMap.set(SELL_HOUSE_ACTION, sell_house);
	actionMap.set(USE_JAIL_CARD_ACTION, use_jail_card);
	actionMap.set(BUY_CURRENT_PROPERTY_ACTION, buy_current_property);


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
	//instantiate game
	var player_names = app.data.player_names;
	game = new Game(player_names);

	//select a random player
	var current_player_index = Math.floor(Math.random() * player_names.length);
	var current_player_name = player_names[current_player_index];
	app.data.current_player_index = current_player_index;
	app.data.has_rolled_dice = false;

	app.setContext(TURN_ACTION_CONTEXT);
	app.ask('Great! The game will now start. ' + current_player_name + ' will go first. During your turn, you can  check your balance, mortgage and unmortgage any properties you own, buy and sell houses on any properties you have a monopoly on, trade with other players, and roll the dice to move.');
}

function roll_dice(app) {
	//get player whose turn it is
	var curr_player_index = app.data.current_player_index;
	var curr_player_name = app.data.player_names[curr_player_index];
	var curr_player = game.players[curr_player_name];

	//check if they're in jail, if yes roll for doubles for freedom, else wait

	//check if they've rolled the dice already
	if(!app.data.has_rolled_dice) {
		var board = game.gameBoard;
		var players = game.players;
		var dice_results = GameObjects.rollDice();
		var new_space = GameObjects.getNewSpace(curr_player, board, dice_results[0]);
		var chance = game.chanceCards;
		var chest = game.chestCards;
		var msg = GameObjects.movePlayer(curr_player, board, players, dice_results[0], new_space, chance, chest);
		app.data.has_rolled_dice = true;
		app.ask(msg);
	} else {
		app.ask("I'm sorry you have already rolled the dice this turn");
	}
}

function get_my_account_balance(app) {
	//get player whose turn it is
	var curr_player_index = app.data.current_player_index;
	var curr_player_name = app.data.player_names[curr_player_index];
	var curr_player = game.players[curr_player_name];
	//look up how much money they have
	app.ask('You have $' + curr_player.get_cash() + ' in your bank account');
}

function get_player_account_balance(app) {
	var player_name = app.getArgument(PLAYER_NAMES_ARGUMENT);
	var player = game.players[player_name];
	app.ask(player_name + ' has $' + player.get_cash() + ' in their bank account');
}

function get_my_properties(app) {
	//get player whose turn it is
	var curr_player_index = app.data.current_player_index;
	var curr_player_name = app.data.player_names[curr_player_index];
	var curr_player = game.players[curr_player_name];
	var properties = curr_player.get_prop_list();
	if(properties.length == 0){
		app.ask('you don\'t own any properties');
	} else if (properties.length == 1){
		app.ask('you own ' + properties);
	} else {
	app.ask('you own ' + properties.splice(0, properties.length - 1) + ' and ' + properties[properties.length - 1]);
	}
}

function get_player_properties(app) {
	var player_name = app.getArgument(PLAYER_NAMES_ARGUMENT);
	var player = game.players[player_name];
	var properties = player.get_prop_list();
	if(properties.length == 0){
		app.ask(player_name + ' doesn\'t own any properties');
	} else if (properties.length == 1){
		app.ask(player_name + ' owns ' + properties);
	} else {
	app.ask( player_name + ' owns ' + properties.splice(0, properties.length - 1) + ' and ' + properties[properties.length - 1]);
	}
}

function mortgage_property(app) {
	var properties = app.getArgument(PROPERTIES_ARGUMENT);
	var msg = '';

	var curr_player_index = app.data.current_player_index;
	var curr_player_name = app.data.player_names[curr_player_index];
	var curr_player = game.players[curr_player_name];

	for(i = 0; i < properties.length; i++) {
		var prop_obj = game.getProperty(properties[i]);
		msg += GameObjects.mortgageProperty(curr_player, prop_obj);
	}
	app.ask(msg);
}

function unmortgage_property(app) {
	var properties = app.getArgument(PROPERTIES_ARGUMENT);
	var msg = '';

	var curr_player_index = app.data.current_player_index;
	var curr_player_name = app.data.player_names[curr_player_index];
	var curr_player = game.players[curr_player_name];

	for(i = 0; i < properties.length; i++) {
		var prop_obj = game.getProperty(properties[i]);
		msg += GameObjects.mortgageProperty(curr_player, prop_obj);
	}
	app.ask(msg);
}

function get_property_owner(app) {
	var property = app.getArgument(PROPERTIES_ARGUMENT);
	var property_obj = game.getProperty(property);
	//loop through properties and list out their owners
	//if the property list is greater than the number of players, list the properties by player e.g. nick owns parkplace and vermont
	if (property_obj.get_owner() == undefined) {
		app.ask("nobody owns " + property);
	} else {
		app.ask(property + ' is owned by ' + property_obj.get_owner());
	}

}

function build_house(app) {
	var properties = app.getArgument(PROPERTIES_ARGUMENT);
	var house_number = app.getArgument(NUMBER_OF_HOUSES_ARGUMENT);
	//check if user owns that property
	//buy the house and add it to said property
	app.ask('you built ' + house_number + ' houses on ' + properties);
}

function build_hotel(app) {
	var properties = app.getArgument(PROPERTIES_ARGUMENT);
	//check if user owns the property
	//buy the hotel if the the user
	app.ask('you built a hotel on ' + properties);
}

function end_turn(app) {
	//set a new current player
	//check if player CAN end their turn. e.g. have they rolled dice, etc?
	var new_player = app.data.player_names[1];
	app.ask('OK, ' + new_player + ' it is now your turn');
}

function sell_house(app) {
	//check if player can sell that house
	var properties = app.getArgument(PROPERTIES_ARGUMENT);
	var house_number = app.getArgument(NUMBER_OF_HOUSES_ARGUMENT);
	app.ask('You sold ' + house_number + ' houses on ' + properties + ' for $50 each');
}

function use_jail_card(app) {
	//check if player is in jail
	//check if they have a jail card
	app.ask('you used your get out of jail free card');
}

function buy_current_property(app) {
	//check if use can buy current property
	app.ask('you bought the current property you are on');
}
