'use strict';
/**
 * Seed util specification
 */

const path = require('path');
const expect = require('chai').expect;
const faker = require('faker');
const seed = require(path.join(__dirname, '..', '..', '..', 'utils', 'seed'));
// const Priority = require(path.join(__dirname, '..', '..', '..', 'models',
//   'priority'));

describe('Seed function', () => {

  it('should export a function', () => {
    expect(seed).to.be.a('function');
  });

  it('should accept two arguments', () => {
    expect(seed.length).to.be.equal(2);
  });

  it('should be able to save one priority', (done) => {

    const priority = {
      name: faker.name.jobArea()
    };

    seed(priority, function (error, results) {
      expect(error).not.exist;
      expect(results).to.exist;
      expect(results).to.be.an('array');
      expect(results).to.have.lengthOf(1);
      done();
    });

  });

  it('should be able to save an array of priorities', (done) => {

    const priorities = [{
      name: faker.name.jobArea()
    }, {
      name: faker.name.jobArea()
    }];

    seed(priorities, function (error, results) {
      expect(error).not.exist;
      expect(results).to.exist;
      expect(results).to.be.an('array');
      expect(results).to.have.lengthOf(priorities.length);
      done();
    });
  });

  it.skip('should fail when priority name is empty', (done) => {
    const priority = {
      color: faker.random.alphaNumeric(6)
    };

    seed(priority, function (error, results) {
      expect(error).to.exist;
      expect(results).not.to.exist;
      done();
    });
  });
});