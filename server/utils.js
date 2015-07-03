// will contain and export callback functions for server actions
var db = require('./db/config');
var Promise = require('bluebird');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Game = require('./db/models/game');
var Games = require('./db/collections/games');
var Timer = require('timer-stopwatch');

var sendTimer = function(io, timer) {
  // send the timer upon (any) client timer mode init (if there is a timer going),
  // or upon user drawing the first line. io.emit to all to keep client timer more up to date
  // if there is no timer going, will emit time: null
  io.emit('setTimer', {time: timer && timer.ms});
  io.emit('startTimer', {time: timer && timer.ms});
};

//creates a timer if there is no timer and starts it,
//emits it to everyone,
//calls cb when the timer ends,
//returns the timer
module.exports.updateTimer = function(io, timer, cb) {
    if (!timer) {
      timer = new Timer(5000, {
          refreshRateMS: '1000'
        });
      timer.on('done', cb);
      timer.start();
      sendTimer(io, timer);
    }
    return timer;
};

//saves the picture and lines to the db, then clears the Lines collection
//emits the resetting to everyone,
//calls cb after the saving/resetting is successful
module.exports.savePictureAndReset = function(io, cb) {

  if (Lines.length < 1) return; //make sure we are not creating a new picture if there are no lines. this fn shouldn't be called anyway in that case...

  new Picture({}).save().then(function(picture) { //save first to get a picture id
    var pic_lines = picture.lines();
    Lines.mapThen(function(model) { //iter through lines, prepare attributes for saving to db, then save to db with create
      model.unset('id', {silent: true}); //silent = don't fire 'change' event. less overhead?
      model.set('coordinates', JSON.stringify(model.get('coordinates'))); //shouldn't stringifcation be automatic on save?? hm
      return pic_lines.create(model.attributes); //eww exposing model.attr but trying the bookshelf relation way

      //Other methods tried:
      //pic_lines.add(model); //something like this would be nice
      //model.picture().set('id', picture.get('id')); //another method, less encapsulatey, setting the relationship via the other direction
      //model.set('picture_id', picture.get('id')); same as above but even more manual and not using bookshelf relationship
      //return model.save(); //create does this above

    }).then(function(res) {
      Lines.reset();
      io.emit('got lines', Lines); //all clients redraws lines (no lines) TODO
      cb();
    }).catch(function(err) {
      return console.error('error saving all line models to db: ', err);
    });
  }).catch(function(err) {
    return console.error('error saving picture to db: ', err);
  });
};

module.exports.retrievePictureModels = function(socket){
  //loop through all lines in DB
  //find all lines which have the same picture ID
  //populate arrays, which represent completed pictures, with lines which match those pictures

  //OR

  new Line({}).fetchAll().then(function(pictures){
    socket.emit('gallery served', pictures);
    //console.log(pictures);
  });

  //
};

module.exports.retrieveOpenGames = function(socket) {
  //TODO fetch only available games
  new Game({})
  .query(function(qb) {
    qb.where("joinable", '=', true);
  })
  .fetchAll().then(function(games){  
    console.log('GAMES!', games);
    socket.emit('games served', games);
  });
};

module.exports.sendTimer = sendTimer;

// gets random adjective from words table
module.exports.getAdjective = function() {
  return new Promise(function(resolve, reject) {
    resolve(db.knex.raw("select text from words where type='adjective' order by rand() limit 1").then(function(data) {
      return data[0][0].text;
    }));
  });
};

// gets random verb from words table
module.exports.getVerb = function() {
  return new Promise(function(resolve, reject){
    resolve(db.knex.raw("select text from words where type='verb' order by rand() limit 1").then(function(data) {
      return data[0][0].text;
    }));
  });
};