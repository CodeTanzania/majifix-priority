'use strict';

/**
 * Priority router specification
 *
 * @description :: Server-side router specification for Priority
 */

//dependencies
const path = require('path');
const expect = require('chai').expect;
const faker = require('faker');
const request = require('supertest');
const bodyParser = require('body-parser');
const router = require(path.join(__dirname, '..', '..', 'http', 'router'))();
const app = require('express')();


//  use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(router);

let priority;

describe('Priority Router', function () {
  it('should handle HTTP POST on /priorities', done => {
    priority = {
      name: faker.company.companyName(),
      weight: faker.random.number(3)
    };

    request(app)
      .post('/priorities')
      .send(priority)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = response.body;

        expect(created).to.exist;

        expect(created._id).to.exist;

        expect(created.name).to.be.equal(priority.name);
        expect(created.weight).to.be.equal(priority.weight);
        expect(created.color).to.exist;

        priority = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /priorities/:id', done => {

    request(app)
      .get('/priorities/' + priority._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;

        expect(found).to.exist;

        expect(found._id).to.exist;
        expect(found._id).to.eql(priority._id);

        expect(found.weight).to.be.equal(priority.weight);
        expect(found.name).to.be.equal(priority.name);

        done(error, response);

      });
  });

  it('should handle HTTP PUT on /priorities/:id', done => {
    const updates = {
      name: faker.company.companyName()
    };

    request(app)
      .put('/priorities/' + priority._id)
      .send(updates)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;

        expect(updated).to.exist;

        expect(updated._id).to.exist;

        expect(updated.name).to.be.equal(updates.name);
        expect(updated.weight).to.be.equal(priority.weight);
        expect(updated.color).to.exist;

        done(error, response);

      });
  });

  it('should handle HTTP PATCH on /priorities/:id', done => {
    const updates = {
      name: faker.company.companyName()
    };

    request(app)
      .patch('/priorities/' + priority._id)
      .send(updates)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;

        expect(updated).to.exist;

        expect(updated._id).to.exist;

        expect(updated.name).to.be.equal(updates.name);
        expect(updated.weight).to.be.equal(priority.weight);
        expect(updated.color).to.exist;

        done(error, response);

      });
  });

  it('should handle HTTP GET on /priorities', done => {
    request(app)
      .get('/priorities')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const {
          priorities,
          pages,
          count
        } = response.body;
        expect(pages).to.exist;
        expect(priorities).to.exist;
        expect(count).to.exist;

        //TODO more priorities response assertions

        done(error, response);

      });
  });

  it('should handle HTTP DELETE on /priorities/:id', done => {
    request(app)
      .delete('/priorities/' + priority._id)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (error, response) {

        expect(error).to.not.exist;
        expect(response).to.exist;

        const removed = response.body;
        expect(removed).to.exist;

        expect(removed._id).to.exist;
        expect(removed._id).to.be.eql(priority._id);

        expect(removed.weight).to.be.equal(priority.weight);
        expect(removed.name).to.exist;
        expect(removed.color).to.exist;

        done(error, response);

      });
  });
});