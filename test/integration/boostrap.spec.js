'use strict';

/* dependencies */
const async = require('async');
const mongoose = require('mongoose');


function wipe(done) {
  const cleanups = mongoose.modelNames()
    .map(function (modelName) {
      //grab mongoose model
      return mongoose.model(modelName);
    })
    .map(function (Model) {
      //drop model collection
      return function (next) {
        Model.collection.drop(next);
      };
    });

  //run all clean ups parallel
  async.parallel(cleanups, function (error) {
    if (error && error.message !== 'ns not found') {
      done(error);
    } else {
      done();
    }
  });
}


//setup database
before(function (done) {
  mongoose.connect('mongodb://localhost/majifix-priority', done);
});

// clear previous states
before(function (done) {
  wipe(done);
});


// restore initial environment
after(function (done) {
  wipe(done);
});
