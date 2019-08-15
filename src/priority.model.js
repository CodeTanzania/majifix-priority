/**
 * @module Priority
 * @name Priority
 * @description A representation an entity which provides a way
 * to prioritize service and service request(issues)
 * in order of their importance.
 *
 * @requires https://github.com/CodeTanzania/majifix-jurisdiction
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction|Jurisdiction}
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
import _ from 'lodash';
import { randomColor } from '@lykmapipo/common';
import { getString, getStrings } from '@lykmapipo/env';
import { createSchema, model, ObjectId } from '@lykmapipo/mongoose-common';
import localize from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import {
  POPULATION_MAX_DEPTH,
  MODEL_NAME_PRIORITY,
  MODEL_NAME_SERVICEGROUP,
  MODEL_NAME_SERVICE,
  MODEL_NAME_SERVICEREQUEST,
  COLLECTION_NAME_PRIORITY,
  PATH_NAME_PRIORITY,
  checkDependenciesFor,
} from '@codetanzania/majifix-common';

/* constants */
const DEFAULT_LOCALE = getString('DEFAULT_L0CALE', 'en');
const OPTION_SELECT = { name: 1, color: 1 };
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = { collection: COLLECTION_NAME_PRIORITY };

/* declarations */
let locales = getStrings('LOCALES', ['en']);
locales = _.map(locales, function cb(locale) {
  const option = { name: locale };
  if (locale === DEFAULT_LOCALE) {
    option.required = true;
  }
  return option;
});

/**
 * @name PrioritySchema
 * @type {Schema}
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const PrioritySchema = createSchema(
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
      type: ObjectId,
      ref: Jurisdiction.MODEL_NAME,
      exists: { refresh: true, select: Jurisdiction.OPTION_SELECT },
      autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
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
     * @property {boolean} searchable - allow for searching
     * @property {string[]}  locales - list of supported locales
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    name: localize({
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: true,
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
      uppercase: true,
      default: () => randomColor(),
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

// ensure `unique` compound index on jurisdiction and name
// to fix unique indexes on name in case they are used in more than
// one jurisdiction with different administration
_.forEach(locales, function cb(locale) {
  const field = `name.${locale.name}`;
  PrioritySchema.index({ jurisdiction: 1, [field]: 1 }, { unique: true });
});

/*
 *------------------------------------------------------------------------------
 * Hooks
 *------------------------------------------------------------------------------
 */

PrioritySchema.pre('validate', function preValidate(next) {
  this.preValidate(next);
});

/*
 *------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @description priority schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PrioritySchema.methods.preValidate = function preValidate(done) {
  // set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor();
  }

  // continue
  done();
};

/**
 * @name beforeDelete
 * @function beforeDelete
 * @description pre delete priority logics
 * @param  {function} done callback to invoke on success or error
 *
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PrioritySchema.methods.beforeDelete = function beforeDelete(done) {
  // restrict delete if

  // collect dependencies model name
  const dependencies = [
    MODEL_NAME_SERVICEGROUP,
    MODEL_NAME_SERVICE,
    MODEL_NAME_SERVICEREQUEST,
  ];

  // path to check
  const path = PATH_NAME_PRIORITY;

  // do check dependencies
  return checkDependenciesFor(this, { path, dependencies }, done);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/**
 * @name findDefault
 * @function findDefault
 * @description find default priority
 * @param  {function} done a callback to invoke on success or failure
 * @return {Priority} default priority
 *
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
PrioritySchema.statics.findDefault = function findDefault(done) {
  // reference priority
  const Priority = this;

  // TODO use settings to set default priority
  // TODO cache in memory

  // sort priority by weight descending and take one
  Priority.findOne()
    .sort({ weight: 'asc' })
    .exec(done);
};

/* expose static constants */
PrioritySchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
PrioritySchema.statics.MODEL_NAME = MODEL_NAME_PRIORITY;
PrioritySchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/* export priority model */
export default model(MODEL_NAME_PRIORITY, PrioritySchema);
