import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';
import Priority from './priority.model';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/priorities/:id';
const PATH_LIST = '/priorities';
const PATH_EXPORT = '/priorities/export';
const PATH_SCHEMA = '/priorities/schema/';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/priorities';

/**
 * @name PriorityHttpRouter
 * @namespace PriorityHttpRouter
 *
 * @description A representation an entity which provides a way
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
const router = new Router({
  version: API_VERSION,
});

/**
 * @memberof PriorityHttpRouter
 * @name GetPriorities
 * @description Returns a list of priorities
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Priority.get(options, done),
  })
);

/**
 * @name GetPrioritySchema
 * @memberof PriorityHttpRouter
 * @description Returns priority json schema definition
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Priority.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportPriorities
 * @memberof PriorityHttpRouter
 * @description Export priorities as csv
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (options, done) => {
      const fileName = `priorities_exports_${Date.now()}.csv`;
      const readStream = Priority.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostPriority
 * @memberof PriorityHttpRouter
 * @description Create new Priority
 */
router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => Priority.post(body, done),
  })
);

/**
 * @name GetPriority
 * @memberof PriorityHttpRouter
 * @description Get existing priority
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => Priority.getById(options, done),
  })
);

/**
 * @name PatchPriority
 * @memberof PriorityHttpRouter
 * @description Patch existing priority
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (options, done) => Priority.patch(options, done),
  })
);

/**
 * @name PutPriority
 * @memberof PriorityHttpRouter
 * @description Put existing priority
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (options, done) => Priority.put(options, done),
  })
);

/**
 * @name DeletePriority
 * @memberof PriorityHttpRouter
 * @description Delete existing priority
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (options, done) => Priority.del(options, done),
    soft: true,
  })
);

/**
 * @name GetJurisdictionPriorities
 * @memberof PriorityHttpRouter
 * @description Returns a list of priorities of specified jurisdiction
 */
router.get(
  PATH_JURISDICTION,
  getFor({
    get: (options, done) => Priority.get(options, done),
  })
);

/* expose router */
export default router;
