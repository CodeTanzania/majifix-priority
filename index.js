'use strict';

/**
 * @module majifix-priority
 * @name majifix-priority
 * @version 0.1.0
 * @description A representation of majifix service request priority
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @public
 * @version 0.1.0
 * @example
 *
 * const priority = require('majifix-priority');
 *
 * ...
 *
 * priority.app.start();
 */

/* Dependencies */
const path = require('path');
const app = require('@lykmapipo/express-common');

/* Import Model */
const Priority = require(path.join(__dirname, 'lib', 'priority.model'));

/* Import Routers */
const router = require(path.join(__dirname, 'lib', 'http.router'));

/* export priority model */
exports.model = Priority;
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