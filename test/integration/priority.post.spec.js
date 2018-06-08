'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require(path.join(__dirname, '..', '..'));

describe('Priority', function () {

  let jurisdiction;

  before(function (done) {
    Jurisdiction.remove(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });

  before(function (done) {
    Priority.remove(done);
  });

  describe('static post', function () {

    let priority;

    it('should be able to post', function (done) {

      priority = Priority.fake();
      priority.jurisdiction = jurisdiction;

      Priority
        .post(priority, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(priority._id);
          expect(created.name.en).to.eql(priority.name.en);
          expect(created.color).to.eql(priority.color.toUpperCase());

          //assert jurisdiction
          expect(created.jurisdiction).to.exist;
          expect(created.jurisdiction.code)
            .to.eql(priority.jurisdiction.code);
          expect(created.jurisdiction.name)
            .to.eql(priority.jurisdiction.name);
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

  after(function (done) {
    Priority.remove(done);
  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});
