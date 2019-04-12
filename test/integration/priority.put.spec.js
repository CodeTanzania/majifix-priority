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

  describe('static put', () => {

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

    it('should be able to put', done => {
      priority = priority.fakeOnly('name');

      Priority
        .put(priority._id, priority, (error, updated) => {
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

    it('should throw error if not exists', done => {
      const fake = Priority.fake();

      Priority
        .put(fake._id, fake, (error, updated) => {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).not.to.exist;
          done();
        });
    });
  });

  describe('instance put', () => {
    let priority;

    before(done => {
      priority = Priority.fake();

      priority
        .post((error, created) => {
          priority = created;
          done(error, created);
        });
    });

    it('should be able to put', done => {
      priority = priority.fakeOnly('name');

      priority
        .put((error, updated) => {
          expect(error).not.to.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(priority._id);
          expect(updated.name.en).to.eql(priority.name.en);
          done(error, updated);
        });
    });

    it('should not throw error if not exists', done => {

      priority = Priority.fake();

      priority
        .put((error, updated) => {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(priority._id);
          done();
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
