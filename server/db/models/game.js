var db = require('../config');

var Game = db.Model.extend({
  tableName: 'Game',
  hasTimestamps: true
});

module.exports = db.model('Game', Game); //use bookshelf registry plugin to avoid circular referencing problems
