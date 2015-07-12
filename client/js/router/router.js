var app = app || {};

app.router = Backbone.Router.extend({
  routes : {
    '' : 'home',
    'draw' : 'draw',
    'gallery' : 'gallery',
    'games': 'games',
    'game/:gameId': 'game',
    'gallery/:page' : 'gallery'
  },
  initialize: function(){
  },
  home : function(){
    //TODO refactor all these container emptys
    $('.container').empty();
    //$('.color-picker').empty();
    this.homeView = new app.HomeView();
  },
  gallery : function(page){
    $('.container').empty();
    this.picturesCollection = new app.PicturesCollection();
    this.picturesView = new app.PicturesView({collection: this.picturesCollection});

  },
  games : function(){
    $('.container').empty();
    this.gamesCollection = new app.GamesCollection([]);
    this.GamesView = new app.GamesView({collection: this.gamesCollection});
  },
  game : function(id) {
    var gameId = parseInt(id);
    if (gameId === -1) {
      //the 'app' is the drawing portion of the app
      this.gameModel = this.gameModel || new app.GameModel({playerNumber: 1}); 
      this.gameModel.set('phrase', '');  // reset phrase when click Create Game
      this.gameView = this.gameView || new app.GameView({model: this.gameModel});
    } 
    else {
      this.gameModel = this.gameModel || new app.GameModel({playerNumber: 2, gameId: gameId});
      this.gameView = this.gameView || new app.GameView({model: this.gameModel});
    }
  }
});
