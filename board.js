module.exports = {

    //Contains information about each player
    Player: function Player(name) {

                var name = name;
                this.cash = 1500;
                this.currSpace = 0;
                this.turn = false;          //Is it this player's turn?

                this.chanceJail = false;    //Does player have gotj card?
                this.chestJail = false;     //Does player have gotj card?
                this.inJail = false;        //Is player in jail?
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
                this.get_inJail = function() {return this.inJail;};
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
                this.go_inJail = function() {this.turn = true;};
                this.leave_inJail = function() {this.turn = false;};
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

    // Jail function.
    jail: function(player, chance, chest){

        // Handles case 1, where the player directly lands on the space marked, "Go to Jail".
        if (player.get_space() === 10) {

        	// Move the player to jail.
        	// movePlayer()

        	// Assumes we pass Go, hack the do not collect $200 condition by letting the player collect $200,
            // then immediately subtracting $200.
        	if (player.get_space >= 10)
        		player.set_cash(player.get_cash() - 200);
        }

        // Handles case 2, where the player draws a card marked "go to jail". Only two such cards exist, one in the chance deck and the other in the community chest deck.
        if (chance.get_id() === jail || chest.get_id() == jail) {

        	// Move the player to jail.
        	// movePlayer()

        	// Assumes we pass Go, hack the do not collect $200 condition by letting the player collect $200,
            // then immediately subtracting $200.
        	if (player.get_space >= 10)
        		player.set_cash(player.get_cash() - 200);
        }

        // Handles case 3, where the player rolls 3 doubles in a roll.
        if (doublesCount === 3) {

        	// Reset the player's double count.
        	doublesCount = 0;

        	// Move the player to jail.
        	// movePlayer()

            // Assumes we pass Go, hack the do not collect $200 condition by letting the player collect $200,
            // then immediately subtracting $200.
        	if (player.get_space >= 10)
        		player.set_cash(player.get_cash() - 200);
        }

    },

    //Finds action associated with passed chance card
    chanceAction: function(card, currPlayer, players, gameBoard){

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
                module.exports.movePlayer(player, gameBoard, players, gameBoard[0]);
                console.log("You landed on Go!");
                //trigger go function
            }

            else if (id === "nearestRail1"){
                var position = player.get_space();

                console.log(position);

                if (position === 7){
                   module.exports.movePlayer(player, gameBoard, players, gameBoard[15]);
                }
                else if (position === 22)
                   module.exports.movePlayer(player, gameBoard, players, gameBoard[25]);

                else if (position === 36)
                   module.exports.movePlayer(player, gameBoard, players, gameBoard[5]);

                //Move to nearest railroad
                //Pay owner 2x their rent
            }

            else if (id === "nearestUtil"){
                //Move to nearest utility
                //Roll dice and pay owner 10x that amount
            }

            else if (id === "advStChar"){
                //Move to St. Charles Place
                //Trigger space action
            }

            else if (id === "goToJail"){
                //Move to Jail
                //Set player inJail to true
            }

            else if (id === "readRail"){
                //Move to Reading Railroad
                //Trigger space action
            }

            else if (id === "nearestRail2"){
                //Move to nearest railroad
                //Pay owner 2x their rent
            }

            else if (id === "advIllinois"){
                //Move to Illinois Avenue
                //Trigger space action
            }

            else if (id === "advBoard"){
                //Move to Boardwalk
                //Trigger space action
            }

            else if (id === "goBack"){
                //Move player back 3 spaces
                //Trigger space action
            }
        }
    },

    //Finds action associated with passed chest card
    chestAction: function(card, currPlayer, players){

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
            if (card === "goToJail"){
                //Move player to jail
            }

            else if (card === "advGo"){
                //Move player to jail
                //Collect $200
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

            console.log(group);

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
            module.exports.drawChest(chestCards, player, players, gameBoard);

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
            module.exports.drawChance(chanceCards, player, players, gameBoard);

        else if (id === "Jail"){
            console.log("Move to jail.");
            console.log("Don't worry, you're not in trouble! You're just visiting.");
        }
        else if (id === "Parking"){
            console.log("Free Parking!");
            console.log("Nothing to do here!");
        }

        else if (id === "GoToJail"){
            console.log("Go to Jail. Go directly to Jail.");
            console.log("Do not pass GO. Do not collect $200");
        }

        else if (id === "LuxTax"){
            console.log("Luxury Tax. Pay $75");
            player.set_cash(player.get_cash() - 75);
            console.log("You now have $" + player.get_cash() + ".");
        }
    },

    //Draw chance card from array and call chanceAction()
    drawChance: function(chanceCards, currPlayer, players, board){
        var cards = chanceCards;
        var player = currPlayer;
        var players = players;
        var card = cards.shift();  //Remove and return first card in array

        //console.log(cards);

        //Call chanceAction() function on card
        module.exports.chanceAction(card, player, players, board);

        //GOTJ card is given to player, not immediately put at the end
        if (card.get_id() !== "getOutJail"){
            cards.push(card);   //Put card at bottom of deck (end of array)
        }
    },

    //Draw chest card from array and call chestAction()
    drawChest: function(chestCards, currPlayer, players, board){
        var cards = chestCards;
        var player = currPlayer;
        var players = players;

        var card = cards.shift();  //Remove and return first card in array

        //Call chestAction() function on card
        module.exports.chestAction(card, player, players, board);

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
