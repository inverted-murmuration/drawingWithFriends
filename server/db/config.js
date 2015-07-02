var path = require('path');
var words = require('./wordData.js');

var knex = require('knex')({
  client : 'mysql',
  connection : process.env.CLEARDB_DATABASE_URL || {
    host : '127.0.0.1',
    user : 'root',
    //password : '123',
    database : 'test',
    charset : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

bookshelf.knex.schema.hasTable('Picture').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Picture', function (picture) {
      picture.increments('id').primary();
      picture.timestamps();
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('Line').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Line', function (line) {
      line.increments('id').primary();
      line.string('coordinates', 20000); //json
      line.integer('picture_id').references('Picture');
      line.timestamps();
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('Game').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Game', function (game) {
      game.increments('id').primary();
      game.timestamps();
      game.string('phrase');
      game.integer('currentRound');
      game.integer('lastRound');
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});

// Create Words table if doesn't exist and add all words from wordData.js
bookshelf.knex.schema.hasTable('Words').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Words', function (word) {
      word.increments('id').primary();
      word.string('text'); //json
      word.string('type');
    }).then(function (table) {
      // create word model
      var Word = bookshelf.Model.extend({
        tableName: 'Words'
      });
      // add adjectives into words table
      for (var i = 0; i < words.adjective.length; i ++) {
        new Word({text: words.adjective[i], type: 'adjective'}).save();
      }
      // add adverbs into words table
      for (var i = 0; i < words.adverb.length; i ++) {
        new Word({text: words.adverb[i], type: 'adverb'}).save();
      }
      // add verbs into words table
      for (var i = 0; i < words.verb.length; i ++) {
        new Word({text: words.verb[i], type: 'verb'}).save();
      }
      console.log('Created table', table);
    });
  }
});

/**
  * Drops all tables in the Database
  */
bookshelf.down = function(knex, Promise) {
  return knex.schema.dropTable('Line')
    .dropTable('Picture');
};

module.exports = bookshelf;
