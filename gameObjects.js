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

    passGo: function(player){
        var msg = '';
        console.log("Collected $200 for passing Go!"); msg += "Collected $200 for passing Go!";
        player.set_cash(player.get_cash() + 200);
        return msg;
    },

    // Calculate the net worth of a player. Doesn't handle houses and hotels, just yet.
    getNetWorth: function(player){

    	// Declares a variable to hold the player's net worth.
    	var netWorth = 0;

    	// Consider the player's current cash assets.
    	netWorth += player.get_cash();

    	// Iterate over all of the player's properties and add them to find the net worth.
        for (i = 0; i < player.properties.length; i++) {

            var properties = player.get_prop_list();

        	// Consider the value of the property.
            netWorth += properties[i].get_price();
        	// Consider the value of any building on the property.

        	// Add it to the player's total worth.
        	netWorth += (properties[i].get_num_buildings()) * (properties[i].get_build_cost());
        }
        return netWorth;
    },

    // Mortage properties.
    mortgageProperty: function(player, property){
        var msg = '';
        // Easy way to refer to the properties a player has.
        var properties = player.get_prop_list();
        var mortgaged = property.is_mortgaged();

        if (mortgaged){
            console.log("This property is already mortgaged."); msg += "This property is already mortgaged.";
            return msg;
        }

        // Check to see if the player actually owns the property in question.
        if (properties.indexOf(property) > -1) {
        	// Set's the properties status to be morgaged.
        	property.set_mortgage_true();

        	// Add the mortage price of the property to the player's cash.
        	player.set_cash(player.get_cash() + property.get_mortgage_price());
          console.log("You mortgaged " + property.get_name() + " for $" + property.get_mortgage_price() + "."); msg += "You mortgaged " + property.get_name() + " for $" + property.get_mortgage_price() + ".";
        	console.log("You now have $" + player.get_cash() + "."); msg += "You now have $" + player.get_cash() + ".";
        }

        else
            console.log("You do not own " + property.get_name() + ". Cancelling mortgage."); msg += "You do not own " + property.get_name() + ". Cancelling mortgage.";

        return msg;
    },

    unmortgageProperty: function(player, property){
        var msg = '';

        // Easy way to refer to the properties a player has.
        var properties = player.get_prop_list();
        var mortgaged = property.is_mortgaged();
        var cost = property.get_unmortgage_price();

        if (!mortgaged){
            console.log("This property is not mortgaged, so there's no need to unmortgage it."); msg += "This property is not mortgaged, so there's no need to unmortgage it.";
            return msg;
        }

       if (player.get_cash() >= cost){

            // Check to see if the player actually owns the property in question.
            if (properties.indexOf(property) > -1) {
                    // Set's the properties status to be morgaged.
                    property.set_mortgage_false();

                    // Add the mortage price of the property to the player's cash.
                    player.set_cash(player.get_cash() - property.get_unmortgage_price());
                    console.log("You unmortgaged " + property.get_name() + " for $" + property.get_mortgage_price() + "."); msg += "You unmortgaged " + property.get_name() + " for $" + property.get_mortgage_price() + ".";
                    console.log("You now have $" + player.get_cash() + "."); msg += "You now have $" + player.get_cash() + ".";
            }
            else {
                console.log("You do not own " + property.get_name() + ". Cancelling mortgage."); msg += "You do not own " + property.get_name() + ". Cancelling mortgage.";
            }
        }

        else {
          console.log("You cannot afford to unmortgage this property."); msg += "You cannot afford to unmortgage this property.";
        }


        return msg;
    },

    // Buy one building on the passed property
    buyBuilding: function(player, property){
        var msg = '';

        var monopoly = property.is_monopoly();
        var propBuildings = property.get_num_buildings();

        var numHouses = module.exports.numHouses;
        var numHotels = module.exports.numHotels;

        if (player.get_cash() < property.get_build_cost()){
            console.log("You cannot afford to build on this property.\n"); msg += "You cannot afford to build on this property.\n";
            return msg;
        }

        if (!property.get_owner() || property.get_owner() !== player){
            console.log("You do not own this property."); msg += "You do not own this property.";
            return msg;
        }

        //Check to see if there is a monopoly on a property
        if(!monopoly){
            console.log("You cannot build on " + property.get_name() + " because you do not have a monopoly on this color-group."); msg += "You cannot build on " + property.get_name() + " because you do not have a monopoly on this color-group.";
            return msg;
        }

        //Too many buildings
        if (propBuildings === 5){
            console.log("You cannot build any more buildings on this property."); msg += "You cannot build any more buildings on this property.";
            return msg;
        }

        var playerProperties = player.get_prop_list();
        var color = property.get_group();
        var colorProps = [];

        //Get other properties in color group
        for (i = 0; i < playerProperties.length; ++i){
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
            var prop1Buildings = prop1.get_num_buildings();

            //Check if building evenly
            if (propBuildings === prop1Buildings || propBuildings === prop1Buildings - 1){
                var cost = property.get_build_cost();

                if (propBuildings < 4){

                    if (numHouses === 0){
                        console.log("Sorry, there are no houses left in the bank."); msg += "Sorry, there are no houses left in the bank.";
                        return msg;
                    }

                    console.log("Building a house on " + property.get_name() + " for $" + cost + "."); msg += "Building a house on " + property.get_name() + " for $" + cost + ".";
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    player.set_num_houses(player.get_num_houses() + 1);
                    console.log("Take a house from the bank and put it on the property."); msg += "Take a house from the bank and put it on the property.";
                    module.exports.numHouses--;
                }

                else if (propBuildings === 4){

                    if (numHotels === 0){
                        console.log("Sorry, there are no hotels left in the bank."); msg += "Sorry, there are no hotels left in the bank.";
                        return msg;
                    }

                    console.log("Bulding a hotel on " + property.get_name() + " for $" + cost + "."); msg += "Bulding a hotel on " + property.get_name() + " for $" + cost + ".";
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    console.log("Take a hotel from the bank and put it on the property. Return your houses to the bank."); msg += "Take a hotel from the bank and put it on the property. Return your houses to the bank.";
                    player.set_num_houses(player.get_num_houses() - 4);
                    player.set_num_hotels(player.get_num_hotels() + 1);
                    module.exports.numHotels--;
                    module.exports.numHouses += 4;
                }
            }

            else {
                console.log("You can't build on this property because you don't have enough buildings on the other property in this color-group."); msg += "You can't build on this property because you don't have enough buildings on the other property in this color-group.";
            }
        }

        //Color-groups with three properties
        else {
            var prop1 = colorProps[0];
            var prop2 = colorProps[1];

            //Get number of buildings on both properties
            var prop1Buildings = prop1.get_num_buildings();
            var prop2Buildings = prop2.get_num_buildings();

            //Check if building evenly
            if ((propBuildings === prop1Buildings && prop1Buildings === prop2Buildings)
                    || (propBuildings === prop1Buildings - 1 && propBuildings === prop2Buildings)
                    || (propBuildings === prop2Buildings - 1 && propBuildings === prop1Buildings)
                    || (prop1Buildings === prop2Buildings && propBuildings === prop1Buildings - 1)){
                var cost = property.get_build_cost();

                if (propBuildings < 4){

                    if (numHouses === 0){
                        console.log("Sorry, there are no houses left in the bank."); msg += "Sorry, there are no houses left in the bank.";
                        return msg;
                    }

                    console.log("Building a house on " + property.get_name() + " for $" + cost + "."); msg += "Building a house on " + property.get_name() + " for $" + cost + ".";
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    console.log("Take a house from the bank and put it on the property."); msg += "Take a house from the bank and put it on the property.";
                    player.set_num_houses(player.get_num_houses() + 1);
                    module.exports.numHouses--;
                }

                else if (propBuildings === 4){

                    if (numHotels === 0){
                        console.log("Sorry, there are no hotels left in the bank."); msg += "Sorry, there are no hotels left in the bank.";
                        return msg;
                    }

                    console.log("Building a hotel on " + property.get_name() + " for $" + cost + "."); msg += "Building a hotel on " + property.get_name() + " for $" + cost + ".";
                    property.set_num_buildings(property.get_num_buildings() + 1);
                    player.set_cash(player.get_cash() - cost);
                    console.log("Take a hotel from the bank and put it on the property. Return your houses to the bank."); msg += "Take a hotel from the bank and put it on the property. Return your houses to the bank.";
                    player.set_num_houses(player.get_num_houses() - 4);
                    player.set_num_hotels(player.get_num_hotels() + 1);
                    module.exports.numHotels--;
                    module.exports.numHouses += 4;
                }
            }

            //Check if not building evenly
            else {
                console.log("You can't build on this property because you don't have enough buildings on the other properties in this color-group."); msg += "You can't build on this property because you don't have enough buildings on the other properties in this color-group.";
            }
        }

        return msg;

    },

    sellBuilding: function(player, property){
        var msg = '';

        var propBuildings = property.get_num_buildings();

        if (!property.get_owner() || property.get_owner() !== player){
            console.log("You do not own this property."); msg += "You do not own this property.";
            return msg;
        }

        if (propBuildings === 0){
            console.log("You have no buildings on this property."); msg += "You have no buildings on this property.";
            return msg;
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
            var prop1Buildings = prop1.get_num_buildings();

            //Check if selling evenly
            if (propBuildings === prop1Buildings || propBuildings === prop1Buildings + 1){
                var cost = property.get_build_cost();

                if (propBuildings <= 4){

                    console.log("Selling a house on " + property.get_name() + " for $" + cost/2 + "."); msg += "Selling a house on " + property.get_name() + " for $" + cost/2 + ".";
                    property.set_num_buildings(property.get_num_buildings() - 1);
                    player.set_cash(player.get_cash() + cost/2);
                    console.log("Please return the house to the bank."); msg += "Please return the house to the bank.";
                    player.set_num_houses(player.get_num_houses() - 1);
                    module.exports.numHouses++;
                }

                else if (propBuildings === 5){

                    console.log("Selling a hotel on " + property.get_name() + " for $" + cost/2 + "."); msg += "Selling a hotel on " + property.get_name() + " for $" + cost/2 + ".";
                    property.set_num_buildings(property.get_num_buildings() - 1);
                    player.set_cash(player.get_cash() + cost/2);
                    console.log("Please return the hotel to the bank. And place 4 houses on the property."); msg += "Please return the hotel to the bank. And place 4 houses on the property.";
                    player.set_num_houses(player.get_num_houses() + 4);
                    player.set_num_hotels(player.get_num_hotels() - 1);
                    module.exports.numHotels--;
                    module.exports.numHouses+= 4;
                }

            }

            else {
                console.log("You can't sell on this property because you have too many buildings on the other property in this color-group."); msg += "You can't sell on this property because you have too many buildings on the other property in this color-group.";
            }
        }

        //Color-groups with three properties
        else {
            var prop1 = colorProps[0];
            var prop2 = colorProps[1];

            //Get number of buildings on both properties
            var prop1Buildings = prop1.get_num_buildings();
            var prop2Buildings = prop2.get_num_buildings();

            //Check if building evenly
            if ((propBuildings === prop1Buildings && propBuildings === prop2Buildings)
                    || (propBuildings === prop1Buildings && propBuildings === prop2Buildings + 1)
                    || (propBuildings === prop2Buildings && propBuildings === prop1Buildings + 1)
                    || (propBuildings === prop1Buildings + 1 && propBuildings === prop2Buildings + 1)){
                var cost = property.get_build_cost();

                //Selling houses
                if (propBuildings <= 4){

                    console.log("Selling a house on " + property.get_name() + " for $" + cost/2 + "."); msg += "Selling a house on " + property.get_name() + " for $" + cost/2 + ".";
                    property.set_num_buildings(property.get_num_buildings() - 1);
                    player.set_cash(player.get_cash() + cost/2);
                    console.log("Please return the house to the bank."); msg += "Please return the house to the bank.";
                    player.set_num_houses(player.get_num_houses() - 1);
                    module.exports.numHouses--;
                }

                else if (propBuildings === 5){

                    console.log("Selling a hotel on " + property.get_name() + " for $" + cost/2 + "."); msg += "Selling a hotel on " + property.get_name() + " for $" + cost/2 + ".";
                    property.set_num_buildings(property.get_num_buildings() - 1);
                    player.set_cash(player.get_cash() + cost/2);
                    console.log("Please return the hotel to the bank. And place 4 houses on the property."); msg += "Please return the hotel to the bank. And place 4 houses on the property.";
                    player.set_num_houses(player.get_num_houses() + 4);
                    player.set_num_hotels(player.get_num_hotels() - 1);
                    module.exports.numHotels--;
                    module.exports.numHouses+= 4;
                }
            }

            //Check if not building evenly
            else  {
                console.log("You can't sell on this property because have too many buildings on the other properties in this color-group."); msg += "You can't sell on this property because have too many buildings on the other properties in this color-group.";
            }
        }

        return msg;

    },

    // Jail function
    jail: function(currPlayer, board, players, chanceCards, chestCards){

        var msg = '';

        var player = currPlayer;
        player.set_space(10);

        var chanceJail = player.get_chanceJail();
        var chestJail = player.get_chestJail();
        var jailTurn = player.get_jail_turn();

        //This will trigger when you are sent to jail via 1/3 options
        if (jailTurn === 0){
            console.log("You have been sent to jail. Ending your turn."); msg += "You have been sent to jail. Ending your turn.";
            player.set_jail_turn(1);
        }

        //This should be triggered when a player want
        else if (jailTurn === 1){
            console.log("You are in jail, so you won't be able to move until you are free."); msg += "You are in jail, so you won't be able to move until you are free.";
            console.log("You can get out immediately if you roll doubles,"); msg += "You can get out immediately if you roll doubles,";
            console.log("or you can pay $50 and move next turn."); msg += "or you can pay $50 and move next turn.";
            console.log("If you fail to roll doubles on your third attempt, you will still have to pay $50."); msg += "If you fail to roll doubles on your third attempt, you will still have to pay $50.";

            if (chanceJail || chestJail) {
                console.log("You could also use your \"Get out of Jail Free\" card."); msg += "You could also use your \"Get out of Jail Free\" card.";
            }

            console.log("How do you want to get out?\n"); msg += "How do you want to get out?\n";

            //Response from DialogFlow should be "roll dice", "pay fine", "use card"
            var answer = "roll";     //For testing

            if (answer === "pay"){

                if (player.get_cash() >= 50){
                    player.set_cash(player.get_cash() - 50);
                    player.set_jail_turn(0);
                    console.log("You have been released. Move to the \"Just Vistiing\" section. Ending your turn."); msg += "You have been released. Move to the \"Just Vistiing\" section. Ending your turn.";
                }

                else {
                    console.log("You cannot afford to pay the fine."); msg += "You cannot afford to pay the fine.";
                }
            }

            else if (answer === "card"){

                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                if (chanceJail){
                    player.take_chanceJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail){
                    player.take_chestJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail && chanceJail){
                    console.log("Which card would you like to use?"); msg += "Which card would you like to use?";

                    //Need response from DialogFlow
                    var card = "chance";    //For testing

                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";

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
                    console.log("You rolled doubles!\n"); msg += "You rolled doubles!\n";
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else{
                    console.log("Sorry, you did not roll doubles. Ending your turn."); msg += "Sorry, you did not roll doubles. Ending your turn.";
                    player.set_jail_turn(2);
                }
            }
        }

        else if (jailTurn === 2){
            console.log("You are in jail, so you won't be able to move until you are free."); msg += "You are in jail, so you won't be able to move until you are free.";
            console.log("You can get out immediately if you roll doubles,"); msg += "You can get out immediately if you roll doubles,";
            console.log(" or you can pay $50 and get out next turn."); msg += " or you can pay $50 and get out next turn.";
            console.log("If you fail to roll doubles on your third attempt, you will still have to pay $50."); msg += "If you fail to roll doubles on your third attempt, you will still have to pay $50.";

            if (chanceJail || chestJail) {
                console.log("You could also use your \"Get out of Jail Free\" card."); msg += "You could also use your \"Get out of Jail Free\" card.";
            }

            console.log("How do you want to get out?"); msg += "How do you want to get out?";

            //Response from DialogFlow should be "roll dice", "pay fine", "use card"
            var answer = "pay";     //For testing

            if (answer === "pay"){

                if (player.get_cash() >= 50){
                    player.set_cash(player.get_cash() - 50);
                    player.set_jail_turn(0);
                    console.log("You have been released. Move to the \"Just Vistiing\" section. Ending your turn."); msg += "You have been released. Move to the \"Just Vistiing\" section. Ending your turn.";
                }

                else {
                    console.log("You cannot afford to pay the fine."); msg += "You cannot afford to pay the fine.";
                }
            }

            else if (answer === "card"){

                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                if (chanceJail){
                    player.take_chanceJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail){
                    player.take_chestJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail && chanceJail){
                    console.log("Which card would you like to use?"); msg += "Which card would you like to use?";

                    //Need response from DialogFlow
                    var card = "chance";    //For testing

                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";

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
                    console.log("You rolled doubles!"); msg += "You rolled doubles!";
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else{
                    console.log("Sorry, you did not roll doubles. Ending your turn."); msg += "Sorry, you did not roll doubles. Ending your turn.";
                    player.set_jail_turn(3);
                }
            }
        }

        else if (jailTurn === 3){

            console.log("This is your last turn in Jail."); msg += "This is your last turn in Jail.";
            console.log("You can try to role doubles one more time, "); msg += "You can try to role doubles one more time, ";
            console.log("but if you fail to do so, you'll have to pay the $50."); msg += "but if you fail to do so, you'll have to pay the $50.";

            if (chanceJail || chestJail) {
                console.log("You could also use your \"Get out of Jail Free\" card."); msg += "You could also use your \"Get out of Jail Free\" card.";
            }

            console.log("How do you want to get out?"); msg += "How do you want to get out?";

            //Response from DialogFlow should be "roll dice", "use card"
            var answer = "roll";     //For testing

            if (answer === "pay"){

                if (player.get_cash() >= 50){
                    player.set_cash(player.get_cash() - 50);
                    player.set_jail_turn(0);
                    console.log("You have been released. Move to the \"Just Vistiing\" section. Ending your turn."); msg += "You have been released. Move to the \"Just Vistiing\" section. Ending your turn.";
                }

                else
                    module.exports.bankruptcy(player, 50, players);
            }

            else if (answer === "card"){

                var diceSum = module.exports.rollDice()[0];
                var doubles = module.exports.rollDice()[1];

                if (chanceJail){
                    player.take_chanceJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail){
                    player.take_chestJail();
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_jail_turn(0);
                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else if (chestJail && chanceJail){
                    console.log("Which card would you like to use?"); msg += "Which card would you like to use?";

                    //Need response from DialogFlow
                    var card = "chance";    //For testing

                    console.log("Please return your card to the board."); msg += "Please return your card to the board.";

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
                    console.log("You rolled doubles!"); msg += "You rolled doubles!";
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }

                else{
                    console.log("Sorry, you did not roll doubles. You must pay $50, and move according to the dice."); msg += "Sorry, you did not roll doubles. You must pay $50, and move according to the dice.";
                    newSpace = module.exports.getNewSpace(player, board, diceSum);
                    player.set_cash(player.get_cash() - 50);
                    player.set_jail_turn(0);
                    module.exports.movePlayer(player, board, players, diceSum, newSpace, chanceCards, chestCards);
                }
            }
        }

        return msg;
    },

    //Finds action associated with passed chance card
    chanceAction: function(card, currPlayer, players, gameBoard, chanceCards, chestCards){

        var msg = '';

        var id = card.get_id();
        var action = card.get_action();
        var player = currPlayer;
        var players = players;

        console.log(card.get_text() + "\n"); msg += card.get_text();

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
                console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
                return msg;
            }
            if (module.exports.hasCash(player, payment)){
                player.set_cash(player.get_cash() - payment);
                console.log("Your payment is $" + payment); msg += "Your payment is $" + payment;
                console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
            }

            else
                module.exports.bankruptcy(player, payment, players);


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
                console.log("You received a \"Get out of Jail Free\" card!\n"); msg += "You received a \"Get out of Jail Free\" card!\n";
                return msg;
            }

            player.set_cash(player.get_cash() + amount);
            console.log("You received $" + amount); msg += "You received $" + amount;
            console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
        }

        else if (action === "move"){

            if (id === "advGo")
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[0]);

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

            else if (id === "goBack")
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[player.get_space() - 3]);
        }

        return msg;
    },

    //Finds action associated with passed chest card
    chestAction: function(card, currPlayer, players, gameBoard, chanceCards, chestCards){

        var msg = '';

        var id = card.get_id();
        var action = card.get_action();
        var player = currPlayer;
        var players = players;

        console.log(card.get_text() + "\n"); msg += card.get_text();

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

            if (module.exports.hasCash(player, payment)){
                player.set_cash(player.get_cash() - payment);
                console.log("Your payment is $" + payment); msg += "Your payment is $" + payment;
                console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
            }

            else
                module.exports.bankruptcy(player, payment, players);
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
                console.log("You received a \"Get out of Jail Free\" card!\n"); msg += "You received a \"Get out of Jail Free\" card!\n";
                return msg;
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
                        console.log("Collected $50 from " + players[i].get_name()); msg += "Collected $50 from " + players[i].get_name();
                    }
                }
                console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
                return msg;
            }

            else if (id === "insurance")
                amount = 100;

            player.set_cash(player.get_cash() + amount);
            console.log("You collected $" + amount); msg += "You collected $" + amount;
            console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
        }

        else if (action === "move"){
            if (id === "goToJail")
                module.exports.jail(player, gameBoard, players, chanceCards, chestCards);

            else if (id === "advGo")
                module.exports.movePlayer(player, gameBoard, players, 0, gameBoard[0]);
        }

        return msg;
    },

    //Triggers when you land on a property space
    propertySpace: function(space, currPlayer, players, diceSum){
        var msg = '';
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
            if (module.exports.hasCash(player, property.get_price())){
                console.log("This property has no owner."); msg += "This property has no owner.";
                console.log("You may buy it from the bank for $" + price + ","); msg += "You may buy it from the bank for $" + price + ",";
                console.log("or put it up for auction."); msg += "or put it up for auction.";

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
                            + " for " + "$" + price + "."); msg += "You successfully purchased " + property.get_name()
                                    + " for " + "$" + price + ".";
                    console.log("You now have $" + player.get_cash() + ".\n"); msg += "You now have $" + player.get_cash() + ".\n";

                    //Check to see if purchase activates monopoly
                    if (group !== "railroad" || group === "utility"){
                        var playerProperties = player.get_prop_list();
                        var color = property.get_group();
                        var colorProps = [];

                        //Get other properties in color-group if they're there
                        for (i = 0; i < playerProperties.length; ++i){
                            var prop = playerProperties[i];
                            var propColor = prop.get_group();

                            //If property is in color-group of passed property, push to colorProps array
                            if (color === propColor && prop !== property)
                                colorProps.push(prop);
                        }

                        if (color === "purple" || color === "dark-blue"){
                            if (colorProps.length === 1){
                                console.log("You now have a monopoly on the " + color + " color-group!"); msg += "You now have a monopoly on the " + color + " color-group!";
                                console.log("You can now build on these properties and earn double the base rent!\n"); msg += "You can now build on these properties and earn double the base rent!\n";

                                property.set_monopoly_true();
                                colorProps[0].set_monopoly_true();
                            }
                        }

                        else{
                            if (colorProps.length === 2){
                                console.log("You now have a monopoly on the " + color + " color-group!"); msg += "You now have a monopoly on the " + color + " color-group!";
                                console.log("You can now build on these properties and earn double the base rent!\n"); msg += "You can now build on these properties and earn double the base rent!\n";

                                property.set_monopoly_true();
                                colorProps[0].set_monopoly_true();
                                colorProps[1].set_monopoly_true();
                            }
                        }
                    }
                }
                else {
                    console.log("This property will remain unsold."); msg += "This property will remain unsold.";
                }

            }

            //if player has insufficient
            else if (cash < price){
                console.log("You don't have enough money to purchase this property."); msg += "You don't have enough money to purchase this property.";
                console.log("This property will remain unsold."); msg += "This property will remain unsold.";
            }
        }

        else if (owner !== player){
            var i = players.indexOf(owner);
            owner = players[i];

            console.log("This property is owned by " + owner.get_name() + "."); msg += "This property is owned by " + owner.get_name() + ".";

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
                    player.set_cash(player.get_cash() - rent);
                    console.log("Your payment is $" + rent);
                    console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
                }

                else
                    module.exports.bankruptcy(player, rent, players, owner);
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
                    player.set_cash(player.get_cash() - rent);
                    console.log("Your payment is $" + rent); msg += "Your payment is $" + rent;
                    console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
                }

                else
                    module.exports.bankruptcy(player, rent, players, owner);
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
                        console.log("You payed " + owner.get_name() + " $" + rent); msg += "You payed " + owner.get_name() + " $" + rent;
                        console.log("You now have $" + player.get_cash()); msg += "You now have $" + player.get_cash())
                    }

                    else if (cash < rent){
                        console.log("You need an additional $" + rent - price); msg += "You need an additional $" + rent - price;
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

                    else if (cash < rent)
                        module.exports.bankruptcy(player, rent, players, owner);
                }
            }
        }

        else
            console.log("You own this property!"); msg += "You own this property!";

        return msg;
    },

    actionSpace: function(space, currPlayer, players, gameBoard, chanceCards, chestCards){
        var msg = '';
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
                console.log("10% of your net worth amounts to $" + percent + "."); msg += "10% of your net worth amounts to $" + percent + ".";
                console.log("So we'll charge you $200 instead."); msg += "So we'll charge you $200 instead.";

                if (player.get_cash() >= percent){
                    player.set_cash(player.get_cash() - percent);
                    console.log("Your payment is $" + percent); msg += "You now have $" + player.get_cash() + "\n";
                    console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
                }

                else
                    module.exports.bankruptcy(player, percent, players);
            }
            else{
                console.log("10% of your net worth amounts to $" + percent + "."); msg += "10% of your net worth amounts to $" + percent + ".";
                console.log("So we'll charge you that amount instead of $200.\n"); msg += "So we'll charge you that amount instead of $200.\n";
                 if (player.get_cash() >= percent){
                    player.set_cash(player.get_cash() - percent);
                    console.log("Your payment is $" + percent);
                    console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
                }

                else
                    module.exports.bankruptcy(player, percent, players);
            }

            console.log("You now have $" + player.get_cash() + "."); msg += "You now have $" + player.get_cash() + ".";
        }

        else if (id === "Chance1" || id === "Chance2" || id === "Chance3")
            module.exports.drawChance(chanceCards, player, players, gameBoard, chestCards);

        else if (id === "Jail") {
            console.log("Don't worry, you're not in trouble! You're just visiting."); msg += "Don't worry, you're not in trouble! You're just visiting.";
        }
        else if (id === "Parking"){
            console.log("Free Parking!"); msg += "Free Parking!";
            console.log("Nothing to do here!"); msg += "Nothing to do here!";
        }

        else if (id === "GoToJail"){
            console.log("Go to Jail. Go directly to Jail."); msg += "Go to Jail. Go directly to Jail.";
            console.log("Do not pass GO. Do not collect $200\n"); msg += "Do not pass GO. Do not collect $200\n";
            module.exports.jail(player, gameBoard, players, chanceCards, chestCards);
        }

        else if (id === "LuxTax"){
            module.exports.bankruptcy(player, 75, players);
            console.log("Luxury Tax. Pay $75"); msg += "Luxury Tax. Pay $75";

             if (player.get_cash() >= 75){
                    player.set_cash(player.get_cash() - 75);
                    console.log("Your payment is $" + 75); msg += "Your payment is $" + 75;
                    console.log("You now have $" + player.get_cash() + "\n"); msg += "You now have $" + player.get_cash() + "\n";
                }

            else
                module.exports.bankruptcy(player, 75, players);
        }

        return msg;
    },

    hasCash: function(player, price){

        if (player.get_cash() < price)
            return false;

        else
            return true;
    },

    //Draw chance card from array and call chanceAction()
    drawChance: function(chanceCards, currPlayer, players, board, chestCards){
        var msg = '';
        var cards = chanceCards;
        var player = currPlayer;
        var players = players;
        var card = cards.shift();  //Remove and return first card in array

        console.log("Drawing Chance card:\n"); msg += "Drawing Chance card:\n";

        //Call chanceAction() function on card
        module.exports.chanceAction(card, player, players, board, chanceCards, chestCards);

        //GOTJ card is given to player, not immediately put at the end
        if (card.get_id() !== "getOutJail"){
            cards.push(card);   //Put card at bottom of deck (end of array)
        }

        return msg;
    },

    //Draw chest card from array and call chestAction()
    drawChest: function(chestCards, currPlayer, players, board, chanceCards){
        var msg = '';
        var cards = chestCards;
        var player = currPlayer;
        var players = players;

        console.log("Drawing Community Chest card:\n"); msg += "Drawing Community Chest card:\n";

        var card = cards.shift();  //Remove and return first card in array

        //Call chestAction() function on card
        module.exports.chestAction(card, player, players, board, chanceCards, chestCards);

        //GOTJ card is given to player, not immediately put at the end
        if (card.get_id() !== "getOutJail"){
            cards.push(card);   //Put card at bottom of deck (end of array)
        }

        return msg;
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

    // Bankruptcy function.
    bankruptcy: function(player, cost, players, owner){
        var msg = '';

        var cash = player.get_cash();
        //If you owe money to another player
            if (owner){
                var ownerName = owner.get_name();
                console.log("You cannot pay " + ownerName + " the money to which he/she is entitled."); msg += "You cannot pay " + ownerName + " the money to which he/she is entitled.";
                console.log("You will need to forfeit the rest of your cash and properties to " + ownerName + ".\n"); msg += "You will need to forfeit the rest of your cash and properties to " + ownerName + ".\n";

                if (cash <= 0) {
                    console.log("You have no cash to forfeit to " + ownerName + "."); msg += "You have no cash to forfeit to " + ownerName + ".";
                }
                else{
                    console.log("Transferring $" + cash + " to " + ownerName + "'s account."); msg += "Transferring $" + cash + " to " + ownerName + "'s account.";
                    player.set_cash(0);
                    owner.set_cash(owner.get_cash() + cash);
                    console.log(ownerName + " now has $" + owner.get_cash() + "."); msg += ownerName + " now has $" + owner.get_cash() + ".";
                }

                var playerProps = player.get_prop_list();
                var numProperties = playerProps.length;

                owner.set_num_houses(owner.get_num_houses() + player.get_num_houses());
                owner.set_num_hotels(owner.get_num_hotels() + player.get_num_hotels());

                for (i = 0; i < numProperties; i++){

                    var prop = playerProps[i];
                    prop.set_owner(owner);
                    owner.add_property(prop);
                }

                if (numProperties > 0)
                    console.log(ownerName + " received " + numProperties + " properties."); msg += ownerName + " received " + numProperties + " properties.";

                if (player.get_chanceJail()){
                    owner.give_chanceJail();
                    console.log(ownerName + " received a \"Get out of Jail Free\" card."); msg += ownerName + " received a \"Get out of Jail Free\" card.";
                }

                if (player.get_chestJail()){
                    owner.give_chestJail();
                    console.log(ownerName + " received a \"Get out of Jail Free\" card."); msg += ownerName + " received a \"Get out of Jail Free\" card.";
                }
            }

            //If you owe money to the bank
            else{
                console.log("You don't have enough money to pay to the Bank."); msg += "You don't have enough money to pay to the Bank.";
                console.log("You will need to turn in the rest of your cash and properties to the Bank.\n"); msg += "You will need to turn in the rest of your cash and properties to the Bank.\n";

                var playerProps = player.get_prop_list();
                var numProperties = playerProps.length;

                module.exports.numHouses += player.get_num_houses();
                module.exports.numHotels += player.get_num_hotels();

                for (i = 0; i < numProperties; i++){

                    var prop = playerProps[i];
                    prop.set_owner(undefined);
                    prop.set_num_buildings(0);
                    prop.set_mortgage_false();
                    prop.set_monopoly_false();
                }
            }

            console.log("\nGame Over\nPlease return your token to the Bank."); msg += "\nGame Over\nPlease return your token to the Bank.";
            var index = players.indexOf(player);
            players.splice(index, 1);

            return msg;
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
        var msg = '';
        var currPos = player.get_space();
        console.log("Move your piece to " + newSpace.get_name() + ".\n"); msg += "Move your piece to " + newSpace.get_name() + ".\n";

        if (board.indexOf(newSpace) < currPos){
            if (board.indexOf(newSpace) !== currPos - 3){
                module.exports.passGo(player);
            }
        }

        if (newSpace.get_type() === "Property"){
            player.set_space(board.indexOf(newSpace));
            module.exports.propertySpace(newSpace, player, players, diceSum);
        }

        else{
            player.set_space(board.indexOf(newSpace));
            module.exports.actionSpace(newSpace, player, players, board, chanceCards, chestCards);
        }

        return msg;
    }
};
