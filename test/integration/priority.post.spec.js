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

  describe('static post', function () {
    let priority;

    it('should be able to post', function (done) {
      priority = Priority.fake();

      Priority
        .post(priority, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(priority._id);
          expect(created.name).to.eql(priority.name);
          expect(created.color).to.eql(priority.color);
          done(error, created);
        });
    });
  });

  describe('instance post', function () {
    let priority;

    it('should be able to post', function (done) {
      priority = Priority.fake();

      priority
        .post(function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(priority._id);
          expect(created.name).to.eql(priority.name);
          expect(created.color).to.eql(priority.color);
          done(error, created);
        });
    });
  });
});
