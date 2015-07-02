var app = app || {};

app.GameModel = Backbone.Model.extend({

  defaults: {
    phrase: ''
  },

  initialize: function(options) {
    var context = this;
    this.pictureModel = new app.PictureModel({width: '500px', height: '500px'});
    this.timerModel = new app.TimerModel();
    var context = this;
    // Things to do when timer runs out
    socket.on('round next', function(data) {
      //if not max round
        //reset timer
      //else end game
    });
    socket.on('servePhrase', function(data) {
      // phrase is an object. use phrase.phrase to access
      context.set({phrase: data.phrase});
      context.set({gameId: data.gameId});
      context.trigger('updatePhrase');
    });
    socket.on('startTimer', function(data) {
      // time is an object. use time.time to access time
    });
    if (options.hasOwnProperty('playerNumber')) {
      if (options.playerNumber === 1) {
        context.createGame();
      } else {
        context.id = options.gameId;
        context.joinGame();
      }
    }
  },
  createGame: function(){
    socket.emit('createGame');
  },
  joinGame: function() {
    socket.emit('joinGame', {gameId: this.id});
  },
  updatePhrase: function(noun) {
    this.set({phrase: this.get('phrase') + ' ' + noun});
    socket.emit('sendPhrase', this.get('phrase'));
  }
});