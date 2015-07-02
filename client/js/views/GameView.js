// This view will be responsible for instantiating the entire app. Other views will be instantiated on creation of this view.

var app = app || {};

app.GameView = Backbone.View.extend({

  initialize: function() {
    this.appContainer = '.container';
    this.pictureView = new app.PictureView({
       model: this.model.pictureModel,
       container: d3.select(this.appContainer) //TODO this is a little different compared to below rendering for now cuz d3
    });
    this.timerView = new app.TimerView({
      model: this.model.timerModel
    });
    $(this.appContainer).prepend(this.timerView.render());

    // re-render phrase when updated on gameModel
    this.render();
    this.model.on('change', function(){
      this.render();
    }, this);
  },

  events: {
    'click .addNoun': 'addToPhrase'
  },

  addToPhrase: function(){
    this.model.set('phrase', this.model.get('phrase') + ' ' + prompt('add a noun'));
    socket.emit('sendPhrase', {phrase: this.model.get('phrase')});
    this.render();
  },

  render: function() {
    this.$el.html('<h2>Draw a ...</h2><br>' + this.model.get('phrase') + ' <button class="addNoun">Add New Phrase</button>');
    $(this.appContainer).prepend(this.$el);
  }

});

