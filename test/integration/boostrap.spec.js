'use strict';


/* dependencies */
const mongoose = require('mongoose');


//setup database
before(function (done) {
  mongoose.connect('mongodb://localhost/majifix-priority', done);
});


// clear database
after(function (done) {
  if (mongoose.connection && mongoose.connection.dropDatabase) {
    mongoose.connection.dropDatabase(done);
  }
});
