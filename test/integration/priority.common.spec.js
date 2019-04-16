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

  describe('static', () => {

    let priority;

    before(done => {
      priority = Priority.fake();
      priority.jurisdiction = jurisdiction;
      priority
        .post((error, created) => {
          priority = created;
          done(error, created);
        });
    });

    it('should be able to get default', done => {

      Priority
        .findDefault((error, priority) => {
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

  after(done => {
    Priority.deleteMany(done);
  });

  after(done => {
    Jurisdiction.deleteMany(done);
  });

});
