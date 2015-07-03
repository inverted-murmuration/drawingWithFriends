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
    socket.emit('sendPhrase', {phrase: this.model.get('phrase'), gameId: this.model.get('gameId')});
    this.render();
  },

  render: function() {
    var button = '';
    if(this.model.get('playerNumber') === 1 && this.model.get('round') % 2 === 0){
      button = ' <button class="addNoun">Add Noun</button>';
    }
    if(this.model.get('playerNumber') === 2 && this.model.get('round') % 2 === 1){
      button = ' <button class="addNoun">Add Noun</button>';
    }

    this.$el.html('<h2>Draw a ...</h2><br>' + this.model.get('phrase') + button);
    $(this.appContainer).prepend(this.$el);
    // console.log('playerNumber: ', this.model.get('playerNumber'));
    // console.log('round: ', this.model.get('round'));
  }

});

