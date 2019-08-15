import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { clear, create, expect } from '@lykmapipo/mongoose-test-helpers';
import { Priority } from '../../src/index';

describe('Priority', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Jurisdiction, Priority, done));

  before(done => create(jurisdiction, done));

  let priority;

  before(done => {
    priority = Priority.fake();
    priority.jurisdiction = jurisdiction;
    create(priority, done);
  });

  describe('get by id', () => {
    it('should be able to get an instance', done => {
      Priority.getById(priority._id, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(priority._id);

        // assert jurisdiction
        expect(found.jurisdiction).to.exist;
        expect(found.jurisdiction.code).to.eql(priority.jurisdiction.code);
        expect(found.jurisdiction.name).to.eql(priority.jurisdiction.name);
        done(error, found);
      });
    });

    it('should be able to get with options', done => {
      const options = {
        _id: priority._id,
        select: 'color',
      };

      Priority.getById(options, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(priority._id);
        expect(found.color).to.exist;

        // ...assert selection
        const fields = _.keys(found.toObject());
        expect(fields).to.have.length(3);
        _.map(['name', 'weight', 'createdAt', 'updatedAt'], field => {
          expect(fields).to.not.include(field);
        });

        done(error, found);
      });
    });

    it('should throw if not exists', done => {
      priority = Priority.fake();

      Priority.getById(priority._id, (error, found) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(found).to.not.exist;
        done();
      });
    });
  });

  after(done => clear(Priority, Jurisdiction, done));
});
