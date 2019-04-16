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

  describe('static delete', () => {

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

    it('should be able to delete', done => {
      Priority
        .del(priority._id, (error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(priority._id);
          done(error, deleted);
        });
    });


    it('should throw error if not exists', done => {
      Priority
        .del(priority._id, (error, deleted) => {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });
  });


  describe('instance delete', () => {

    let priority;

    before(done => {
      priority = Priority.fake();
      priority
        .post((error, created) => {
          priority = created;
          done(error, created);
        });
    });

    it('should be able to delete', done => {
      priority
        .del((error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(priority._id);
          done(error, deleted);
        });
    });

    it('should not throw if not exists', done => {
      priority
        .del((error, deleted) => {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(priority._id);
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
