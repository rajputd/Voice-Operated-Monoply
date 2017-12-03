module.exports = {

    numHouses: 32,
    numHotels: 12,

    //Contains information about each player
    Player: function Player(name) {

                var name = name;
                this.cash = 1500;
                this.currSpace = 0;
                this.turn = false;          //Is it this player's turn?

                this.chanceJail = false;    //Does player have gotj card?
                this.chestJail = false;     //Does player have gotj card?
                this.jailTurn = 0;         //How many turns has the player been in jail?
                this.properties = [];       //Array of player-owned properties
                this.numHouses = 0;         //# houses owned (for chance and chest cards)
                this.numHotels = 0;         //# hotels owned (for chance and chest cards)
                this.numUtilites = 0;       //# utilities owned (rent purposes)
                this.numRailroads = 0;      //# railroads owned (rent purposes)

                //Getters
                this.get_name = function() {return name;};
                this.get_cash = function() {return this.cash;};
                this.get_space = function() {return this.currSpace;};
                this.get_turn = function() {return this.turn;};
                this.get_chanceJail = function() {return this.chanceJail;};
                this.get_chestJail = function() {return this.chestJail;};
                this.get_jail_turn = function() {return this.jailTurn;};
                this.get_prop_list = function() {return this.properties;};
                this.get_num_houses = function() {return this.numHouses;};
                this.get_num_hotels = function() {return this.numHotels;};
                this.get_num_railroads = function () {return this.numRailroads;};
                this.get_num_utilities = function () {return this.numUtilites;};

                //Setters
                this.set_cash = function(cash) {this.cash = cash;};
                this.set_space = function(spaceNum) {this.currSpace = spaceNum;};
                this.start_turn = function() {this.turn = true;};
                this.end_turn = function() {this.turn = false;};
                this.take_chanceJail = function() {this.chanceJail = false;};
                this.take_chestJail = function() {this.chestJail = false;};
                this.give_chanceJail = function() {this.chanceJail = true;};
                this.give_chestJail = function() {this.chestJail = true;};
                this.set_jail_turn = function(number) {this.jailTurn = number;};
                this.remove_property = function(property) {
                    var i = this.properties.indexOf(property);
                        if(i !== -1) {
                                this.properties.splice(i, 1);
                        }
                    };
                this.add_property = function(property) {this.properties.push(property);};
                this.set_num_houses = function(number) {this.numHouses = number;};
                this.set_num_hotels = function(number) {this.numHotels = number;};
                this.set_num_railroads = function(number) {this.numRailroads = number;};
                this.set_num_utilities = function(number) {this.numUtilites = number;};
        },

    //Probably tweaking this tomorrow
    //I want each space to map to a property, or action function
    Space: function Space(number, name, id, type, property) {

                var number = number;    //Position on board
                var name = name;        //Name on board
                var id = id;            //Id for function purposes
                var type = type;        //Action or Property
                var property = property;    //Property object


                //Getters
                this.get_number = function() {return number;};
                this.get_name = function() {return name;};
                this.get_id = function() {return id;};
                this.get_type = function() {return type;};
                this.get_prop = function() {return property;};
        },

    //Contains information about property
    Property: function Property(name, id, spaceNum, price, group, rent0, rent1,
                                rent2, rent3, rent4, rent5, buildCost){
            var name = name;    //Name on board/cards
            var id = id;        //Id for functions
            var spaceNum = spaceNum;    //Position on board

            var price = price;
            var mortgagePrice = price/2;
            var unmortgagePrice = mortgagePrice * 1.1;

            var group = group;     //Color, utility, railroad
            this.owner = undefined;     //Player object
            this.mortgaged = false;     //Is this mortgaged?
            this.monopoly = false;      //Is this part of an active monopoly?

            var rent0 = rent0;  //Base rent
            var rent1 = rent1;  //Rent with 1 house
            var rent2 = rent2;  //Rent with 2 houses
            var rent3 = rent3;  //Rent with 3 houses
            var rent4 = rent4;  //Rent with 4 houses
            var rent5 = rent5;  //Rent with hotel

            var buildCost = buildCost;  //Cost of building
            this.numBuildings = 0;

            //Getters
            this.get_name = function() {return name;};
            this.get_id = function() {return id;};
            this.get_space_num = function() {return spaceNum;};
            this.get_price = function() {return price;};
            this.get_mortgage_price = function() {return mortgagePrice;};
            this.get_unmortgage_price = function() {return unmortgagePrice;};
            this.get_group = function() {return group;};
            this.get_owner = function() {return this.owner;};
            this.is_mortgaged = function() {return this.mortgaged;};
            this.is_monopoly = function() {return this.monopoly;};
            this.get_rent0 = function() {return rent0;};
            this.get_rent1 = function() {return rent1;};
            this.get_rent2 = function() {return rent2;};
            this.get_rent3 = function() {return rent3;};
            this.get_rent4 = function() {return rent4;};
            this.get_rent5 = function() {return rent5;};
            this.get_build_cost = function() {return buildCost;};
            this.get_num_buildings = function() {return this.numBuildings;};

            //Setters
            this.set_owner = function(player) {this.owner = player;};
            this.set_mortgage_true = function() {this.mortgaged = true;};
            this.set_mortgage_false = function() {this.mortgaged = false;};
            this.set_monopoly_true = function() {this.monopoly = true;};
            this.set_monopoly_false = function() {this.monopoly = false;};
            this.set_num_buildings = function(number) {this.numBuildings =  number;};
        },

    Chance: function Chance(id, text, action){

        var id = id;       //Used to identify specific card
        var text = text;   //Text on card

        //"pay", "earn", "move" classification
        var action = action;

        //Getters
        this.get_id = function() {return id;};
        this.get_text = function() {return text;};
        this.get_action = function() {return action;};
        },

    Chest: function Chest(id, text, action){

        var id = id;       //Used to identify specific card
        var text = text;   //Text on card

        //"pay", "earn", "move" classification
        var action = action;

        //Getters
        this.get_id = function() {return id;};
        this.get_text = function() {return text;};
        this.get_action = function() {return action;};
        },

    //Used to shuffle chanceCard and chestCard arrays at start
    shuffleArray: function(a){

        var j, x, i;
              for (i = a.length - 1; i > 0; i--) {
                  j = Math.floor(Math.random() * (i + 1));
                  x = a[i];
                  a[i] = a[j];
                  a[j] = x;
              }
        },

    // Calculate the net worth of a player. Doesn't handle houses and hotels, just yet.
    getNetWorth: function(player){

    	// Declares a variable to hold the player's net worth.
    	var netWorth = 0;

    	// Consider the player's current cash assets.
    	netWorth += player.get_cash();

    	// Iterate over all of the player's properties and add them to find the net worth.
        for (index = 0; index < player.properties.length; index++) {

            var properties = player.get_prop_list();

        	// Consider the value of the property.
            netWorth += properties[index].get_price();
        	// Consider the value of any building on the property.

        	// Add it to the player's total worth.
        	netWorth += (properties[index].get_num_buildings()) * (properties[index].get_build_cost());

                return netWorth;
        }
    },

    // Mortage properties.
    mortgageProperty: function(player, property){

        // Easy way to refer to the properties a player has.
        var properties = player.get_prop_list();

        console.log("The player has " + player.get_cash() + ".");

        // Check to see if the player actually owns the property in question.
        if (properties.indexOf(property) > -1) {
        	console.log("The player actually owns " + property.get_name() + ". Proceeding.");

        	// Set's the properties status to be morgaged.
        	property.set_mortgage_true();

        	// Add the mortage price of the property to the player's cash.
        	player.set_cash(player.get_cash() + property.get_mortgage_price());
        	console.log("After, the player has " + player.get_cash() + ".");
        }
    },

    unmortgageProperty: function(player, property){

        // Easy way to refer to the properties a player has.
        var properties = player.get_prop_list();

        console.log("The player has " + player.get_cash() + ".");

        // Check to see if the player actually owns the property in question.
        if (properties.indexOf(property) > -1) {
        	console.log("The player actually owns " + property.get_name() + ". Proceeding.");

        	// Checks if the player actually has the cash to unmortage the property.
        	if (player.get_cash() >= property.get_unmortgage_price()) {

        	    // Set's the properties status to be unmortgaged.
        	    property.set_mortgage_false();

        	    // Add the mortage price of the property to the player's cash.
        	    player.set_cash(player.get_cash() - property.get_unmortgage_price());
        	    console.log("After the unmortage, the player has " + player.get_cash() + ".");
        	}
        }
    },

    // Buy one building on the passed property
    buyBuilding: function(player, property){

        var monopoly = property.is_monopoly();
        var numBuildings = property.get_num_buildings();

        var numHouses = module.exports.numHouses;
        var numHotels = module.exports.numHotels;

        //Check to see if there is a monopoly on a property
        if(!monopoly){
            console.log("You cannot build on " + property.get_name() + " because you do not have a monopoly on this color-group.");
            return;
        }

        //Too many buildings
        if (numBuildings === 5){
            console.log("You cannot build any more buildings on this property.");
            return;
        }

        var playerProperties = player.get_prop_list();
        var color = property.get_group();
        var colorProps = [];

        //Get other properties in color group
        for (i = 0; i < playerProperties.length; i++){
            var prop = playerProperties[i];
            var propColor = prop.get_group();

            //If property is in color-group of passed property, push to colorProps array
            if (color === propColor && prop !== property)
                colorProps.push(prop);
        }

        //Color-groups with two properties
        if (color === "purple" || color === "dark-blue"){
            var prop1 = colorProps[0];

            //Get number of buildings on both properties
            var propBuildings = property.get_num_buildings();
            var prop1Buildings = prop1.get_num_buildings();

            //Check if building evenly
            if (propBuildings === prop1Buildings || propBuildings === prop1Buildings - 1){
                var cost = property.get_build_cost();

                if (numBuildings < 4){

                    if (numHouses === 0){
                        console.log("Sorry, there are no houses left in the bank.");
                        return;
                    }

                    console.log("Building a house on " + property.get_name() + " for $" + cost + ".");
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    module.exports.numHouses--;
                }

                else if (numBuildings === 4){

                    if (numHotels === 0){
                        console.log("Sorry, there are no hotels left in the bank.");
                        return;
                    }

                    console.log("Bulding a hotel on " + property.get_name() + " for $" + cost + ".");
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    module.exports.numHotels--;
                    module.exports.numHouses += 4;
                }
            }

            else
                console.log("You can't build on this property because you don't have enough buildings on the other property in this color-group.");
        }

        //Color-groups with three properties
        else {
            var prop1 = colorProps[0];
            var prop2 = colorProps[0];

            //Get number of buildings on both properties
            var propBuildings = property.get_num_buildings();
            var prop1Buildings = prop1.get_num_buildings();
            var prop2Buildings = prop2.get_num_buildings();

            //Check if building evenly
            if ((propBuildings === prop1Buildings && propBuildings === prop2Buildings)
                    || (propBuildings === prop1Buildings - 1 && propBuildings === prop2Buildings)
                    || (propBuildings === prop2Buildings - 1 && propBuildings === prop1Buildings)
                    || (propBuildings === prop1Buildings - 1 && propBuildings === prop2Buildings - 1)){
                var cost = property.get_build_cost();

                if (numBuildings < 4){

                    if (numHouses === 0){
                        console.log("Sorry, there are no houses left in the bank.");
                        return;
                    }

                    console.log("Building a house on " + property.get_name() + " for $" + cost + ".");
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    module.exports.numHouses--;
                }

                else if (numBuildings === 4){

                    if (numHotels === 0){
                        console.log("Sorry, there are no hotels left in the bank.");
                        return;
                    }

                    console.log("Bulding a hotel on " + property.get_name() + " for $" + cost + ".");
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    module.exports.numHotels--;
                    module.exports.numHouses += 4;
                }
            }

            //Check if not building evenly
            else
                console.log("You can't build on this property because you don't have enough buildings on the other properties in this color-group.");
        }

    },

    // Jail function
    jail: function(currPlayer, board, players, chanceCards, chestCards){

        var player = currPlayer;
        player.set_space(10);

        var chanceJail = player.get_chanceJail();
        var chestJail = player.get_chestJail();
        var jailTurn = player.get_jail_turn();

        //This will trigger when you are sent to jail via 1/3 options
        if (jailTurn === 0){
            console.log("You have been sent to jail. Ending your turn.");
            player.set_jail_turn(1);
        }

        //This should be triggered when a player want
        else if (jailTurn === 1){
            console.log("You are in jail, so you won't be able to move until you are free.");
            console.log("You can get out immediately if you roll doubles,");
            console.log("or you can pay $50 and get out next turn.");
            console.log("If you fail to roll doubles on your third attempt, you will still have to pay $50.");

            if (chanceJail || chestJail)
                console.log("You could also use your \"Get out of Jail Free\" card.");

            console.log("How do you want to get out?\n");

            //Response from DialogFlow should be "roll dice", "pay fine", "use card"
            var answer = "roll";     //For testing

            if (answer === "pay"){
                player.set_cash(player.get_cash() - 50);
                player.set_jail_turn(0);
                console.log("You have been released. Move to the \"Just Vistiing\" section. Ending your turn.");
            }

            else if (answer === "card"){

                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                if (chanceJail){
                    player.take_chanceJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board.");
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail){
                    player.take_chestJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board.");
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail && chanceJail){
                    console.log("Which card would you like to use?");

                    //Need response from DialogFlow
                    var card = "chance";    //For testing

                    console.log("Please return your card to the board.");

                    if (card === "chance"){
                        player.take_chanceJail();
                        newSpace = module.exports.getNewSpace(player, board, diceSum);
                        player.set_jail_turn(0);
                        module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                    }

                    else if (card === "chest"){
                        player.take_chestJail();
                        newSpace = module.exports.getNewSpace(player, board, diceSum);
                        player.set_jail_turn(0);
                        module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                    }
                }
            }

            else if (answer === "roll"){
                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                //If doubles are rolled, immediately move out, but don't let roll again.
                if (doubles){
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    console.log("You rolled doubles!\n");
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else{
                    console.log("Sorry, you did not roll doubles. Ending your turn.");
                    player.set_jail_turn(2);
                }
            }
        }

        else if (jailTurn === 2){
            console.log("You are in jail, so you won't be able to move until you are free.");
            console.log("You can get out immediately if you roll doubles,");
            console.log(" or you can pay $50 and get out next turn.");
            console.log("If you fail to roll doubles on your third attempt, you will still have to pay $50.");

            if (chanceJail || chestJail)
                console.log("You could also use your \"Get out of Jail Free\" card.");

            console.log("How do you want to get out?");

            //Response from DialogFlow should be "roll dice", "pay fine", "use card"
            var answer = "pay";     //For testing

            if (answer === "pay"){
                player.set_cash(player.get_cash() - 50);
                player.set_jail_turn(0);
                console.log("You have been released. Move to the \"Just Vistiing\" section. Ending your turn.");
            }

            else if (answer === "card"){

                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                if (chanceJail){
                    player.take_chanceJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board.");
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail){
                    player.take_chestJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board.");
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail && chanceJail){
                    console.log("Which card would you like to use?");

                    //Need response from DialogFlow
                    var card = "chance";    //For testing

                    console.log("Please return your card to the board.");

                    if (card === "chance"){
                        player.take_chanceJail();
                        newSpace = module.exports.getNewSpace(player, board, diceSum);
                        player.set_jail_turn(0);
                        module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                    }

                    else if (card === "chest"){
                        player.take_chestJail();
                        newSpace = module.exports.getNewSpace(player, board, diceSum);
                        player.set_jail_turn(0);
                        module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                    }
                }
            }

            else if (answer === "roll"){
                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                //If doubles are rolled, immediately move out, but don't let roll again.
                if (doubles){
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    console.log("You rolled doubles!");
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else{
                    console.log("Sorry, you did not roll doubles. Ending your turn.");
                    player.set_jail_turn(3);
                }
            }
        }

        else if (jailTurn === 3){

            console.log("This is your last turn in Jail.");
            console.log("You can try to role doubles one more time, ");
            console.log("but if you fail to do so, you'll have to pay the $50.");

            if (chanceJail || chestJail)
                console.log("You could also use your \"Get out of Jail Free\" card.");

            console.log("How do you want to get out?");

            //Response from DialogFlow should be "roll dice", "use card"
            var answer = "roll";     //For testing

            if (answer === "pay"){
                player.set_cash(player.get_cash() - 50);
                player.set_jail_turn(0);
                console.log("You have been released. Move to the \"Just Vistiing\" space. Ending your turn.");
            }

            else if (answer === "card"){

                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                if (chanceJail){
                    player.take_chanceJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board.");
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail){
                    player.take_chestJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board.");
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail && chanceJail){
                    console.log("Which card would you like to use?");

                    //Need response from DialogFlow
                    var card = "chance";    //For testing

                    console.log("Please return your card to the board.");

                    if (card === "chance"){
                        player.take_chanceJail();
                        newSpace = module.exports.getNewSpace(player, board, diceSum);
                        player.set_jail_turn(0);
                        module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                    }

                    else if (card === "chest"){
                        player.take_chestJail();
                        newSpace = module.exports.getNewSpace(player, board, diceSum);
                        player.set_jail_turn(0);
                        module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                    }
                }
            }

            else if (answer === "roll"){
                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                //If doubles are rolled, immediately move out, but don't let roll again.
                if (doubles){
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    console.log("You rolled doubles!");
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else{
                    console.log("Sorry, you did not roll doubles. You must pay $50, and move according to the dice.");
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_cash(player.get_cash() - 50);
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }
            }
        }
    },

    //Finds action associated with passed chance card
    chanceAction: function(card, currPlayer, players, gameBoard, chanceCards, chestCards){

        var id = card.get_id();
        var action = card.get_action();
        var player = currPlayer;
        var players = players;

        console.log(card.get_text() + "\n");

        if (action === "pay"){
            var payment = 0;

            //Pay $25/house and $100/hotel
            if (id === "repairs"){
                var numHouses = player.get_num_houses();
                var numHotels = player.get_num_hotels();
                payment = (numHouses*25) + (numHotels*100);
            }

            else if (id === "poorTax")
                payment = 15;

            //Pay $50 to each player
            else if (id === "chairman"){
                for (i = 0; i < players.length; i++){
                    if (players[i].get_name() !== player.get_name()){
                        players[i].set_cash(players[i].get_cash() + 50);
                        player.set_cash(player.get_cash() - 50);
                        console.log("Payed $50 to " + players[i].get_name());
                    }
                }
                console.log("You now have $" + player.get_cash() + "\n");
                return;
            }

            player.set_cash(player.get_cash() - payment);
            console.log("Your payment is $" + payment);
            console.log("You now have $" + player.get_cash() + "\n");
        }

        else if (action === "earn"){
            var amount;
            if (id === "buildMature")
                amount = 150;

            else if (id === "bankDividend")
                amount = 50;

            //Get Jail card
            else if (id === "getOutJail"){
                player.give_chanceJail();
                console.log("You received a \"Get out of Jail Free\" card!\n");
                return;
            }

            player.set_cash(player.get_cash() + amount);
            console.log("You received $" + amount);
            console.log("You now have $" + player.get_cash() + "\n");
        }

        else if (action === "move"){

            if (id === "advGo"){
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[0]);
                console.log("You landed on Go!");
                //trigger go function
            }

            //Need to pay owner 2x rent if already owned
            else if (id === "nearestRail1"){
                var position = player.get_space();

                if (position === 7){
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[15]);


               }

                else if (position === 22)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[25]);

                else if (position === 36)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[5]);

                //Move to nearest railroad
                //Pay owner 2x their rent
            }

            else if (id === "nearestUtil"){
                var position = player.get_space();

                console.log(position);

                if (position === 7)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[12]);

                else if (position === 22)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[28]);

                else if (position === 36)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[12]);
            }

            else if (id === "advStChar")
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[11]);

            else if (id === "goToJail")
                module.exports.jail(player, gameBoard, players, chanceCards, chestCards);

            else if (id === "readRail")
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[5]);

            else if (id === "nearestRail2"){
                var position = player.get_space();

                if (position === 7)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[15]);

                else if (position === 22)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[25]);

                else if (position === 36)
                   module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[5]);

                //Move to nearest railroad
                //Pay owner 2x their rent
            }

            else if (id === "advIllinois")
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[24]);

            else if (id === "advBoard")
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[39]);

            else if (id === "goBack"){
                //Move player back 3 spaces
                //Needs to override Go function
                //I'll flesh this out tomorrow (12/3)
            }
        }
    },

    //Finds action associated with passed chest card
    chestAction: function(card, currPlayer, players, gameBoard, chanceCards, chestCards){

        var id = card.get_id();
        var action = card.get_action();
        var player = currPlayer;
        var players = players;

        console.log(card.get_text() + "\n");

        if (action === "pay"){
            var payment = 0;

            if (id === "hospital")
                payment = 100;

            else if (id === "docFee")
                payment = 50;

            //Pay $40/house and $115/hotel
            else if (id === "repairs"){
                var numHouses = player.get_num_houses();
                var numHotels = player.get_num_hotels();

                payment = (numHouses*40) + (numHotels*115);
            }

            else if (id === "school")
                payment = 150;

            player.set_cash(player.get_cash() - payment);
            console.log("Your payment is $" + payment);
            console.log("You now have $" + player.get_cash() + "\n");
        }

        else if (action === "earn"){
            if (id === "xmasFund")
                amount = 100;

            else if (id === "services")
                amount = 25;

            else if (id === "bankErr")
                amount = 200;

            else if (id === "incTax")
                amount = 20;

            //Get jail card
            else if (id === "getOutJail"){
                player.give_chestJail();
                console.log("You received a \"Get out of Jail Free\" card!\n");
                return;
            }

            else if (id === "inherit")
                amount = 100;

            else if (id === "stock")
                amount = 45;

            else if (id === "beauty")
                amount = 10;

            //Earn $50 from each player
            else if (id === "opera"){
                for (i = 0; i < players.length; i++){
                    if (players[i].get_name() !== player.get_name()){
                        players[i].set_cash(players[i].get_cash() - 50);
                        player.set_cash(player.get_cash() + 50);
                        console.log("Collected $50 from " + players[i].get_name());
                    }
                }
                console.log("You now have $" + player.get_cash() + "\n");
                return;
            }

            else if (id === "insurance")
                amount = 100;

            player.set_cash(player.get_cash() + amount);
            console.log("You collected $" + amount);
            console.log("You now have $" + player.get_cash() + "\n");
        }

        else if (action === "move"){
            if (id === "goToJail")
                module.exports.jail(player, gameBoard, players, chanceCards, chestCards);

            else if (id === "advGo"){
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[0]);
                console.log("You landed on Go!");
            }
        }
    },

    //Triggers when you land on a property space
    propertySpace: function(space, currPlayer, players, diceSum){
        var space = space;
        var player = currPlayer;
        var property = space.get_prop();
        var group = property.get_group();
        var owner = property.get_owner();

        //If property is unowned
        if (owner === undefined){
            var price = property.get_price();
            var cash = player.get_cash();

            //If player has enough to buy
            if (cash >= price){
                console.log("This property has no owner.");
                console.log("You may buy it from the bank for $" + price + ",");
                console.log("or put it up for auction.");

                //Not quite sure how to get answer from user here
                //Dileep, you can decide how to get the answer
                var answer = "buy";     //Setting manually for testing

                if (answer === "buy"){

                    if (group === "railroad")
                        player.set_num_railroads(player.get_num_railroads() + 1);

                    else if (group === "utility")
                        player.set_num_utilities(player.get_num_utilities() + 1);

                    player.set_cash(cash - price);
                    property.set_owner(player);
                    player.properties.push(property);
                    console.log("You successfully purchased " + property.get_name()
                            + " for " + "$" + price + ".");
                    console.log("You now have $" + player.get_cash() + ".");

                }

                //Still feels really wonky. May want to scrap this
                else if (answer === "auction"){
                    console.log("Everyone may enter a bid.");
                    console.log("Whoever makes the highest bid will pay that price for the property.");
                    console.log("Let me know when the auction is over.");

                    //Once bid is resolved, get purchaser and price
                    var purchaser = players[1];         //Setting manually for testing, this input is a player object
                    var i = players.indexOf(purchaser); //Find index of purchaser in players array

                    var buyer = players[i]; //Now called buyer after finding player in array
                    var price = 40;         //Setting manually for testing

                    if (group === "railroad")
                        buyer.set_num_railroads(player.get_num_railroads() + 1);

                    else if (group === "utility")
                        buyer.set_num_utilities(player.get_num_utilities() + 1);

                    buyer.set_cash(cash - price);
                    property.set_owner(buyer);
                    buyer.properties.push(property);
                    console.log(buyer.get_name() + " successfully purchased " + property.get_name()
                            + " for " + "$" + price + ".");
                    console.log(buyer.get_name() + " now has $" + buyer.get_cash() + ".");
                }
            }

            //if player has insufficient
            else if (cash < price){

                console.log("You need $" + (price-cash) + " purchase this property.");
                console.log("You can sell buildings or mortgage properties to earn money,");
                console.log(" or you can just put this property up for auction.");
                console.log("Let me know if you want to buy or auction this property");

               //Get buy or auction intent
               var intent = "buy";

               if (intent === "buy"){
                   /* Call mortgage and sell buildings functions until
                    * A. User has enought money to purchase property,
                    * B. User has nothing left to sell, or
                    * C. User changes mind and auctions
                    *
                    * If A, trigger normal buying logic and break when done
                    * If B or C, change intent = "auction", and allow next case to take over
                    */
               }

               else if (intent === "auction"){
                    console.log("Everyone may enter a bid.");
                    console.log("Whoever makes the highest bid will pay that price for the property.");
                    console.log("Let me know when the auction is over.");

                    //Once bid is resolved, get purchaser and price
                    var purchaser = players[1];         //Setting manually for testing, this input is a player object
                    var i = players.indexOf(purchaser); //Find index of purchaser in players array

                    var buyer = players[i]; //Now called buyer after finding player in array
                    var price = 40;         //Setting manually for testing

                    if (group === "railroad")
                        buyer.set_num_railroads(player.get_num_railroads() + 1);

                    else if (group === "utility")
                        buyer.set_num_utilities(player.get_num_utilities() + 1);

                    buyer.set_cash(cash - price);
                    property.set_owner(buyer);
                    buyer.properties.push(property);
                    console.log(buyer.get_name() + " successfully purchased " + property.get_name()
                            + " for " + "$" + price + ".");
                    console.log(buyer.get_name() + " now has $" + buyer.get_cash() + ".");
                }
            }
        }

        else if (owner !== player){
            var i = players.indexOf(owner);
            owner = players[i];

            console.log("This property is owned by " + owner.get_name() + ".");

            var group = property.get_group();
            var cash = player.get_cash();

            if (group === "railroad"){
                var numRail = owner.get_num_railroads();
                var rent;

                switch (numRail){
                    case 1:
                        rent = 25;
                        break;
                    case 2:
                        rent = 50;
                        break;
                    case 3:
                        rent = 100;
                        break;
                    case 4:
                        rent = 200;
                        break;
                }

                if (cash >= rent){
                        owner.set_cash(owner.get_cash() + rent);
                        player.set_cash(player.get_cash() - rent);
                        console.log("You payed " + owner.get_name() + " $" + rent);
                        console.log("You now have $" + player.get_cash());
                    }

                else if (cash < rent){
                        console.log("Sorry no money");
                        /* trigger bankruptcy function
                         * if player can't pay owner, player forfeits all
                         * assets to owner
                         */
                    }
            }

            else if(group === "utility"){

                var numUtil = owner.get_num_utilities();
                var rent;

                switch (numUtil){
                    case 1:
                        rent  = 4 * diceSum;
                        break;
                    case 2:
                        rent  = 10 * diceSum;
                        break;
                }

                if (cash >= rent){
                        owner.set_cash(owner.get_cash() + rent);
                        player.set_cash(player.get_cash() - rent);
                        console.log("You payed " + owner.get_name() + " $" + rent);
                        console.log("You now have $" + player.get_cash());
                    }

                else if (cash < rent){
                        console.log("Sorry no money");
                        /* trigger bankruptcy function
                         * if player can't pay owner, player forfeits all
                         * assets to owner
                         */
                    }
            }

            else{

                var monopoly = property.is_monopoly();

                if (monopoly){
                    var numBuildings = property.get_num_buildings();
                    var rent;

                    switch (numBuildings){
                        case 0:
                            rent = property.get_rent0() * 2;
                            break;
                        case 1:
                            rent = property.get_rent1();
                            break;
                        case 2:
                            rent = property.get_rent2();
                            break;
                        case 3:
                            rent = property.get_rent3();
                            break;
                        case 4:
                            rent = property.get_rent4();
                            break;
                        case 5:
                            rent = property.get_rent5();
                            break;
                    }

                    if (cash >= rent){
                        owner.set_cash(owner.get_cash() + rent);
                        player.set_cash(player.get_cash() - rent);
                        console.log("You payed " + owner.get_name() + " $" + rent);
                        console.log("You now have $" + player.get_cash());
                    }

                    else if (cash < rent){
                        console.log("You need an additional $" + rent - price);
                        /* trigger bankruptcy function
                         * if player can't pay owner, player forfeits all
                         * assets to owner
                         */
                    }
                }

                else if (!monopoly){

                   var rent = property.get_rent0();
                    if (cash >= rent){
                        owner.set_cash(owner.get_cash() + rent);
                        player.set_cash(player.get_cash() - rent);
                        console.log("You payed " + owner.get_name() + " $" + rent);
                        console.log("You now have $" + player.get_cash());
                    }

                    else if (cash < rent){
                        console.log("Sorry no money");
                        /* trigger bankruptcy function
                         * if player can't pay owner, player forfeits all
                         * assets to owner
                         */
                    }
                }
            }
        }

        else
            console.log("You own this property!");
    },

    actionSpace: function(space, currPlayer, players, gameBoard, chanceCards, chestCards){

        var id = space.get_id();
        var player = currPlayer;

        if (id === "Go"){
            //trigger Go function
        }

        else if (id === "CommChest1" || id === "CommChest2" || id === "CommChest3")
            module.exports.drawChest(chestCards, player, players, gameBoard, chanceCards);

        else if (id === "IncTax"){
            var percent = .1 * module.exports.getNetWorth(player);

            //We still need to check for bankruptcy somehwere in here

            if (percent > 200){
                console.log("10% of your net worth amounts to $" + percent + ".");
                console.log("So we'll charge you $200 instead.");
                player.set_cash(player.get_cash() - 200);
            }

            else{
                console.log("10% of your net worth amounts to $" + percent + ".");
                console.log("So we'll charge you that amount instead of $200.");
                player.set_cash(player.get_cash() - percent);
            }

            console.log("You now have $" + player.get_cash() + ".");
        }

        else if (id === "Chance1" || id === "Chance2" || id === "Chance3")
            module.exports.drawChance(chanceCards, player, players, gameBoard, chestCards);

        else if (id === "Jail")
            console.log("Don't worry, you're not in trouble! You're just visiting.");

        else if (id === "Parking"){
            console.log("Free Parking!");
            console.log("Nothing to do here!");
        }

        else if (id === "GoToJail"){
            console.log("Go to Jail. Go directly to Jail.");
            console.log("Do not pass GO. Do not collect $200\n");
            module.exports.jail(player, gameBoard, players, chanceCards, chestCards);
        }

        else if (id === "LuxTax"){
            console.log("Luxury Tax. Pay $75");
            player.set_cash(player.get_cash() - 75);
            console.log("You now have $" + player.get_cash() + ".");
        }
    },

    //Draw chance card from array and call chanceAction()
    drawChance: function(chanceCards, currPlayer, players, board, chestCards){
        var cards = chanceCards;
        var player = currPlayer;
        var players = players;
        var card = cards.shift();  //Remove and return first card in array

        console.log("Drawing Chance card:\n");

        //Call chanceAction() function on card
        module.exports.chanceAction(card, player, players, board, chanceCards, chestCards);

        //GOTJ card is given to player, not immediately put at the end
        if (card.get_id() !== "getOutJail"){
            cards.push(card);   //Put card at bottom of deck (end of array)
        }
    },

    //Draw chest card from array and call chestAction()
    drawChest: function(chestCards, currPlayer, players, board, chanceCards){
        var cards = chestCards;
        var player = currPlayer;
        var players = players;

        console.log("Drawing Community Chest card:\n");

        var card = cards.shift();  //Remove and return first card in array

        //Call chestAction() function on card
        module.exports.chestAction(card, player, players, board, chanceCards, chestCards);

        //GOTJ card is given to player, not immediately put at the end
        if (card.get_id() !== "getOutJail"){
            cards.push(card);   //Put card at bottom of deck (end of array)
        }
    },

    //Rolls dice and returns their sum and double boolean
    //Will change this to return both dice and double boolean
    rollDice: function(){
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var sum = dice1 + dice2;

        var doubles = false;

        if (dice1 === dice2)
            doubles = true;

        return [sum, doubles];
    },

    getNewSpace: function(player, board, diceSum){

        var currPos = player.get_space();
        var currSpace = board[currPos]; //Current space id

        var newPos = currPos + diceSum;
        var newSpace;

        if (newPos > 39)
            newSpace = board[newPos - currPos];

        else
            newSpace = board[newPos];

        return newSpace;
    },

    //Move player to spaceNum and trigger space action
    movePlayer: function(player, board, players, diceSum, newSpace, chanceCards, chestCards){

        var currPos = player.get_space();
        console.log("Move your piece to " + newSpace.get_name() + ".\n");

        if (board.indexOf(newSpace) < currPos){
                //trigger Go function
            }

        if (newSpace.get_type() === "Property"){
            player.set_space(board.indexOf(newSpace));
            module.exports.propertySpace(newSpace, player, players, diceSum);
        }

        else{
            player.set_space(board.indexOf(newSpace));
            module.exports.actionSpace(newSpace, player, players, board, chanceCards, chestCards);
        }
    }
};
