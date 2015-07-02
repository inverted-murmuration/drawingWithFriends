// js/app.js
// This file is responsible for instantiating the entire app. Will load on document.ready()  

var app = app || {};

$(function() {
  //TODO can these be put in the view please
  $('.item, .menu-li').click(function(e){
    $('.item').toggle();
  });
  var router = new app.router();
  Backbone.history.start();
  // Kick things off by creating the **App**.
  // new app.GaneView();

  //var appModel = new app.AppModel();
  //var gameView = new app.GaneView({model: appModel});

});
