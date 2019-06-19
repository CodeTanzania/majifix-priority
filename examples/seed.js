const _ = require('lodash');
const { waterfall } = require('async');
const { connect } = require('@lykmapipo/mongoose-common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require('../lib');

// track seeding time
let seedStart;
let seedEnd;

/* eslint-disable */
const log = (stage, error, results) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }

  if (results) {
    const val = _.isArray(results) ? results.length : results;
    console.info(`${stage} seed result`, val);
  }
};
/* eslint-enable */

connect(err => {
  if (err) {
    throw err;
  }

  waterfall(
    [
      function clearPriority(next) {
        Priority.deleteMany(() => next());
      },

      function clearJurisdiction(next) {
        Jurisdiction.deleteMany(() => next());
      },

      function seedJurisdiction(next) {
        const jurisdiction = Jurisdiction.fake();
        jurisdiction.post(next);
      },

      function seedPriority(jurisdiction, next) {
        seedStart = Date.now();
        let priorities = Priority.fake(50);

        priorities = _.forEach(priorities, priority => {
          const sample = priority;
          sample.jurisdiction = jurisdiction;
          return sample;
        });

        Priority.create(priorities, next);
      },
    ],
    (error, results) => {
      if (error) {
        throw error;
      }

      seedEnd = Date.now();

      log('time', null, seedEnd - seedStart);
      log('final', error, results);
      process.exit(0);
    }
  );
});
