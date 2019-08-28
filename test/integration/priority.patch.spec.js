import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create, expect } from '@lykmapipo/mongoose-test-helpers';
import { Priority } from '../../src/index';

describe('Priority static patch', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(done));

  before(done => create(jurisdiction, done));

  let priority;

  before(done => {
    priority = Priority.fake();
    priority.jurisdiction = jurisdiction;
    create(priority, done);
  });

  it('should be able to patch', done => {
    priority = priority.fakeOnly('name');

    Priority.patch(priority._id, priority, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(priority._id);
      expect(updated.name.en).to.eql(priority.name.en);

      // assert jurisdiction
      expect(updated.jurisdiction).to.exist;
      expect(updated.jurisdiction.code).to.eql(priority.jurisdiction.code);
      expect(updated.jurisdiction.name).to.eql(priority.jurisdiction.name);
      done(error, updated);
    });
  });

  it('should throw error if not exists', done => {
    const fake = Priority.fake().toObject();

    Priority.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).not.to.exist;
      done();
    });
  });

  after(done => clear(done));
});

describe('Priority Instance patch', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(done));

  before(done => create(jurisdiction, done));

  let priority;

  before(done => {
    priority = Priority.fake();
    priority.post((error, created) => {
      priority = created;
      done(error, created);
    });
  });

  it('should be able to patch', done => {
    priority = priority.fakeOnly('name');

    priority.patch((error, updated) => {
      expect(error).not.to.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(priority._id);
      expect(updated.name).to.eql(priority.name);
      done(error, updated);
    });
  });

  it('should not throw error if not exists', done => {
    priority = Priority.fake();

    priority.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(priority._id);
      done();
    });
  });

  after(done => clear(done));
});
