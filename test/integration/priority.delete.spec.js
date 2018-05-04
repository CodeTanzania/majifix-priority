'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
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

  describe('static delete', function () {

    let priority;

    before(function (done) {
      const fake = Priority.fake();

      fake.post(function (error, created) {
        priority = created;
        done(error, created);
      });
    });

    it('should be able to delete', function (done) {
      Priority
        .del(priority._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(priority._id);
          done(error, deleted);
        });
    });


    it('should throw error if not exists', function (done) {
      Priority
        .del(priority._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });
  });


  describe('instance delete', function () {

    let priority;

    before(function (done) {
      const fake = Priority.fake();
      fake
        .post(function (error, created) {
          priority = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      priority
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(priority._id);
          done(error, deleted);
        });
    });

    it('should not throw if not exists', function (done) {
      priority
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(priority._id);
          done();
        });
    });

  });
});
