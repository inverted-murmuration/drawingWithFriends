var app = app || {};
// initialized in AppModel.js

app.GameModel = Backbone.Model.extend({
  initialize: function() {
    this.pictureModel = new app.PictureModel({width: '500px', height: '500px'});
    this.timerModel = new app.TimerModel();
    // Things to do when timer runs out
    socket.on('round next', function(data) {
    });
    // When a user joins
    this.on('join', function() {
      // TODO: Change player once timer is ended and player joins
      // Set current player to player 2

      // if time left is 0
        this.set('currentPlayer', false);
        //restart timer
    });
  },
  
  defaults: {
    text: '',
    // true == player 1; false == player 2
    currentPlayer: true
  },

  madLibGen: function() {},
  timer: function() {}




});