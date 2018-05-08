'use strict';

/**
 * @module majifix-priority
 * @name majifix-priority
 * @version 0.1.0
 * @description A representation an entity which provides a way
 * to prioritize service and service request(issues)
 * in order of their importance.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @public
 * @version 0.1.0
 * @example
 *
 * const { app } = require('majifix-priority');
 *
 * ...
 *
 * app.start();
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');

/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];
const info = _.merge({}, _.pick(pkg, fields));

/* ensure models */
process.env.API_VERSION = (process.env.API_VERSION || info.version);

/* import Model */
const Priority = require(path.join(__dirname, 'lib', 'priority.model'));


/* import Routers */
const router = require(path.join(__dirname, 'lib', 'http.router'));


/* export package(module) info */
exports.info = info;

/* export priority model */
exports.Priority = Priority;


/* export priority router */
exports.router = router;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    /* bind priority router */
    app.mount(router);
    return app;
  }
});
