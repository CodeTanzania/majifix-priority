'use strict';

/* dependencies */
const path = require('path');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const {
  Priority
} = require(path.join(__dirname, '..', '..'));

describe('Priority', function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/majifix-priority', done);
  });

  before(function (done) {
    Priority.remove(done);
  });

  after(function (done) {
    Priority.remove(done);
  });

  describe('static put', function () {
    let priority;

    before(function (done) {
      const fake = Priority.fake();

      fake.post(function (error, created) {
        priority = created;
        done(error, created);
      });
    });

    it('should be able to put', function (done) {
      priority = priority.fakeOnly('name');

      Priority.put(priority._id, priority, function (error,
        updated) {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(priority._id);
        expect(updated.name).to.eql(priority.name);
        done(error, updated);
      });
    });

    it('should throw error if not exists', function (done) {
      const fake = Priority.fake();

      Priority.put(fake._id, fake, function (error, updated) {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(updated).not.to.exist;
        done();
      });
    });
  });

  describe('instance put', function () {
    let priority;

    before(function (done) {
      const fake = Priority.fake();

      fake.post(function (error, created) {
        priority = created;
        done(error, created);
      });
    });

    it('should be able to put', function (done) {
      priority = priority.fakeOnly('name');

      priority.put(function (error, updated) {
        expect(error).not.to.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(priority._id);
        expect(updated.name).to.eql(priority.name);
        done(error, updated);
      });
    });

    it('should not throw error if not exists', function (done) {

      priority = Priority.fake();

      priority.put(function (error, updated) {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(priority._id);
        done();
      });
    });
  });
});
