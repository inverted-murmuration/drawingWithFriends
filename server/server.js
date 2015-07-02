var express = require('express');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Pictures = require('./db/collections/pictures');
var Game = require('./db/models/game');
var Games = require('./db/collections/games');
var util = require('./utils'); //TODO maybe as an injection like routes


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
require('./routes')(app); //is this best way to decorate/dependency inject?

var timer = null;

io.on('connection', function(socket) {

  //the below is for test purposes
  //util.retrievePictureModels();

  //TODO rename these events without spaces etc
  socket.on('get lines', function() { //user has requested the lines because the picture view is rendering
    socket.emit('got lines', Lines); //send the lines every time the user requests it (not very efficient, think about having view run in bg so this is only emitted once)
    //maybe call this set lines to conform
  });
  socket.on('getTimer', function() {
    util.sendTimer(io, timer);
  });

  socket.on('user moved', function(data) {
    //console.log('a user drew. their data: ', data); //TODO send JSON.stringify(model) as data to server from client, cleaner?

    Lines.add({id: data.id, coordinates: data.coordinates}, {merge: true});

    //TODO move all timer logic to another file?
    timer = util.updateTimer(io, timer, function() { //cb to fire when timer ends
      util.savePictureAndReset(io, function() { //cb to fire upon successful saving/resetting
      timer = null; 

      });
    });

    socket.broadcast.emit('user moved', data);
  });
  
  socket.on('user ended', function(data) {
    socket.broadcast.emit('user ended', data);
    //Lines.get({id: data.id}).set('id', null);
    //get rid of edge case problem where user is still drawing when timer ends (Lines reset)
  });
  //socket.on('disconnect', function() {
    //io.emit('user disconnected'); //custom event
  //});

  socket.on('gallery needed', function(){
    ///console.log('server has received gallery populate event from client');
    //console.log(util.retrievePictureModels());
    util.retrievePictureModels(socket);
  });

  socket.on('createGame', function() {
    var newAdj = '';
    // Generate random adjective
    util.getAdjective()
      .then(function(data) {
        newAdj = data;
        // Create a new game
        var myGame = new Game({
          phrase: newAdj
          // Moved to game model
          // currentRound: 0,
          // lastRound: 2
        });
        // Adding this game to global list of games
        Games.add(myGame);
        // Save this game to database
        myGame.save()
        .then(function() {
          // Emit servePhrase with phrase and this game's id
          socket.emit('servePhrase', {
            phrase: newAdj,
            gameId: myGame.get('id')
          });
        });
      });
  });

  socket.on('sendPhrase', function(data) {
    //TODO: Handle going over last round
    var context = data;
    new Game({id: data.gameId})
    .fetch()
    .then(function(game) {
      var newPhrase;
      // If is round 1
      if (game.currentRound > 0 && game.currentRound < game.lastRound) {
        timer = util.updateTimer(io, timer, function() {
          util.getAdjective()
          .then(function(newAdj) {
            newPhrase = context.phrase + ' ' + newAdj;
            socket.emit('servePhrase', {phrase: newPhrase});
            game.set('phrase', newPhrase);
            game.incrementRounds();
            game.save()
              .then(function(theGame) {
                console.log(theGame.get('currentRound'));
                socket.emit('roundChange', {round: theGame.get('currentRound')});
              });
          });
        });
      } else {
        util.getAdjective()
        .then(function(newAdj) {
          newPhrase = context.phrase + ' ' + newAdj;
          socket.emit('servePhrase', {phrase: newPhrase});
          game.set('phrase', newPhrase);
          game.incrementRounds();
          game.save();
        });
      }
      // game.set('phrase', newPhrase);
      // game.incrementRounds();
      // game.save();
    });
  });

  socket.on('joinGame', function(data) {
    var gameId = data.gameId;
    new Game({id: gameId})
    .fetch()
    .then(function(game) {
      var context = game;
      game.incrementRounds();
      game.save()
      .then(function(theGame) {
        socket.emit('servePhrase', {phrase: theGame.get('phrase')});
        //Round 1
        console.log(theGame.get('currentRound'));
        socket.emit('roundChange', {round: theGame.get('currentRound')});
        timer = util.updateTimer(io, timer, function() {
          var newAdj = util.getAdjective();
          var newPhrase = context.get('phrase') + newAdj;
          socket.emit('servePhrase', {phrase: newPhrase});
        });
      });
    });
    // emit servePhrase
    // emit startTimer
    // emit servePhrase on timer end
  });

  socket.on('get games', function() {
    data = util.retrieveOpenGames(socket);
    // socket.broadcast.emit('get games', data);
  });

});

