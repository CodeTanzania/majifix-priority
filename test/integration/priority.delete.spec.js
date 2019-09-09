import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create, expect } from '@lykmapipo/mongoose-test-helpers';
import { Priority } from '../../src';

describe('Priority Static Delete', () => {
  before(done => clear(done));

  const jurisdiction = Jurisdiction.fake();

  before(done => create(jurisdiction, done));

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

  after(done => clear(done));
});

describe('Priority Instance delete', () => {
  before(done => clear(done));
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

  after(done => clear(done));
});
