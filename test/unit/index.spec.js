'use strict';

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const expect = require('chai').expect;
const index = require(path.join('..', '..', 'index'));

// library index specifications
describe('Index', () => {

  it('should return a function when required', () => {
    expect(index).to.be.a('function');
  });

  it('should retun an object when called', () => {
    const library = index();
    expect(library).to.be.an('object');
  });

  it('should have model property which is a mongoose Model instance', () => {
    const library = index();
    expect(library).to.contain.key('model');
    expect(library.model.prototype).to.be.instanceOf(mongoose.Model);
  });

  /**
   * Testing  express Router
   * @see {@link https://stackoverflow.com/questions/38926399/mocha-approach-to-testing-instance-of-express-router}
   */
  it('should have router property which is an express Router istance', () => {
    const library = index();
    const priorityRouter = library.router;
    expect(library).to.contain.key('router');
    expect(Object.getPrototypeOf(priorityRouter)).to.equal(express.Router);
  });

  it('should have seed property which is a function', () => {
    const library = index();
    expect(library).to.contain.keys('seed');
    expect(library.seed).to.be.a('function');
  });
});