'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
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

  describe('get by id', () => {

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

    it('should be able to get an instance', done => {
      Priority
        .getById(priority._id, (error, found) => {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(priority._id);

          //assert jurisdiction
          expect(found.jurisdiction).to.exist;
          expect(found.jurisdiction.code)
            .to.eql(priority.jurisdiction.code);
          expect(found.jurisdiction.name)
            .to.eql(priority.jurisdiction.name);
          done(error, found);
        });
    });

    it('should be able to get with options', done => {

      const options = {
        _id: priority._id,
        select: 'color'
      };

      Priority
        .getById(options, (error, found) => {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(priority._id);
          expect(found.color).to.exist;

          //...assert selection
          const fields = _.keys(found.toObject());
          expect(fields).to.have.length(3);
          _.map([
            'name',
            'weight',
            'createdAt',
            'updatedAt'
          ], field => {
            expect(fields).to.not.include(field);
          });


          done(error, found);
        });

    });

    it('should throw if not exists', done => {
      const priority = Priority.fake();

      Priority
        .getById(priority._id, (error, found) => {
          expect(error).to.exist;
          // expect(error.status).to.exist;
          expect(error.name).to.be.equal('DocumentNotFoundError');
          expect(found).to.not.exist;
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
