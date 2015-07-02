var app = app || {};

app.router = Backbone.Router.extend({
  routes : {
    '' : 'home',
    'draw' : 'draw',
    'gallery' : 'gallery',
    'games': 'games',
    //'game/:gameId': 'game'
    'gallery/:page' : 'gallery',
     'game' : "game" //TODO ????
  },
  initialize: function(){
  },
  home : function(){
    //TODO refactor all these container emptys
    $('.container').empty();
    //$('.color-picker').empty();
    var homeView = new app.HomeView();
  },
  gallery : function(page){
    $('.container').empty();
    console.log('router gallery')
    this.picturesCollection = new app.PicturesCollection();
    this.picturesView = new app.PicturesView({collection: this.picturesCollection});

  },
  games : function(){
    $('.container').empty();
    this.gamesCollection = new app.GamesCollection([]);
    this.GamesView = new app.GamesView({collection: this.gamesCollection});
  },
  game : function() {
    this.gameModel = new app.GameModel({playerNumber: 1}); //the 'app' is the drawing portion of the app
    $('.container').empty();
    this.gameView = new app.GameView({model: this.gameModel})
  }
});
