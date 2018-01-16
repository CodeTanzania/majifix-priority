'use strict';

/**
 * This function seed  a collection of priorities provided to it as the first
 *  argument.
 * @function
 * @param {Array|Object} priorities - Priority collection or object to seed
 * @param {Function} done - Callback when the function finished seeding data
 * @version 0.1.0
 * @since 0.1.0
 */

//  dependencies
const path = require('path');
const _ = require('lodash');
const async = require('async');
const Priority = require(path.join(__dirname, '..', 'models', 'priority'));


/**
 * Run parallel saving priorities into the database
 * @function
 * @param {Array} priorities
 * @param {Function} done
 * @version 0.1.0
 * @since 0.1.0
 */
function savePriorities(priorities, done) {

  priorities = _.map(priorities, function (priority) {
    return function (next) {
      Priority.findOneAndUpdate({
        name: priority.name
      }, priority, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }, next);
    };
  });

  // asynchronous save priorities
  async.parallel(priorities, done);
}


module.exports = function (priorities, done) {

  const defaultPriorities = [];

  if (arguments.length === 1 && _.isFunction(arguments[0])) {
    // save default priorities
    return savePriorities(defaultPriorities, arguments[0]);
  }

  priorities = _.compact(_.concat([], priorities));

  if (_.isEmpty(priorities)) {
    // save default priorities
    return savePriorities(defaultPriorities, done);
  }

  // save provided priorities
  savePriorities(priorities, done);
};