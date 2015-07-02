var db = require('../config');

var Game = db.Model.extend({
  tableName: 'Game',
  hasTimestamps: true,
  defaults: {
    currentRound: 0,
    lastRound: 2
  },
  incrementRounds: function() {
    this.set("currentRound", this.get("currentRound") + 1);
  }
});

module.exports = db.model('Game', Game); //use bookshelf registry plugin to avoid circular referencing problems
