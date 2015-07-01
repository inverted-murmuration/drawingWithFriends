//GameMiniView.js

var app = app || {};

app.GameMiniView = Backbone.View.extend({
  template: _.template('<div class="GameMini"> Click Here for game number <%- id %> ! </div>'),
  events: {
    'click': function() {
      //TODO
      alert('should do something for id: ' + this.model.id);
    }
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});