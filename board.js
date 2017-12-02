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

    //Finds action associated with passed chance card
    chanceAction: function(card, currPlayer, players){

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
                //Move to Go
                //Trigger space action
            }

            else if (id === "nearestRail1"){
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

    //Work in progress
    propertyAction: function(space, currPlayer, players){
        var space = space;
        var player = currPlayer;
        var property = space.get_prop();
        var type = property.get_type();

        if (type !== "utility" || type != "railroad"){
            var numBuildings = property.get_num_buildings();
            var monopoly = property.is_monopoly();

            if (monopoly){
                switch(numBuildings) {
                    case 0:

}
            }


        }


    },

    //Draw chance card from array and call chanceAction()
    drawChance: function(chanceCards, currPlayer, players){
        var cards = chanceCards;
        var player = currPlayer;
        var players = players;

        var card = cards.shift();  //Remove and return first card in array

        //Call chanceAction() function on card
        module.exports.chanceAction(card, player, players);

        //GOTJ card is given to player, not immediately put at the end
        if (card.get_id() !== "getOutJail"){
            cards.push(card);   //Put card at bottom of deck (end of array)
        }
    },

    //Draw chest card from array and call chestAction()
    drawChest: function(chestCards, currPlayer, players){
        var cards = chestCards;
        var player = currPlayer;
        var players = players;

        var card = cards.shift();  //Remove and return first card in array

        //Call chestAction() function on card
        module.exports.chestAction(card, player, players);

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
    }
};
