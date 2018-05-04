'use strict';

// set environment to be test
process.env.NODE_ENV = 'test';

// setup mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// setup
require('chai').use(require('sinon-chai'));
require('sinon');
require('sinon-mongoose');