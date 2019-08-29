'use strict';

const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const expressRestActions = require('@lykmapipo/express-rest-actions');
const _ = require('lodash');
const mongooseCommon = require('@lykmapipo/mongoose-common');
const mongooseLocaleSchema = require('mongoose-locale-schema');
const actions = require('mongoose-rest-actions');
const exportable = require('@lykmapipo/mongoose-exportable');
const majifixJurisdiction = require('@codetanzania/majifix-jurisdiction');
const majifixCommon = require('@codetanzania/majifix-common');

/* constants */
const OPTION_SELECT = { name: 1, color: 1 };
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: majifixCommon.POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = { collection: majifixCommon.COLLECTION_NAME_PRIORITY };
const INDEX_UNIQUE = {
  jurisdiction: 1,
  ...mongooseLocaleSchema.localizedIndexesFor('name'),
};

/**
 * @module Priority
 * @name Priority
 * @description A representation an entity which provides a way
 * to prioritize service and service request(issues)
 * in order of their importance.
 *
 * @requires https://github.com/CodeTanzania/majifix-jurisdiction
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const PrioritySchema = mongooseCommon.createSchema(
  {
    /**
     * @name jurisdiction
     * @description jurisdiction under which this priority belongs.
     *
     * This is applicable where multiple jurisdiction(s) utilize
     * same Majifix system(or platform).
     *
     * If not available a priority is applicable to all jurisdictions.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {object} autopopulate.select - jurisdiction fields to
     * select when populating
     * @property {boolean} index - ensure database index
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    jurisdiction: {
      type: mongooseCommon.ObjectId,
      ref: majifixJurisdiction.Jurisdiction.MODEL_NAME,
      exists: {
        refresh: true,
        select: majifixJurisdiction.Jurisdiction.OPTION_SELECT,
      },
      autopopulate: majifixJurisdiction.Jurisdiction.OPTION_AUTOPOPULATE,
      index: true,
    },

    /**
     * @name name
     * @description Human readable name of the priority
     * e.g High, Low, Medium.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    name: mongooseLocaleSchema.localize({
      type: String,
      trim: true,
      index: true,
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'commerce',
        type: 'productName',
        unique: true,
      },
    }),

    /**
     * @name weight
     * @description Weight of the priority to help in ordering
     * service request(issue) based on priority.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    weight: {
      type: Number,
      index: true,
      exportable: true,
      default: 0,
      fake: true,
    },

    /**
     * @name color
     * @description A color code used to differentiate a service request
     * priority visually.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} uppercase - force upper-casing
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    color: {
      type: String,
      trim: true,
      exportable: true,
      uppercase: true,
      default: () => common.randomColor(),
      fake: true,
    },

    /**
     * @name default
     * @description Tells whether a priority is the default.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} default - default value set when none provided
     * @property {object|boolean} fake - fake data generator options
     *
     * @author lally elias <lallyelias87@gmail.com>
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * false
     *
     */
    default: {
      type: Boolean,
      index: true,
      exportable: true,
      default: false,
      fake: true,
    },
  },
  SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

/**
 * @name index
 * @description ensure unique compound index on priority name and jurisdiction
 * to force unique priority definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PrioritySchema.index(INDEX_UNIQUE, { unique: true });

/*
 *------------------------------------------------------------------------------
 * Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @description priority schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
PrioritySchema.pre('validate', function preValidate(next) {
  return this.preValidate(next);
});

/*
 *------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @description priority schema pre validation hook logic
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PrioritySchema.methods.preValidate = function preValidate(done) {
  // ensure name for all locales
  this.name = mongooseLocaleSchema.localizedValuesFor(this.name);

  // set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = common.randomColor();
  }

  // continue
  return done(null, this);
};

/**
 * @name beforeDelete
 * @function beforeDelete
 * @description pre delete priority logics
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PrioritySchema.methods.beforeDelete = function beforeDelete(done) {
  // restrict delete if

  // collect dependencies model name
  const dependencies = [
    majifixCommon.MODEL_NAME_SERVICEGROUP,
    majifixCommon.MODEL_NAME_SERVICE,
    majifixCommon.MODEL_NAME_SERVICEREQUEST,
  ];

  // path to check
  const path = majifixCommon.PATH_NAME_PRIORITY;

  // do check dependencies
  return majifixCommon.checkDependenciesFor(this, { path, dependencies }, done);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
PrioritySchema.statics.MODEL_NAME = majifixCommon.MODEL_NAME_PRIORITY;
PrioritySchema.statics.OPTION_SELECT = OPTION_SELECT;
PrioritySchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/**
 * @name findDefault
 * @function findDefault
 * @description find default priority
 * @param {Function} done a callback to invoke on success or failure
 * @returns {Priority} default priority
 *
 * @since 0.1.0
 * @version 1.0.0
 * @static
 * @deprecated
 */
PrioritySchema.statics.findDefault = done => {
  // refs
  const Priority = mongooseCommon.model(majifixCommon.MODEL_NAME_PRIORITY);

  // obtain default priority
  return Priority.getOneOrDefault({}, done);
};

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {object} seed priority to be seeded
 * @returns {object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @static
 */
PrioritySchema.statics.prepareSeedCriteria = seed => {
  const names = mongooseLocaleSchema.localizedKeysFor('name');

  const copyOfSeed = seed;
  copyOfSeed.name = mongooseLocaleSchema.localizedValuesFor(seed.name);

  const criteria = common.idOf(copyOfSeed)
    ? _.pick(copyOfSeed, '_id')
    : _.pick(copyOfSeed, 'jurisdiction', ...names);

  return criteria;
};

/**
 * @name getOneOrDefault
 * @function getOneOrDefault
 * @description Find existing priority or default based on given criteria
 * @param {object} criteria valid query criteria
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found priority or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const criteria = { _id: '...'};
 * Priority.getOneOrDefault(criteria, (error, found) => { ... });
 *
 */
PrioritySchema.statics.getOneOrDefault = (criteria, done) => {
  // normalize criteria
  const { _id, ...filters } = common.mergeObjects(criteria);
  const allowId = !_.isEmpty(_id);
  const allowFilters = !_.isEmpty(filters);

  const byDefault = common.mergeObjects({ default: true });
  const byId = common.mergeObjects({ _id });
  const byFilters = common.mergeObjects(filters);

  const or = common.compact([
    allowId ? byId : undefined,
    allowFilters ? byFilters : undefined,
    byDefault,
  ]);
  const filter = { $or: or };

  // refs
  const Priority = mongooseCommon.model(majifixCommon.MODEL_NAME_PRIORITY);

  // query
  return Priority.findOne(filter)
    .orFail()
    .exec(done);
};

/* export priority model */
const Priority = mongooseCommon.model(
  majifixCommon.MODEL_NAME_PRIORITY,
  PrioritySchema
);

/* constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
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
const router = new expressRestActions.Router({
  version: API_VERSION,
});

/**
 * @memberof PriorityHttpRouter
 * @name GetPriorities
 * @description Returns a list of priorities
 */
router.get(
  PATH_LIST,
  expressRestActions.getFor({
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
  expressRestActions.schemaFor({
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
  expressRestActions.downloadFor({
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
  expressRestActions.postFor({
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
  expressRestActions.getByIdFor({
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
  expressRestActions.patchFor({
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
  expressRestActions.putFor({
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
  expressRestActions.deleteFor({
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
  expressRestActions.getFor({
    get: (options, done) => Priority.get(options, done),
  })
);

/**
 * @name majifix-priority
 * @version 0.1.0
 * @description A representation an entity which provides a way
 * to prioritize service and service request(issues)
 * in order of their importance.
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { Priority, start } = require('@codetanzania/majifix-priority');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = common.pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @author rijkerd <richardaggrey7@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = env.apiVersion();

Object.defineProperty(exports, 'start', {
  enumerable: true,
  get: function() {
    return expressRestActions.start;
  },
});
exports.Priority = Priority;
exports.apiVersion = apiVersion;
exports.info = info;
exports.priorityRouter = router;
