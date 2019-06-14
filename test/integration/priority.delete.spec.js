/* dependencies */
import { expect } from 'chai';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Priority } from '../../src/index';

describe('Priority', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, Priority, done));

  before(done => create(jurisdiction, done));

  describe('static delete', () => {
    let priority;

    before(done => {
      priority = Priority.fake();
      priority.jurisdiction = jurisdiction;
      create(priority, done);
    });

    it('should be able to delete', done => {
      Priority.del(priority._id, (error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(priority._id);
        done(error, deleted);
      });
    });

    it('should throw error if not exists', done => {
      Priority.del(priority._id, (error, deleted) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(deleted).to.not.exist;
        done();
      });
    });
  });

  describe('instance delete', () => {
    let priority;

    before(done => {
      priority = Priority.fake();
      priority.post((error, created) => {
        priority = created;
        done(error, created);
      });
    });

    it('should be able to delete', done => {
      priority.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(priority._id);
        done(error, deleted);
      });
    });

    it('should not throw if not exists', done => {
      priority.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(priority._id);
        done();
      });
    });
  });

  after(done => clear(Jurisdiction, Priority, done));
});
