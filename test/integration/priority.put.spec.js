'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require(path.join(__dirname, '..', '..'));

describe('Priority', function () {

  let jurisdiction;

  before(function (done) {
    Jurisdiction.deleteMany(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });

  before(function (done) {
    Priority.deleteMany(done);
  });

  describe('static put', function () {

    let priority;

    before(function (done) {
      priority = Priority.fake();
      priority.jurisdiction = jurisdiction;
      priority
        .post(function (error, created) {
          priority = created;
          done(error, created);
        });

    });

    it('should be able to put', function (done) {
      priority = priority.fakeOnly('name');

      Priority
        .put(priority._id, priority, function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(priority._id);
          expect(updated.name.en).to.eql(priority.name.en);

          //assert jurisdiction
          expect(updated.jurisdiction).to.exist;
          expect(updated.jurisdiction.code)
            .to.eql(priority.jurisdiction.code);
          expect(updated.jurisdiction.name)
            .to.eql(priority.jurisdiction.name);
          done(error, updated);
        });

    });

    it('should throw error if not exists', function (done) {
      const fake = Priority.fake();

      Priority
        .put(fake._id, fake, function (error, updated) {
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
      priority = Priority.fake();

      priority
        .post(function (error, created) {
          priority = created;
          done(error, created);
        });
    });

    it('should be able to put', function (done) {
      priority = priority.fakeOnly('name');

      priority
        .put(function (error, updated) {
          expect(error).not.to.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(priority._id);
          expect(updated.name.en).to.eql(priority.name.en);
          done(error, updated);
        });
    });

    it('should not throw error if not exists', function (done) {

      priority = Priority.fake();

      priority
        .put(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(priority._id);
          done();
        });
    });

  });

  after(function (done) {
    Priority.deleteMany(done);
  });

  after(function (done) {
    Jurisdiction.deleteMany(done);
  });

});
