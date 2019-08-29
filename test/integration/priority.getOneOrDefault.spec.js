import { expect, clear } from '@lykmapipo/mongoose-test-helpers';
import { Priority } from '../../src';

describe('Priority getOneOrDefault', () => {
  before(done => clear(done));

  let priority = Priority.fake();
  priority.default = true;

  before(done => {
    priority.post((error, created) => {
      priority = created;
      done(error, created);
    });
  });

  it('should be able to get existing by id', done => {
    const { _id } = priority;
    Priority.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(priority._id);
      done(error, found);
    });
  });

  it('should be able to get existing with criteria', done => {
    const name = priority.name.en;
    Priority.getOneOrDefault({ 'name.en': name }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(priority._id);
      done(error, found);
    });
  });

  it('should be able to get default with criteria', done => {
    Priority.getOneOrDefault({}, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(priority._id);
      done(error, found);
    });
  });

  it('should not throw if not exists', done => {
    const { _id } = Priority.fake();
    Priority.getOneOrDefault({ _id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(priority._id);
      done(error, found);
    });
  });

  after(done => clear(done));
});
