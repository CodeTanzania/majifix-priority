import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create, expect } from '@lykmapipo/mongoose-test-helpers';
import { Priority } from '../../src/index';

// describe('Priority', () => {
//   const jurisdiction = Jurisdiction.fake();

//   before(done => clear(Jurisdiction, Priority, done));

//   before(done => create(jurisdiction, done));

describe('Priority Static post', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(done));

  before(done => create(jurisdiction, done));

  let priority;

  it('should be able to post', done => {
    priority = Priority.fake();
    priority.jurisdiction = jurisdiction;

    Priority.post(priority, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(priority._id);
      expect(created.name.en).to.eql(priority.name.en);
      expect(created.color).to.eql(priority.color.toUpperCase());

      // assert jurisdiction
      expect(created.jurisdiction).to.exist;
      expect(created.jurisdiction.code).to.eql(priority.jurisdiction.code);
      expect(created.jurisdiction.name).to.eql(priority.jurisdiction.name);
      done(error, created);
    });
  });

  after(done => clear(done));
});

describe('instance post', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(done));

  before(done => create(jurisdiction, done));

  let priority;

  it('should be able to post', done => {
    priority = Priority.fake();

    priority.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(priority._id);
      expect(created.name).to.eql(priority.name);
      expect(created.color).to.eql(priority.color);
      done(error, created);
    });
  });

  after(done => clear(done));
});
