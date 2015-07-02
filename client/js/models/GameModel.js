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
    socket.on('servePhrase', function(phrase) {
      // phrase is an object. use phrase.phrase to access

    });
    socket.on('startTimer', function(time) {
      // time is an object. use time.time to access time
    });
  },
  createGame: function(){
    socket.emit('createGame');
    console.log('Game Created')
  }
});