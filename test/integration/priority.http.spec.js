import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  clear as clearDb,
  expect,
  create,
} from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority, priorityRouter } from '../../src';

describe('Priority Rest API', () => {
  const jurisdiction = Jurisdiction.fake();
  const priority = Priority.fake();
  priority.set({ jurisdiction });

  const options = {
    pathSingle: '/priorities/:id',
    pathList: '/priorities/',
    pathSchema: '/priorities/schema/',
    pathExport: '/priorities/export/',
    pathJurisdiction: '/jurisdictions/:jurisdiction/priorities',
  };

  before(done => clearDb(Jurisdiction, Priority, done));

  before(() => clearHttp());

  before(done => create(jurisdiction, done));

  it('should handle HTTP POST on /priorities', done => {
    const { testPost } = testRouter(options, priorityRouter);
    testPost({ ...priority.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Priority(body);
        // expect(created.name.en).to.exist;
        expect(created._id).to.exist.and.be.eql(priority._id);
        expect(created.color).to.exist.and.be.eql(priority.color);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /priorities', done => {
    const { testGet } = testRouter(options, priorityRouter);
    testGet({ priority })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /priorities/:id', done => {
    const { testGet } = testRouter(options, priorityRouter);
    const params = { id: priority._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Priority(body);
        expect(found._id).to.exist.and.be.eql(priority._id);
        expect(found.color).to.exist.and.be.eql(priority.color.toUpperCase());
        expect(found.name.en).to.exist.and.be.eql(priority.name.en);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /jurisdictions/:jurisdiction/priorities', done => {
    const { testGet } = testRouter(options, priorityRouter);
    const params = { jurisdiction: jurisdiction._id };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /priorities/:id', done => {
    const { testPatch } = testRouter(options, priorityRouter);
    const { name } = priority.fakeOnly('name');
    const params = { id: priority._id.toString() };
    testPatch(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Priority(body);
        expect(patched._id).to.exist.and.be.eql(priority._id);
        expect(patched.color).to.exist.and.be.eql(priority.color);
        expect(patched.name.en).to.be.equal(priority.name.en);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /priorities/:id', done => {
    const { testPut } = testRouter(options, priorityRouter);
    const { name } = priority.fakeOnly('name');
    const params = { id: priority._id.toString() };
    testPut(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const put = new Priority(body);
        expect(put._id).to.exist.and.be.eql(priority._id);
        expect(put.color).to.exist.and.be.eql(priority.color.toUpperCase());
        expect(put.name.en).to.be.equal(priority.name.en);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /priorities/:id', done => {
    const { testDelete } = testRouter(options, priorityRouter);
    const params = { id: priority._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const deleted = new Priority(body);
        expect(deleted._id).to.exist.and.be.eql(priority._id);
        expect(deleted.color).to.exist.and.be.eql(priority.color);
        expect(deleted.name.en).to.be.equal(priority.name.en);
        done(error, body);
      });
  });

  it('should handle GET /priorities/schema', done => {
    const { testGetSchema } = testRouter(options, priorityRouter);
    testGetSchema().expect(200, done);
  });

  it('should handle GET /priorities/export', done => {
    const { testGetExport } = testRouter(options, priorityRouter);
    testGetExport()
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  after(() => clearHttp());

  after(done => clearDb(Jurisdiction, Priority, done));
});
