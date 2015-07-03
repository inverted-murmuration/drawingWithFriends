// This view will be responsible for instantiating the entire app. Other views will be instantiated on creation of this view.

var app = app || {};

app.GameView = Backbone.View.extend({

  el: 'body',

  initialize: function() {
    this.render();
    // re-render phrase when updated on gameModel
    this.model.on('change', function(){
      this.render();
    }, this);
  },

  events: {
    'click .addNoun': 'addToPhrase'
  },

  addToPhrase: function(){
    var nounInput = $("#noun").val();
    this.model.set('phrase', this.model.get('phrase') + ' ' + nounInput);
    socket.emit('sendPhrase', {phrase: this.model.get('phrase'), gameId: this.model.get('gameId')});
    this.render();
  },

  render: function() {

    // SECTION: Phrase in top right of header bar
    // clear div of previous items
    $('.instructions').empty();
    // Create message
    var messages = {
      empty: '',
      r1p1: 'Player 2 drawing a ' + this.model.get('phrase'),
      r1p2: 'Draw a ' + this.model.get('phrase'),
      r2p1: 'Draw a ' + this.model.get('phrase'),
      r2p2: 'Player 1 drawing a ' + this.model.get('phrase')
    };
    // TODO: add correct message based on player and round
    var message = messages['r1p1'];
    // Add message to element and add element to page
    var messageHTML = '<p>' + message + '</p>';
    $('.instructions').prepend(messageHTML);

    // TODO: add conditional logic to decide whether or not to run
    // SECTION: Input form for phrase
    // clear canvas of previous items
    $('.container').empty();
    // Create element
    var inputHTML =
        '<div class="phraseInput">' +
          '<h3>What should opponent draw?</h3>' +
          '<p>'+ this.model.get('phrase') +' <span class="placeHolder">&lt;add a noun&gt;</span></p>' +
          '<input id="noun" type="text" placeholder="Enter a noun">' +
          '<button class="addNoun">Submit</button>' +
        '</div>';
    // Add element to page
    $('.container').prepend(inputHTML);

    //// TODO: add conditional logic to decide whether or not to run
    //// SECTION: Drawing canvas & timer
    //this.appContainer = '.container';
    //// clear canvas of previous items
    //$(this.appContainer).empty();
    //// Create picture element
    //this.pictureView = new app.PictureView({
    //  model: this.model.pictureModel,
    //  // Add picture element to page
    //  container: d3.select(this.appContainer) // this is a little different compared to below rendering for now cuz d3
    //});
    //// Create timer element
    //this.timerView = new app.TimerView({
    //  model: this.model.timerModel
    //});
    //// Add timer element to page
    //$(this.appContainer).prepend(this.timerView.render());
  }

});