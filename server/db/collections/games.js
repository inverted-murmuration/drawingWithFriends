var db = require('../config');
var Game = require('../models/game');

var Gamess = new db.Collection();

Games.model = Game;

module.exports = Games;