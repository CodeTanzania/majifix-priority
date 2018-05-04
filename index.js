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
const app = require('@lykmapipo/express-common');


/* import Model */
const Priority = require(path.join(__dirname, 'lib', 'priority.model'));


/* import Routers */
const router = require(path.join(__dirname, 'lib', 'http.router'));


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
