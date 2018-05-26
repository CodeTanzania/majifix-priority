'use strict';


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


/* dependencies */
const _ = require('lodash');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const localize = require('mongoose-locale-schema');
const actions = require('mongoose-rest-actions');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { env, schema } = require('@codetanzania/majifix-common');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* local constants */
const DEFAULT_LOCALE = env.DEFAULT_LOCALE;
const MODEL_NAME = 'Priority';
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });
const OPTION_AUTOPOPULATE = {
  select: { name: 1, color: 1 },
  maxDepth: schema.POPULATION_MAX_DEPTH
};


/* declarations */
let locales = env.LOCALES;
locales = _.map(locales, function (locale) {
  let option = { name: locale };
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
const PrioritySchema = new Schema({
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
   * @property {boolean} autoset - allow to set id from full object
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
    autoset: true,
    exists: true,
    autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
    index: true
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
    required: true,
    index: true,
    searchable: true,
    locales: locales,
    fake: {
      generator: 'commerce',
      type: 'productName',
      unique: true
    }
  }),


  /**
   * @name weight
   * @description Weight of the priority to help in ordering
   * service request(issue) based on priority.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  weight: {
    type: Number,
    index: true,
    default: 0,
    fake: true
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
   *
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    default: function () { return randomColor().toUpperCase(); },
    fake: true
  }

}, SCHEMA_OPTIONS);


/*
*------------------------------------------------------------------------------------
* Indexes
*------------------------------------------------------------------------------------
*/


//ensure `unique` compound index on jurisdiction and name
//to fix unique indexes on name in case they are used in more than
//one jurisdiction with different administration
_.forEach(locales, function (locale) {
  const field = `name.${locale.name}`;
  PrioritySchema.index({ jurisdiction: 1, [field]: 1 }, { unique: true });
});


/*
*------------------------------------------------------------------------------------
* Hooks
*------------------------------------------------------------------------------------
*/


PrioritySchema.pre('validate', function (next) {

  //set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor().toUpperCase();
  }

  next();

});


/*
*------------------------------------------------------------------------------------
* Instance
*------------------------------------------------------------------------------------
*/


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
  //TODO prevent delete if
  //1...there are service request use the priority
  done();
};


/**
 * @name afterPost
 * @function afterPost
 * @description post save priority logics
 * @param  {function} done callback to invoke on success or error
 *
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PrioritySchema.methods.afterPost = function afterPost(done) {
  //ensure jurisdiction is populated after post(save)
  const population =
    _.merge({}, { path: 'jurisdiction' }, Jurisdiction.OPTION_AUTOPOPULATE);
  this.populate(population, done);
};


/*
*------------------------------------------------------------------------------------
* Statics
*------------------------------------------------------------------------------------
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
PrioritySchema.statics.findDefault = function (done) {
  //reference priority
  const Priority = this;

  //TODO make use of default priority settings

  //sort priority by weight descending and take one
  Priority.findOne().sort({ //TODO cache in memory
    weight: 'asc'
  }).exec(done);

};


/* expose static constants */
PrioritySchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
PrioritySchema.statics.MODEL_NAME = MODEL_NAME;
PrioritySchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;


/*
*------------------------------------------------------------------------------------
* Plugins
*------------------------------------------------------------------------------------
*/


/* use mongoose rest actions*/
PrioritySchema.plugin(actions);


/* export priority model */
module.exports = mongoose.model(MODEL_NAME, PrioritySchema);
