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

    // create game when view is instantiated
    this.model.createGame();

    // re-render phrase when updated on gameModel
    this.render();
    this.on('updatePhrase', function(){
      this.render();
    })
  },

  render: function() {
    $(this.appContainer).prepend(this.model.get('phrase'));
  }

});

