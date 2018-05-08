'use strict';


/**
 * @module Priority
 * @name Priority
 * @description A representation an entity which provides a way
 * to prioritize service and service request(issues)
 * in order of their importance.
 *
 * @see {@link Service}
 * @see {@link ServiceRequest}
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const Priority = mongoose.model('Priority');
 *
 * Priority.findOne(<criteria>).exec(done);
 * Priority.findDefault(done);
 */


/* dependencies */
const _ = require('lodash');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const localize = require('mongoose-locale-schema');
const { Jurisdiction } = require('majifix-jurisdiction');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/* local constants */
const DEFAULT_LOCALE = (process.env.DEFAULT_LOCALE || 'en');
const LOCALES = [DEFAULT_LOCALE];
const MODEL_NAME = 'Priority';


/* declarations */
let locales = _.get(process, 'env.LOCALES', '').split(',');
locales = ([].concat(LOCALES).concat(locales));
locales = _.compact(locales);
locales = _.uniq(locales);
locales = _.map(locales, function (locale) {
  let option = { name: locale };
  if (locale === DEFAULT_LOCALE) {
    option.required = true;
  }
  return option;
});

//TODO review if priority differ between jurisdictions
//TODO implement priority in service request to expose list of applicable
//priority


/**
 * @name PrioritySchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
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
   * @type {Object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {object} autopopulate.select - jurisdiction fields to
   * select when populating
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   *
   */
  jurisdiction: {
    type: ObjectId,
    ref: Jurisdiction.MODEL_NAME,
    autoset: true,
    exists: true,
    autopopulate: {
      select: { code: 1, name: 1 }
    },
    index: true
  },


  /**
   * @name name
   * @description Human readable name of the priority
   * e.g High, Low, Medium.
   *
   * @type {Object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {array}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  name: localize({
    type: String,
    // unique: true,
    required: true,
    trim: true,
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
   * @type {Object}
   * @property {object} type - schema(data) type
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
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
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    default: function () { return randomColor().toUpperCase(); },
    fake: true
  }

}, {
    timestamps: true,
    emitIndexErrors: true
  });



//Indexes

//ensure `unique` compound index on jurisdiction and name
//to fix unique indexes on name in case they are used in more than
//one jurisdiction with different administration
_.forEach(locales, function (locale) {
  const field = `name.${locale.name}`;
  PrioritySchema.index({ jurisdiction: 1, [field]: 1 }, { unique: true });
});



//Hooks

PrioritySchema.pre('validate', function (next) {

  //set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor().toUpperCase();
  }

  next();

});



//Statics

/**
 * @name findDefault
 * @function findDefault
 * @description find default priority
 * @param  {Function} done a callback to invoke on success or failure
 * @return {Priority}        default priority
 * @since 0.1.0
 * @version 0.1.0
 * @instance
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

// set locale
PrioritySchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
PrioritySchema.statics.MODEL_NAME = MODEL_NAME;



//Plugins

/* use mongoose rest actions*/
PrioritySchema.plugin(actions);



/* export priority model */
module.exports = mongoose.model(MODEL_NAME, PrioritySchema);
