'use strict';

/* dependencies */
const _ = require('lodash');
const faker = require('faker');

function sample(n) {
  return {
    name: {
      en: faker.commerce.productName(),
      sw: faker.commerce.productName()
    },
    weight: ((n % 5) * 5)
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};
