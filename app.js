var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// viewed at http://localhost:8080
app.get('/monopoly_game/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/monopoly_game/index.html'));
});

//make the following directors publically accessable
app.use('/monopoly_game', express.static(path.join(__dirname + '/monopoly_game')));
app.use('/DialogueSystem', express.static(path.join(__dirname + '/DialogueSystem')));

app.listen(8080);
