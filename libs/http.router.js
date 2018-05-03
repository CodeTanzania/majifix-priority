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

/**
 * @apiDefine Priority
 * @apiSuccess {ObjectId}   _id
 *        Unique priority identifier
 * @apiSuccess {ObjectId} [jurisdiction = undefined]
 *        jurisdiction under which priority belongs to
 * @apiSuccess {String}     name
 *        Unique Human readable name of the priority e.g High, Low, Medium.
 * @apiSuccess {Number}     weight
 *        Weight of the priority to help in ordering service request(issue)
 *        based on priority.
 * @apiSuccess {String}     color
 *        A color code used to differentiate a service request priority visually.
 * @apiSuccess {Date}  createdAt
 *        Date when priority was created
 * @apiSuccess {Date}  updatedAt
 *        Date when priority was last updated
 * @apiSuccess {Number}     pages
 *        Number of results pages
 * @apiSuccess {Number}     count
 *        Number of priority results in the current json response
 * @apiSuccess {Number} total Total number of priorities
 * @apiSuccess {Number} size
 *        Number of priorities returned
 * @apiSuccess {Number} limit
 *        Query limit used
 * @apiSuccess {Number} skip
 *        Query skip/offset used
 * @apiSuccess {Number} page
 *        Page number
 * @apiSuccess {Number} pages
 *        Total number of pages
 * @apiSuccess {Date} lastModified
 *        Date and time at which latest account was last modified
 */

/**
 * @apiDefine Priorities
 * @apiSuccess {Object[]}   data
 *        List of priorities
 * @apiSuccess {ObjectId}   data._id
 *        Unique priority identifier
 * @apiSuccess {ObjectId} [data.jurisdiction = undefined]
 *        jurisdiction under which priority belongs to
 * @apiSuccess {String}   jurisdiction
 * @apiSuccess {String}     data.name
 *        Unique Human readable name of the priority e.g High, Low, Medium.
 * @apiSuccess {Number}     data.weight
 *        Weight of the priority to help in ordering service request(issue)
 *        based on priority.
 * @apiSuccess {String}     data.color
 *        A color code used to differentiate a service request priority visually.
 * @apiSuccess {Date}  data.createdAt
 *        Date when priority was created
 * @apiSuccess {Date}  data.updatedAt
 *        Date when priority was last updated
 * @apiSuccess {Number}     pages
 *        Number of results pages
 * @apiSuccess {Number}     count
 *        Number of priority results in the current json response
 * @apiSuccess {Number} total Total number of priorities
 * @apiSuccess {Number} size
 *        Number of priorities returned
 * @apiSuccess {Number} limit
 *        Query limit used
 * @apiSuccess {Number} skip
 *        Query skip/offset used
 * @apiSuccess {Number} page
 *        Page number
 * @apiSuccess {Number} pages
 *        Total number of pages
 * @apiSuccess {Date} lastModified
 *        Date and time at which latest account was last modified
 */


/**
 * @apiDefine PrioritySuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "_id": "592029e5e8dd8e00048c1816",
 *       "name": "Low",
 *       "weight": 0,
 *       "color": "#1B5E21",
 *       "createdAt": "2017-05-20T11:35:01.059Z",
 *       "updatedAt": "2017-05-20T11:35:01.059Z",
 *    }
 */

/**
 * @apiDefine PrioritiesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "data": [
 *           {
 *             "name": "Low",
 *             "weight": 0,
 *             "color": "#1B5E20",
 *             "_id": "592029e5e8dd8e00048c1816",
 *             "createdAt": "2017-05-20T11:35:01.586Z",
 *             "updatedAt": "2017-05-20T11:35:01.586Z",
 *         },
 *          {
 *              "name": "Normal",
 *              "weight": 5,
 *              "color": "#4CAF50",
 *              "_id": "592029e5e8dd8e00048c1817",
 *              "createdAt": "2017-05-20T11:35:01.601Z",
 *              "updatedAt": "2017-05-20T11:35:01.601Z",
 *          },
 *          {
 *             "name": "Medium",
 *             "weight": 10,
 *             "color": "#FFC107",
 *             "_id": "592029e5e8dd8e00048c1818",
 *             "createdAt": "2017-05-20T11:35:01.615Z",
 *             "updatedAt": "2017-05-20T11:35:01.615Z",
 *         },
 *         {
 *             "name": "High",
 *             "weight": 15,
 *             "color": "#FF9800",
 *             "_id": "592029e5e8dd8e00048c1819",
 *             "createdAt": "2017-05-20T11:35:01.625Z",
 *             "updatedAt": "2017-05-20T11:35:01.625Z",
 *         },
 *         {
 *             "name": "Critical",
 *             "weight": 20,
 *             "color": "#F44336",
 *             "_id": "592029e5e8dd8e00048c181a",
 *             "createdAt": "2017-05-20T11:35:01.636Z",
 *             "updatedAt": "2017-05-20T11:35:01.636Z",
 *         }
 *      ],
 *      "total": 5,
 *      "size": 5,
 *      "limit": 10,
 *      "skip": 0,
 *      "page": 1,
 *      "pages": 1,
 *      "lastModified": "Mon, 30 Apr 2018 12:33:58 GMT"
 *   }
 */

/**
 * @apiDefine JwtError
 * @apiError  JWTExpired                   Authorization token has expired
 */

/**
 * @apiDefine AuthorizationHeaderError
 * @apiError  AuthorizationHeaderRequired  Authorization header is required
 */

/**
 * @apiDefine AuthorizationHeaderErrorExample
 * @apiErrorExample   {json} Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"Authorization header required",
 *      "error":{}
 *    }
 */

/**
 * @apiDefine JWTErrorExample
 * @apiErrorExample  {json}   Error-Response:
 *    HTTP/1.1 403 Forbidden
 *    {
 *      "success":false,
 *      "message :"jwt expired",
 *      "error":{}
 *    }
 */

/**
 * @apiDefine RequestHeaders
 *
 * @apiHeader {string}  [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 *
 * @see {@link http://apidocjs.com/}
 * @author Benson Maruchu <benmaruchu@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/**
 * @apiDefine RequestHeadersExample
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 *
 * @see {@link http://apidocjs.com/}
 * @author Benson Maruchu <benmaruchu@mail.com>
 * @since  0.1.0
 * @version 0.1.0
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


/**
 * @api {get} /priorities List Priorities
 * @apiGroup Priority
 * @apiName GetPriorities
 * @apiVersion 1.0.0
 *
 * @apiDescription Returns a list of priorities
 *
 * @apiUse RequestHeaders
 *
 * @apiUse Priorities
 *
 * @apiExample {curl} Example Usage:
 * curl -i http://majifix-priority.herokuapp.com/v1.0.0/priorities
 *
 * @apiUse RequestHeadersExample
 *
 * @apiUse PrioritiesSuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
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


/**
 * @api {post} /priorities Create New Priority
 * @apiGroup Priority
 * @apiName PostPriority
 * @apiVersion 1.0.0
 *
 * @apiDescription Create new Priority
 *
 * @apiUse RequestHeaders
 *
 * @apiUse Priority
 *
 * @apiExample {curl} curl example:
 *    curl -i https://majifix-priority.herokuapp.com/v1.0.0/priorities
 *
 * @apiUse RequestHeadersExample
 *
 * @apiUse PrioritySuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
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


/**
 * @api {get}   /priorities/:id   Get Existing Priority
 * @apiGroup Priority
 * @apiName GetPriority
 * @apiVersion 0.1.0
 *
 * @apiDescription Get existing priority
 *
 * @apiUse RequestHeaders
 *
 * @apiUse Priority
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-priority.herokuapp.com/v1.0.0/priorities
 *
 * @apiUse RequestHeadersExample
 *
 * @apiUse PrioritySuccessResponse
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
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


/**
 * @api {patch}   /priorities/:id Patch Existing Priority
 * @apiGroup Priority
 * @apiName  PatchPriority
 * @apiVersion 1.0.0
 *
 * @apiDescription Patch existing priority
 *
 * @apiUse RequestHeaders
 *
 * @apiUse Priority
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse RequestHeadersExample
 *
 * @apiUse PrioritySuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
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


/**
 * @api {put}   /priorities/:id Put Existing Priority
 * @apiGroup Priority
 * @apiName  PutPriority
 * @apiVersion 1.0.0
 *
 * @apiDescription Put existing priority
 *
 * @apiUse RequestHeaders
 *
 * @apiUse Priority
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse RequestHeadersExample
 *
 * @apiUse PrioritySuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
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


/**
 * @api {delete}  /priorities/:id  Delete Priority
 * @apiGroup Priority
 * @apiName  DeletePriority
 * @apiVersion 1.0.0
 *
 * @apiDescription Delete existing priority
 *
 * @apiUse RequestHeaders
 *
 * @apiUse Priority
 *
 * @apiExample {curl} curl:
 *    curl -i https://majifix-account.herokuapp.com/v1.0.0/accounts
 *
 * @apiUse RequestHeadersExample
 *
 * @apiUse PrioritySuccessResponse
 *
 * @apiUse JWTError
 *
 * @apiUse JWTErrorExample
 *
 * @apiUse AuthorizationHeaderError
 *
 * @apiUse AuthorizationHeaderErrorExample
 */
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