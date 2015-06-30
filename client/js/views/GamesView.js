//GamesView.js

var app = app || {};

app.GamesView = Backbone.View.extend({
  initialize : function() {
    socket.emit('get games');
    $('.container').text('loading...');
    this.collection.on('processed', this.render, this);

  },
  render : function () {
    //this.$el.detach();
    $('.container')
    .append("This is a game!");
  }
});
