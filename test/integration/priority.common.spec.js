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

  describe('static', function () {

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

    it('should be able to get default', function (done) {

      Priority
        .findDefault(function (error, priority) {
          expect(error).to.not.exist;
          expect(priority).to.exist;
          expect(priority._id).to.eql(priority._id);
          expect(priority.name.en).to.equal(priority.name.en);

          //assert jurisdiction
          expect(priority.jurisdiction).to.exist;
          expect(priority.jurisdiction.code)
            .to.eql(priority.jurisdiction.code);
          expect(priority.jurisdiction.name)
            .to.eql(priority.jurisdiction.name);
          done(error, priority);
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
