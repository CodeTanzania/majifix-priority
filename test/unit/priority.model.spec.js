'use strict';

const path = require('path');
const {
  expect
} = require('chai');

/* declaration */
const Priority =
  require(path.join(__dirname, '..', '..', 'lib', 'priority.model'));


describe('Priority', function () {

  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(Priority.MODEL_NAME).to.exist;
      expect(Priority.MODEL_NAME).to.equal('Priority');
    });
  });
});
