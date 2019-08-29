import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create, expect } from '@lykmapipo/mongoose-test-helpers';
import { Priority } from '../../src';

describe('Priority', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(done));

  before(done => create(jurisdiction, done));

  let priority;
  before(done => {
    priority = Priority.fake();
    priority.default = true;
    priority.jurisdiction = jurisdiction;
    create(priority, done);
  });

  describe('static', () => {
    it('should be able to get default', done => {
      Priority.findDefault((error, data) => {
        priority = data;
        expect(error).to.not.exist;
        expect(priority).to.exist;
        expect(priority._id).to.eql(priority._id);
        expect(priority.name.en).to.equal(priority.name.en);

        // assert jurisdiction
        expect(priority.jurisdiction).to.exist;
        expect(priority.jurisdiction.code).to.eql(priority.jurisdiction.code);
        expect(priority.jurisdiction.name).to.eql(priority.jurisdiction.name);
        done(error, priority);
      });
    });
  });

  after(done => clear(done));
});
