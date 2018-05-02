'use strict';

/**
 * @module majifix-priority
 * @apiDefine Priority Priority
 *
 * @apiDescription A representation of priority for a service request in majifix
 *
 * @see {@link http://apidocjs.com/}
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */

/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;

/* local  constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';

const Priority = require(path.join(__dirname, 'priority.model'));
const router = new Router({
  version: API_VERSION
});


/* expose priority model*/
Object.defineProperty(router, 'Model', {
  get() {
    return Priority;
  }
});


router.get('/priorities', function getPriorities(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery);

  Priority
    .get(options, function onGetPriorities(error, results) {

      // forward error
      if (error) {
        next(error);
      }
      //   handle response
      else {
        response.status(200);
        response.json(results);
      }

    });
});


router.post('/priorities', function postPriority(request, response, next) {

  //   obtain request body
  const body = _.merge({}, request.body);

  Priority.post(body, function onPostPriority(error, created) {

    // forward error
    if (error) {
      next(error);
    }
    // handle response
    else {
      response.status(201);
      response.json(created);
    }
  });
});


router.get('/priorities/:id', function getPriority(request, response, next) {

  // obtain request options
  const options = _.merge({}, request.mquery);

  //   obtain priority id
  options._id = request.params.id;


  Priority.getById(options, function onGetPriority(error, found) {

    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});


router.patch('/priorities/:id', function patchPriority(request, response, next) {

  // obtain priority id
  const _id = request.params.id;

  // obtain request body
  const patches = _.merge({}, request.body);

  Priority.patch(_id, patches, function onPatchPriority(error, patched) {

    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(patched);
    }
  });
});


router.put('/priorities/:id', function putPriority(request, response, next) {

  // obtain priority id
  const _id = request.params.id;

  //   obtain request body
  const updates = _.merge({}, request.body);

  Priority.put(_id, updates, function onPutPriority(error, updated) {

    // forward error
    if (error) {
      next(error);
    }
    // handle response
    else {
      response.status(200);
      response.json(updated);
    }
  });
});


router.delete('/priorities/:id', function deletePriority(request, response,
  next) {

  // obtain priority id
  const _id = request.params.id;

  Priority.del(_id, function onDeletePriority(error, deleted) {

    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(200);
      response.json(deleted);
    }
  });
});