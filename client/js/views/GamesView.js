//GamesView.js

var app = app || {};

app.GamesView = Backbone.View.extend({
  initialize: function() {
    $('.container').text('loading...');
    this.collection.on('processed', this.render, this);
  },
  render: function() {
    $('.container').empty();
    this.collection.forEach(this.renderGame, this);
  },
  renderGame: function(game) {
    var gameView = new app.GameMiniView({
      model: game
    });
    $('.container').append(gameView.render());

  }
});