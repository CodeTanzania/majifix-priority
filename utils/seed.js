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
const Priority = require(path.join(__dirname, '..', 'models', 'priority'));

module.exports = function (priorities, done) {

  priorities = _.concat([], priorities);

  Priority.create(priorities, function (error, results) {

    if (error) {

      done(error);
    }

    done(null, results);
  });
};