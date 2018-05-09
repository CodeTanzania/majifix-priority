'use strict';


/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI) || 'mongodb://localhost/majifix-priority';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { Jurisdiction } = require('majifix-jurisdiction');
const {
  Priority,
  app,
  info
} = require(path.join(__dirname, '..', 'index'));
let samples = require('./samples')(20);

/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);


function boot() {

  async.waterfall([
    function clear(next) {
      Priority.remove(function () {
        next();
      });
    },

    function seedJurisdiction(next) {
      const jurisdiction = Jurisdiction.fake();
      Jurisdiction.remove(function ( /*error, results*/ ) {
        jurisdiction.post(next);
      });
    },

    function seed(jurisdiction, next) {
      /* fake priorities */
      samples = _.map(samples, function (sample) {
        if ((sample.weight % 2 === 0)) {
          sample.jurisdiction = jurisdiction;
        }
        return sample;
      });
      /* fake priorities */
      Priority.create(samples, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(
        `visit http://0.0.0.0:${env.PORT}/v${info.version}/priorities`
      );
    });

  });
}

boot();
