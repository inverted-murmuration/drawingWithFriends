// PicturesCollection.js
// This collection will contain Game Models

var app = app || {};

app.GamesCollection = Backbone.Collection.extend({
  model: app.GameModel,

  initialize: function() {
    socket.emit('get games');
    socket.on('games served', function(data) {
      //add all games to this collection
      _.each(data, function(game) {
        this.add(new app.GameModel(game));
      }, this);
      
      //notify view   
      this.trigger('processed');
    }.bind(this));
  }
});