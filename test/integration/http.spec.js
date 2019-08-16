import request from 'supertest';
import { app, mount } from '@lykmapipo/express-common';
import { clear, create, expect } from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Priority, apiVersion, router } from '../../src/index';

describe('Priority', () => {
  mount(router);
  describe('Rest API', () => {
    before(done => clear(done));

    let priority;
    const jurisdiction = Jurisdiction.fake();

    before(done => create(jurisdiction, done));

    it('should handle HTTP POST on /priorities', done => {
      priority = Priority.fake();
      priority.jurisdiction = jurisdiction;

      request(app)
        .post(`/${apiVersion}/priorities`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(priority)
        .expect(201)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.color).to.exist;
          expect(created.name).to.exist;

          done(error, response);
        });
    });

    it('should handle HTTP GET on /priorities', done => {
      request(app)
        .get(`/${apiVersion}/priorities`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);
        });
    });

    it('should handle HTTP GET on /priorities/:id', done => {
      request(app)
        .get(`/${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(priority._id.toString());
          expect(found.color).to.be.equal(priority.color.toUpperCase());
          expect(found.name.en).to.be.equal(priority.name.en);

          done(error, response);
        });
    });

    it('should handle HTTP GET on /jurisdictions/:jurisdiction/priorities', done => {
      request(app)
        .get(`/${apiVersion}/jurisdictions/${jurisdiction._id}/priorities`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          // assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);
        });
    });

    it('should handle HTTP PATCH on /priorities/:id', done => {
      const patch = priority.fakeOnly('name');

      request(app)
        .patch(`/${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(priority._id.toString());
          expect(patched.color).to.be.equal(priority.color.toUpperCase());
          expect(patched.name.en).to.be.equal(priority.name.en);

          done(error, response);
        });
    });

    it('should handle HTTP PUT on /priorities/:id', done => {
      const put = priority.fakeOnly('name');

      request(app)
        .put(`/${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const updated = response.body;

          expect(updated._id).to.exist;
          expect(updated._id).to.be.equal(priority._id.toString());
          expect(updated.color).to.be.equal(priority.color.toUpperCase());
          expect(updated.name.en).to.be.equal(priority.name.en);

          done(error, response);
        });
    });

    it('should handle HTTP DELETE on /priorities/:id', done => {
      request(app)
        .delete(`/${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((error, response) => {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(priority._id.toString());
          expect(deleted.color).to.be.equal(priority.color.toUpperCase());
          expect(deleted.name.en).to.be.equal(priority.name.en);

          done(error, response);
        });
    });
  });
  after(done => clear(done));
});
