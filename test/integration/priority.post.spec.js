'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Priority } = require(path.join(__dirname, '..', '..'));

describe('Priority', () => {

  let jurisdiction;

  before(done => {
    Jurisdiction.deleteMany(done);
  });

  before(done => {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post((error, created) => {
      jurisdiction = created;
      done(error, created);
    });
  });

  before(done => {
    Priority.deleteMany(done);
  });

  describe('static post', () => {

    let priority;

    it('should be able to post', done => {

      priority = Priority.fake();
      priority.jurisdiction = jurisdiction;

      Priority
        .post(priority, (error, created) => {
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

  describe('instance post', () => {

    let priority;

    it('should be able to post', done => {
      priority = Priority.fake();

      priority
        .post((error, created) => {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(priority._id);
          expect(created.name).to.eql(priority.name);
          expect(created.color).to.eql(priority.color);
          done(error, created);
        });
    });

  });

  after(done => {
    Priority.deleteMany(done);
  });

  after(done => {
    Jurisdiction.deleteMany(done);
  });

});
