'use strict';

/* dependencies */
const _ = require('lodash');
const faker = require('faker');

function sample() {
  return {
    name: faker.name.findName(),
    color: faker.internet.color(),
    weight: faker.random.number({
      min: 1,
      max: 10
    }),
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};