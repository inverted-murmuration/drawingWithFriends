//PictureModel

var app = app || {};

app.PictureModel = Backbone.Model.extend({
  //defaults: {
  //container: d3.select('body')
  //},
  initialize: function(defaults) {
    this.set('lines', new app.LineCollection());
    this.set('playerNumber', defaults.playerNumber);
    this.set('round', defaults.round);
    this.set('roundOver', false);
    this.on('change:roundOver', function() {
      // console.log('round over for picture')
    });
  },
  canDraw: function() {
    if(this.get('round') === 0) {
      return false;
    }
    if ((this.get('playerNumber') === 1 && this.get('round') % 2 === 0 ||
      this.get('playerNumber') === 2 && this.get('round') % 2 === 1) &&
      this.get('roundOver') === false) {
      return true;
    }
    return false;
  },

  dragStarted: function() {
    //console.log('drag started');
    //this.set('activeLine', new app.LineModel({id: idHash()}));
    console.log('playerNumber: ', this.get('playerNumber'));
    console.log('round: ', this.get('round'));
    if (this.canDraw()) {

      this.set('activeLine', new app.LineModel());
      this.get('lines').add(this.get('activeLine'));
    }
  },

  drag: function(mouseCoord) {
    // console.log('drag');

    if (this.canDraw()) {
      this.get('activeLine').updateLine(mouseCoord);
    }
  },

  dragEnded: function() {
    // console.log('dragend');

    if (this.canDraw()) {
      this.get('activeLine').endLine();
      this.set('activeLine', null);
    }
  },

});


/*

    Instantiating a PictureModel
    ---------------------------------------------------
    --> Pass in a collection of lines

    var pictureData = new PictureModel({
        lines: new app.LineCollection()
    });

*/