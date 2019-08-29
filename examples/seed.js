const _ = require('lodash');
const { waterfall } = require('async');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require('../lib');

/* track seeding time */
let seedStart;
let seedEnd;

const log = (stage, error, results) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }

  if (results) {
    const val = _.isArray(results) ? results.length : results;
    console.info(`${stage} seed result`, val);
  }
};

const clearSeed = next => clear(Priority, Jurisdiction, () => next());

const seedJurisdiction = next => Jurisdiction.fake().post(next);

const seedPriority = (jurisdiction, next) => {
  let priorities = Priority.fake(50);

  priorities = _.forEach(priorities, priority => {
    priority.set({ jurisdiction });
    return priority;
  });

  Priority.create(priorities, next);
};

const seed = () => {
  seedEnd = Date.now();
  waterfall([clearSeed, seedJurisdiction, seedPriority], (error, results) => {
    if (error) {
      throw error;
    }
    seedEnd = Date.now();

    log('time', null, seedEnd - seedStart);
    log('final', error, results);
    process.exit(0);
  });
};

// connect and seed
connect(error => {
  if (error) {
    throw error;
  }
  seed();
});
