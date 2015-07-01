var db = require('../config');
var Game = require('../models/game');

var Games = new db.Collection();

Games.model = Game;

module.exports = Games;