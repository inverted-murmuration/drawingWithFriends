//GamesView.js

var app = app || {};

app.GamesView = Backbone.View.extend({
  initialize : function() {
    $('.container').text('loading...');
    this.collection.on('processed', this.render, this);

  },
  render : function () {
    //this.$el.detach();
    $('.container')
    .append("This is a game!");
  }
});
