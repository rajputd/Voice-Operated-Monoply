var board = require("./board");

//Create Property Objects (In Order of Appearance on Board)
var MedAve = new board.Property("Mediterranean Avenue", "MedAve", 1, 60, "purple", 2, 10, 30, 90, 160, 250, 50);
var BaltAve = new board.Property("Baltic Avenue", "BaltAve", 3, 60, "purple", 4, 20, 60, 180, 320, 450, 50);
var ReadRail = new board.Property("Reading Railroad", "ReadRail", 5, 200, "railroad", 25, 50, 100, 200);
var OrientAve = new board.Property("Oriental Avenue", "OrientAve", 6, 100, "light-blue", 6, 30, 90, 270, 400, 550, 50);
var VermAve = new board.Property("Vermont Avenue", "VermAve", 8, 100, "light-blue", 6, 30, 90, 270, 400, 550, 50);
var ConnAve = new board.Property("Connecticut Avenue", "ConnAve", 9, 120, "light-blue", 8, 40, 100, 300, 450, 600, 50);
var StCharPl = new board.Property("St. Charles Place", "StCharPl", 11, 140, "pink", 10, 50, 150, 450, 625, 750, 100);
var Electric = new board.Property("Electric Company", "Electric", 12, 150, "utility");
var StateAve = new board.Property("States Avenue", "StateAve", 13, 140, "pink", 10, 50, 150, 450, 625, 750, 100);
var VirgAve = new board.Property("Virginia Avenue", "VirgAve", 14, 160, "pink", 12, 60, 180, 500, 700, 900, 100);
var PennRail = new board.Property("Pennsylvania Railroad", "PennRail", 15, 200, "railroad", 25, 50, 100, 200);
var StJamePl = new board.Property("St. James Place", "StJamePl", 16, 180, "orange", 14, 70, 200, 550, 750, 950, 100);
var TennAve = new board.Property("Tennessee Avenue", "TennAve", 18, 180, "orange", 14, 70, 200, 550, 750, 950, 100);
var NYAve = new board.Property("New York Avenue", "NYAve", 19, 200, "orange", 16, 80, 220, 600, 800, 1000, 100);
var KentAve = new board.Property("Kentucky Avenue", "KentAve", 21, 220, "red", 18, 90, 250, 700, 875, 1050, 150);
var IndAve = new board.Property("Indiana Avenue", "IndAve", 23, 220, "red", 18, 90, 250, 700, 875, 1050, 150);
var IllAve = new board.Property("Illinois Avenue", "IllAve", 24, 240, "red", 20, 100, 300, 750, 925, 1100, 150);
var BORail = new board.Property("B. & O. Railroad", "BORail", 25, 200, "railroad", 25, 50, 100, 200);
var AtlAve = new board.Property("Atlantic Avenue", "AtlAve", 26, 260, "yellow", 22, 110, 330, 800, 975, 1150, 150);
var VentAve = new board.Property("Ventnor Avenue", "VentAve", 27, 260, "yellow", 22, 110, 330, 800, 975, 1150, 150);
var Water = new board.Property("Water Works", "Water", 28, 150, "utility");
var MarvGard = new board.Property("Marvin Garden", "MarvGard", 29, 280, "yellow", 24, 120, 360, 850, 1025, 1200, 150);
var PacAve = new board.Property("Pacific Avenue", "PacAve", 31, 300, "green", 26, 130, 390, 900, 1100, 1275, 200);
var NCAve = new board.Property("North Carolina Avenue", "NCAve", 32, 300, "green", 26, 130, 390, 900, 1100, 1275, 200);
var PennAve = new board.Property("Pennsylvania Avenue", "PennAve", 34, 320, "green", 28, 150, 450, 1000, 1200, 1400, 200);
var SLRail = new board.Property("Short Line", "SLRail", 35, 200, "railroad", 25, 50, 100, 200);
var ParkPl = new board.Property("Park Place", "ParkPl", 37, 350, "dark-blue", 35, 175, 500, 1100, 1300, 1500, 200);
var Boardwalk = new board.Property("Boardwalk", "Boardwalk", 39, 400, "dark-blue", 50, 200, 600, 1400, 1700, 2000, 200);

var properties = [MedAve, BaltAve, ReadRail, OrientAve, VermAve, ConnAve,
    StCharPl, Electric, StateAve, VirgAve, PennRail, StJamePl, TennAve, NYAve,
    KentAve, IndAve, IllAve, BORail, AtlAve,  VentAve, Water, MarvGard, PacAve,
    NCAve, PennAve, SLRail, ParkPl, Boardwalk];

//Define Spaces
var space0 = new board.Space(0, "Go", "Go", "Action");
var space1 = new board.Space(1, "Mediterranean Avenue", "MedAve", "Property", MedAve);
var space2 = new board.Space(2, "Community Chest", "CommChest1", "Action");
var space3 = new board.Space(3, "Baltic Avenue", "BaltAve", "Property", BaltAve);
var space4 = new board.Space(4, "Income Tax", "IncTax", "Action");
var space5 = new board.Space(5, "Reading Railroad", "ReadRail", "Property", ReadRail);
var space6 = new board.Space(6, "Oriental Avenue", "OrientAve", "Property", OrientAve);
var space7 = new board.Space(7, "Chance", "Chance1", "Action");
var space8 = new board.Space(8, "Vermont Avenue", "VermAve", "Property", VermAve);
var space9 = new board.Space(9, "Connecticut Avenue", "ConnAve", "Property", ConnAve);
var space10 = new board.Space(10, "Jail", "Jail", "Action");
var space11 = new board.Space(11, "St. Charles Place", "StCharPl", "Property", StCharPl);
var space12 = new board.Space(12, "Electric Company", "Electric", "Property", Electric);
var space13 = new board.Space(13, "States Aveneue", "StateAve", "Property", StateAve);
var space14 = new board.Space(14, "Virginia Avenue", "VirgAve", "Property", VirgAve);
var space15 = new board.Space(15, "Pennsylvania Railroad", "PennRail", "Property", PennRail);
var space16 = new board.Space(16, "St. James Place", "StJamePl", "Property", StJamePl);
var space17 = new board.Space(17, "Community Chest", "CommChest2", "Action");
var space18 = new board.Space(18, "Tennessee Avenue", "TennAve", "Property", TennAve);
var space19 = new board.Space(19, "New York Avenue", "NYAve", "Property", NYAve);
var space20 = new board.Space(20, "Free Parking", "Parking", "Action");
var space21 = new board.Space(21, "Kentucky Avenue", "KentAve", "Property", KentAve);
var space22 = new board.Space(22, "Chance", "Chance2", "Action");
var space23 = new board.Space(23, "Indiana Avenue", "IndAve", "Property", IndAve);
var space24 = new board.Space(24, "Illinois Avenue", "IllAve", "Property", IllAve);
var space25 = new board.Space(25, "B. & O. Railroad", "BORail", "Property", BORail);
var space26 = new board.Space(26, "Atlantic Avenue", "AtlAve", "Property", AtlAve);
var space27 = new board.Space(27, "Ventnor Avenue", "VentAve", "Property", VentAve);
var space28 = new board.Space(28, "Water Works", "Water", "Property", Water);
var space29 = new board.Space(29, "Marvin Gardens", "MarvGard", "Property", MarvGard);
var space30 = new board.Space(30, "Go to Jail", "GoToJail", "Action");
var space31 = new board.Space(31, "Pacific Avenue", "PacAve", "Property", PacAve);
var space32 = new board.Space(32, "North Carolina Avenue", "NCAve", "Property", NCAve);
var space33 = new board.Space(33, "Community Chest", "CommChest3", "Action");
var space34 = new board.Space(34, "Pennsylvania Avenue", "PennAve", "Property", PennAve);
var space35 = new board.Space(35, "Short Line", "SLRail", "Property", SLRail);
var space36 = new board.Space(36, "Chance", "Chance3", "Action");
var space37 = new board.Space(37, "Park Place", "ParkPl", "Property", ParkPl);
var space38 = new board.Space(38, "Luxury Tax", "LuxTax", "Action");
var space39 = new board.Space(39, "Boardwalk", "Boardwalk", "Property", Boardwalk);

//Create Game Board as an Array of Spaces
var gameBoard = [space0, space1, space2, space3, space4, space5, space6, space7,
    space8, space9, space10, space11, space12, space13, space14, space15,
    space16, space17, space18, space19, space20, space21, space22, space23,
    space24, space25, space26, space27, space28, space29, space30, space31,
    space32, space33, space34, space35, space36, space37, space38, space39];

var chance0 = new board.Chance("buildMature", "Your building and loan matures. \nCollect $150", "earn");
var chance1 = new board.Chance("bankDividend", "Bank pays you of dividend of $50", "earn");
var chance2 = new board.Chance("repairs", "Make general repairs on all your property\n"
                               + "For each house pay $25 \nFor each hotel pay $100", "pay");
var chance3 = new board.Chance("advGo", "Advance to Go \n(Collect $200)", "move");
var chance4 = new board.Chance("nearestRail1", "Advance token to the nearest Railroad and pay owner\n"
                               + "Twice the Rental to which he/she is otherwise entitled.\n"
                               + "If Railroad is UNOWNED, you may but it from the bank", "move");
var chance5 = new board.Chance("nearestUtil", "Advance token to nearest utility\n"
                               + "IF UNOWNED you may buy it from the Bank.\n"
                               + "IF OWNED, throw dice and pay owner a total ten times the amount thrown.", "move");
var chance6 = new board.Chance("poorTax", "Pay poor tax of $15", "pay");
var chance7 = new board.Chance("advStChar", "Advance to St. Charles Place\n"
                                + "If you pass Go, collect $200", "move");
var chance8 = new board.Chance("goToJail", "Go directly to Jail\n"
                                + "Do not pass Go, Do not collect $200", "move");
var chance9 = new board.Chance("readRail", "Take a ride on the Reading\n"
                                + "If you pass Go collect $200", "move");
var chance10 = new board.Chance("chairman", "You have been elected Chairman of the Board\n"
                                + "Pay each player $50", "pay");
var chance11 = new board.Chance("nearestRail2", "Advance token to the nearest Railroad and pay owner\n"
                               + "Twice the Rental to which he/she is otherwise entitled.\n"
                               + "If Railroad is UNOWNED, you may but it from the bank", "move");
var chance12 = new board.Chance("getOutJail", "Get out of Jail FREE\n"
                                + "This card may be kept until needed or sold", "earn");
var chance13 = new board.Chance("advIllinois", "Advance to Illinois Avenue\n"
                                + "If you pass Go, collect $200", "move");
var chance14 = new board.Chance("advBoard", "Take a walk on the Boardwalk\n"
                                + "Advance token to Boardwalk", "move");
var chance15 = new board.Chance("goBack", "Go back 3 spaces", "move");

var chanceCards = [chance0, chance1, chance2, chance3, chance4, chance5,
                   chance6, chance7, chance8, chance9, chance10, chance11,
                   chance12, chance13, chance14, chance15];

var chest0 = new board.Chest("hospital", "Pay hospital $100", "pay");
var chest1 = new board.Chest("docFee", "Doctor's Fee\nPay $50", "pay");
var chest2 = new board.Chest("xmasFund", "Christmas Fund matures\nCollect $100", "earn");
var chest3 = new board.Chest("services", "Recieve for services $25", "earn");
var chest4 = new board.Chest("bankErr", "Bank error in your favor\nCollect $200", "earn");
var chest5 = new board.Chest("repairs", "You are assessed for street repairs\n"
                            + "$40 per house\n$115 per hotel", "pay");
var chest6 = new board.Chest("incTax", "Income tax refund\nCollect $20", "earn");
var chest7 = new board.Chest("getOutJail", "Get out of Jail FREE\n"
                            + "This card may be kept until need or sold", "earn");
var chest8 = new board.Chest("goToJail", "Got to Jail\nGo directly to Jail\n"
                                + "Do not pass Go, Do not collect $200", "move");
var chest9 = new board.Chest("inherit", "You inherit $100", "earn");
var chest10 = new board.Chest("school", "Pay school tax of $150", "pay");
var chest11 = new board.Chest("stock", "From sale of stock you get $45", "earn");
var chest12 = new board.Chest("beauty", "You have won second prize in a beauty contest\n"
                                + "Collect $10", "earn");
var chest13 = new board.Chest("advGo", "Advance to Go \n(Collect $200)", "move");
var chest14 = new board.Chest("opera", "Grand Opera opening\n"
                            + "Collect $50 from every player for opening night seats", "earn");
var chest15 = new board.Chest("insurance", "Life insurance matures\nCollect $100", "earn");

var chestCards = [chest0, chest1, chest2, chest3, chest4, chest5, chest6,
                  chest7, chest8, chest9, chest10, chest11, chest12, chest13,
                  chest14, chest15];

var player1 = new board.Player("Nick");
var player2 = new board.Player("Dileep");
var player3 = new board.Player("Ernie");

var players = [player1, player2, player3];

board.shuffleArray(chanceCards);
board.shuffleArray(chestCards);

var diceSum = board.rollDice()[0];      //Total of dice roll
var doubles = board.rollDice()[1];      //Doubles boolean

var newSpace = board.getNewSpace(player1, gameBoard, diceSum);

player1.add_property(AtlAve);
player1.add_property(VentAve);
player1.add_property(MarvGard);

AtlAve.set_num_buildings(2);
VentAve.set_num_buildings(2);
MarvGard.set_num_buildings(1);

AtlAve.set_monopoly_true();
VentAve.set_monopoly_true();
MarvGard.set_monopoly_true();

board.buyBuilding(player1, MarvGard);
console.log(player1.get_cash());
