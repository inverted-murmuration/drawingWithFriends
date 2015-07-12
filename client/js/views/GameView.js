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
    'click .addNoun': function(){this.model.addToPhrase();},//'addToPhrase',
    'click .create': function(){this.model.createGame();}
  },

  render: function() {
    var context = this;
    var round = this.model.get('round');
    var player = this.model.get('playerNumber');

    // SECTION: Phrase in top right of header bar
    // clear div of previous items
    $('.instructions').empty();
    // Create message
    var messages = {
      waiting: 'Waiting for second player...',
      empty: '',
      r1p1: 'Player 2 drawing: <span class="placeHolder">' + this.model.get('phrase') + '</span>',
      r1p2: 'Draw: <span class="placeHolder">' + this.model.get('phrase') + '</span>',
      r2p1: 'Draw: <span class="placeHolder">' + this.model.get('phrase') + '</span>',
      r2p2: 'Player 1 drawing: <span class="placeHolder">' + this.model.get('phrase') + '</span>',
      gameOver: 'GAME OVER'
    };
    // TODO: add correct message based on player and round
    var message;
    if (round === 0) {
      if (player === 1) {
        message = messages.waiting;
      } else if (player === 2) {
        message = messages.empty;
      }
    } else if (round === 1) {
      if (player === 1) {
        message = messages.r1p1;
      } else if (player === 2) {
        message = messages.r1p2;
      }
    } else if (round === 2) {
      if (player === 1) {
        message = messages.r2p1;
      } else if (player === 2) {
        message = messages.r2p2;
      }
    } else if (round > 2) {
      if (player === 1) {
        message = messages.gameOver;
      } else if (player === 2) {
        message = messages.gameOver;
      }
    }
    // Add message to element and add element to page
    var messageHTML = '<p>' + message + '</p>';
    $('.instructions').prepend(messageHTML);

    // TODO: add conditional logic to decide whether or not to run
    // SECTION: Input form for phrase
    if (round === 0) {
      if (player === 1) {
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
      } else if (player === 2) {

      }
    } else if (round === 1) {
      if (player === 1) {
        this.model.on('change:roundOneOver', function(){
          setTimeout(function(){
            console.log("it's running!");
            $('.container').empty();
            // Create element
            var inputHTML = '<h2>Waiting for player 2</h2>'
            // Add element to page
            $('.container').prepend(inputHTML);
          }, 100);
        })
      } else if (player === 2) {
        this.model.on('change:roundOneOver', function(){
          setTimeout(function(){
            console.log("it's running!");
            $('.container').empty();
            // Create element
            var inputHTML =
                '<div class="phraseInput">' +
                '<h3>What should opponent draw?</h3>' +
                '<p>'+ context.model.get('phrase') +' <span class="placeHolder">&lt;add a noun&gt;</span></p>' +
                '<input id="noun" type="text" placeholder="Enter a noun">' +
                '<button class="addNoun">Submit</button>' +
                '</div>';
            // Add element to page
            $('.container').prepend(inputHTML);
          }, 100);
        })
      }
    } else if (round === 2) {
      if (player === 1) {

      } else if (player === 2) {

      }
    } else if (round > 2) {
      if (player === 1) {
        $('.container').empty();
        var inputHTML = '<h2>Game Over</h2>'
        // Add element to page
        $('.container').prepend(inputHTML);
      } else if (player === 2) {
        $('.container').empty();
        var inputHTML = '<h2>Game Over</h2>'
        // Add element to page
        $('.container').prepend(inputHTML);
      }
    }

    //// clear canvas of previous items
    //$('.container').empty();
    //// Create element
    //var inputHTML =
    //    '<div class="phraseInput">' +
    //      '<h3>What should opponent draw?</h3>' +
    //      '<p>'+ this.model.get('phrase') +' <span class="placeHolder">&lt;add a noun&gt;</span></p>' +
    //      '<input id="noun" type="text" placeholder="Enter a noun">' +
    //      '<button class="addNoun">Submit</button>' +
    //    '</div>';
    //// Add element to page
    //$('.container').prepend(inputHTML);

    //// TODO: add conditional logic to decide whether or not to run
    //// SECTION: Drawing canvas & timer
    if (round === 0) {
      if (player === 1) {

      } else if (player === 2) {

      }
    } else if (round === 1) {
      if (player === 1) {
        this.appContainer = '.container';
        // clear canvas of previous items
        $(this.appContainer).empty();
        // Create picture element
        this.pictureView = new app.PictureView({
          model: this.model.pictureModel,
          // Add picture element to page
          container: d3.select(this.appContainer) // this is a little different compared to below rendering for now cuz d3
        });
        // Create timer element
        this.timerView = new app.TimerView({
          model: this.model.timerModel
        });
        // Add timer element to page
        $(this.appContainer).prepend(this.timerView.render());
      } else if (player === 2) {
        this.appContainer = '.container';
        // clear canvas of previous items
        $(this.appContainer).empty();
        // Create picture element
        this.pictureView = new app.PictureView({
          model: this.model.pictureModel,
          // Add picture element to page
          container: d3.select(this.appContainer) // this is a little different compared to below rendering for now cuz d3
        });
        // Create timer element
        this.timerView = new app.TimerView({
          model: this.model.timerModel
        });
        // Add timer element to page
        $(this.appContainer).prepend(this.timerView.render());
      }
    } else if (round === 2) {
      if (player === 1) {
        this.appContainer = '.container';
        // clear canvas of previous items
        $(this.appContainer).empty();
        // Create picture element
        this.pictureView = new app.PictureView({
          model: this.model.pictureModel,
          // Add picture element to page
          container: d3.select(this.appContainer) // this is a little different compared to below rendering for now cuz d3
        });
        // Create timer element
        this.timerView = new app.TimerView({
          model: this.model.timerModel
        });
        // Add timer element to page
        $(this.appContainer).prepend(this.timerView.render());
      } else if (player === 2) {
        this.appContainer = '.container';
        // clear canvas of previous items
        $(this.appContainer).empty();
        // Create picture element
        this.pictureView = new app.PictureView({
          model: this.model.pictureModel,
          // Add picture element to page
          container: d3.select(this.appContainer) // this is a little different compared to below rendering for now cuz d3
        });
        // Create timer element
        this.timerView = new app.TimerView({
          model: this.model.timerModel
        });
        // Add timer element to page
        $(this.appContainer).prepend(this.timerView.render());
      }
    } else if (round > 2) {
      if (player === 1) {

      } else if (player === 2) {

      }
    }

  //  this.appContainer = '.container';
  //  // clear canvas of previous items
  //  $(this.appContainer).empty();
  //  // Create picture element
  //  this.pictureView = new app.PictureView({
  //    model: this.model.pictureModel,
  //    // Add picture element to page
  //    container: d3.select(this.appContainer) // this is a little different compared to below rendering for now cuz d3
  //  });
  //  // Create timer element
  //  this.timerView = new app.TimerView({
  //    model: this.model.timerModel
  //  });
  //  // Add timer element to page
  //  $(this.appContainer).prepend(this.timerView.render());
  }

});