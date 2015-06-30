//GameView.js

var app = app || {};

app.GameView = Backbone.View.extend({
  initialize : function() {
    this.render();
  },
  render : function () {
    //this.$el.detach();
    $('.container')
    .append("This is a game!");
  }
});
