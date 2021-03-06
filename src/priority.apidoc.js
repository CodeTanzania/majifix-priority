/**
 * @apiDefine Priority Priority
 *
 * @apiDescription A representation an entity which provides a way
 * to prioritize service and service request(issues)
 * in order of their importance.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */

/**
 * @apiDefine Priority
 * @apiSuccess {String} _id Unique priority identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under
 * which priority belongs to
 * @apiSuccess {Object} name
 * @apiSuccess {String} name.en Unique Human readable name of
 * the priority e.g High, Low, Medium.
 * @apiSuccess {Number} weight Weight of the priority to help in ordering
 * service request(issue) based on priority.
 * @apiSuccess {String} color A color code used to differentiate a service
 * request priority visually.
 * @apiSuccess {Date} createdAt Date when priority was created
 * @apiSuccess {Date} updatedAt Date when priority was last updated
 */

/**
 * @apiDefine Priorities
 * @apiSuccess {Object[]} data List of priorities
 * @apiSuccess {String} data._id Unique priority identifier
 * @apiSuccess {String} [data.jurisdiction = undefined] jurisdiction under
 * which priority belongs to
 * @apiSuccess {Object} data.name
 * @apiSuccess {String} data.name.en Unique Human readable name of the
 * priority e.g High, Low, Medium.
 * @apiSuccess {Number} data.weight Weight of the priority to help in
 * ordering service request(issue) based on priority.
 * @apiSuccess {String} data.color A color code used to differentiate
 * a service request priority visually.
 * @apiSuccess {Date} data.createdAt Date when priority was created
 * @apiSuccess {Date} data.updatedAt Date when priority was last updated
 * @apiSuccess {Number} total Total number of priority
 * @apiSuccess {Number} size Number of priority returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest priority
 * was last modified
 *
 */

/**
 * @apiDefine PrioritySuccessResponse
 * @apiSuccessExample {json} Success-Response:
 *   {
 *       "_id": "592029e5e8dd8e00048c1816",
 *       jurisdiction: {
 *         _id: "5af36f7cdfbcfc17b0614933",
 *         code: "43138529",
 *         name: "Myanmar",
 *         color: "#837AD6"
 *       },
 *       "name": {
 *        "en": "Low"
 *       },
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
 *             "_id": "592029e5e8dd8e00048c1816",
 *             jurisdiction: {
 *               _id: "5af36f7cdfbcfc17b0614933",
 *               code: "43138529",
 *               name: "Myanmar",
 *               color: "#837AD6"
 *             },
 *             "name": {
 *              "en": Low"
 *             },
 *             "weight": 0,
 *             "color": "#1B5E20",
 *             "createdAt": "2017-05-20T11:35:01.586Z",
 *             "updatedAt": "2017-05-20T11:35:01.586Z",
 *         }
 *      ],
 *      "total": 5,
 *      "size": 1,
 *      "limit": 1,
 *      "skip": 0,
 *      "page": 1,
 *      "pages": 5,
 *      "lastModified": "Mon, 30 Apr 2018 12:33:58 GMT"
 *   }
 */

/**
 * @api {get} /priorities List Priorities
 * @apiGroup Priority
 * @apiName GetPriorities
 * @apiVersion 1.0.0
 * @apiDescription Returns a list of priorities
 * @apiUse RequestHeaders
 * @apiUse Priorities
 *
 * @apiUse RequestHeadersExample
 * @apiUse PrioritiesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {get} /priorities/schema Get Priority Schema
 * @apiVersion 1.0.0
 * @apiName GetPrioritySchema
 * @apiGroup Priority
 * @apiDescription Returns priority json schema definition
 * @apiUse RequestHeaders
 */

/**
 * @api {get} /priorities/export Export Priorities
 * @apiVersion 1.0.0
 * @apiName ExportPriorities
 * @apiGroup Priority
 * @apiDescription Export priorities as csv
 * @apiUse RequestHeaders
 */

/**
 * @api {post} /priorities Create New Priority
 * @apiGroup Priority
 * @apiName PostPriority
 * @apiVersion 1.0.0
 * @apiDescription Create new Priority
 * @apiUse RequestHeaders
 * @apiUse Priority
 *
 * @apiUse RequestHeadersExample
 * @apiUse PrioritySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {get} /priorities/:id Get Existing Priority
 * @apiGroup Priority
 * @apiName GetPriority
 * @apiVersion 1.0.0
 * @apiDescription Get existing priority
 * @apiUse RequestHeaders
 * @apiUse Priority
 *
 * @apiUse RequestHeadersExample
 * @apiUse PrioritySuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {patch} /priorities/:id Patch Existing Priority
 * @apiGroup Priority
 * @apiName  PatchPriority
 * @apiVersion 1.0.0
 * @apiDescription Patch existing priority
 * @apiUse RequestHeaders
 * @apiUse Priority
 *
 * @apiUse RequestHeadersExample
 * @apiUse PrioritySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {put} /priorities/:id Put Existing Priority
 * @apiGroup Priority
 * @apiName  PutPriority
 * @apiVersion 1.0.0
 * @apiDescription Put existing priority
 * @apiUse RequestHeaders
 * @apiUse Priority
 *
 * @apiUse RequestHeadersExample
 * @apiUse PrioritySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {delete} /priorities/:id Delete Priority
 * @apiGroup Priority
 * @apiName  DeletePriority
 * @apiVersion 1.0.0
 * @apiDescription Delete existing priority
 * @apiUse RequestHeaders
 * @apiUse Priority
 *
 * @apiUse RequestHeadersExample
 * @apiUse PrioritySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */

/**
 * @api {get} /jurisdictions/:jurisdiction/priorities List Jurisdiction Priorities
 * @apiVersion 1.0.0
 * @apiName GetJurisdictionPriorities
 * @apiGroup Priority
 * @apiDescription Returns a list of priorities of specified jurisdiction
 * @apiUse RequestHeaders
 * @apiUse Priorities
 *
 * @apiUse RequestHeadersExample
 * @apiUse PrioritiesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
