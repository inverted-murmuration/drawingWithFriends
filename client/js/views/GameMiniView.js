//GameMiniView.js

var app = app || {};

app.GameMiniView = Backbone.View.extend({
  template: _.template('<a href="#game/<%= id %>"><div class="GameMini"> Click Here for game number <%- id %> ! </div></a>'),
  events: {
    'click': function() {
      //TODO
    }
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});