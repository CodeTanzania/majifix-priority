'use strict';

/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const {
  Priority,
  apiVersion,
  app
} = require(path.join(__dirname, '..', '..'));


describe('Priority', function () {

  describe('Rest API', function () {

    after(function (done) {
      Priority.remove(done);
    });

    let priority;

    it('should handle HTTP POST on /priorities', function (done) {

      priority = Priority.fake();

      request(app)
        .post(`/v${apiVersion}/priorities`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(priority)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.color).to.exist;
          expect(created.name).to.exist;

          done(error, response);

        });

    });

    it('should handle HTTP GET on /priorities', function (done) {

      request(app)
        .get(`/v${apiVersion}/priorities`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert payload
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

    it('should handle HTTP GET on /priorities/id:', function (done) {

      request(app)
        .get(`/v${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
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

    it('should handle HTTP PATCH on /priorities/id:', function (done) {

      const patch = priority.fakeOnly('name');

      request(app)
        .patch(`/v${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end(function (error, response) {
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

    it('should handle HTTP PUT on /priorities/id:', function (done) {

      const put = priority.fakeOnly('name');

      request(app)
        .put(`/v${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end(function (error, response) {
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

    it('should handle HTTP DELETE on /priorities/:id', function (done) {

      request(app)
        .delete(`/v${apiVersion}/priorities/${priority._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
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

});
