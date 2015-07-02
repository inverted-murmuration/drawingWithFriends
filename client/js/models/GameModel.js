var app = app || {};

app.GameModel = Backbone.Model.extend({
  initialize: function() {
    this.pictureModel = new app.PictureModel({width: '500px', height: '500px'});
    this.timerModel = new app.TimerModel();
    // Things to do when timer runs out
    socket.on('round next', function(data) {
      //if not max round
        //reset timer
      //else end game
    });
    socket.on('servePhrase', function(data) {
      // phrase is an object. use phrase.phrase to access
      this.set({phrase: data.phrase});
      this.set({gameId: data.gameId});
      this.trigger('updatePhrase');
    });
    socket.on('startTimer', function(data) {
      // time is an object. use time.time to access time
    });
  },
  createGame: function(){
    socket.emit('createGame');
  },
  updatePhrase: function(noun) {
    this.set({phrase: this.get('phrase') + ' ' + noun});
    socket.emit('sendPhrase', this.get('phrase'));
  }
});