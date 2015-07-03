var app = app || {};

app.GameModel = Backbone.Model.extend({

  defaults: {
    phrase: '',
    round: 0
  },

  initialize: function(options) {
    this.pictureModel = new app.PictureModel({
      playerNumber: options.playerNumber,
      round: 0
    });
    this.timerModel = new app.TimerModel();
    var context = this;
    this.set('playerNumber', options.playerNumber);

    // Things to do when timer runs out
    socket.on('round next', function(data) {
      //if not max round
      //reset timer
      //else end game
    });
    socket.on('servePhrase', function(data) {
      // phrase is an object. use phrase.phrase to access
      context.set({
        phrase: data.phrase
      });
      if (data.hasOwnProperty('gameId')) {
        context.set({
          gameId: data.gameId
        });
      }
    });
    socket.on('roundOver', function() {
      context.pictureModel.set('roundOver', true);
    });
    socket.on('startTimer', function(data) {
      // time is an object. use time.time to access time
    });
    if (options.hasOwnProperty('playerNumber')) {
      if (options.playerNumber === 1) {
        context.createGame();
      } else {
        context.set('id', options.gameId);
        context.joinGame();
      }
    }
    socket.on('roundChange', function(data) {
      console.log('round changed to: ', data.round);
      context.set({
        round: data.round
      });
      context.pictureModel.set('roundOver', false);
      context.pictureModel.set('round', data.round);
    });
  },
  createGame: function() {
    socket.emit('createGame');
  },
  joinGame: function() {
    socket.emit('joinGame', {
      gameId: this.get('id')
    });
  }
});