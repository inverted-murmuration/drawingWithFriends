var app = app || {};

app.AppModel = Backbone.Model.extend({
  initialize: function() {
    this.gameModel = new app.GameModel();
  }
});
