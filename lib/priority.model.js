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
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const _ = require('lodash');
const randomColor = require('randomcolor');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/** local constants */
const DEFAULT_LOCALE = 'en';

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
   * same majifix system(or platform).
   *
   * If not available a priority is applicable to all jurisdictions.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   *
   */
  jurisdiction: {
    type: ObjectId,
    ref: 'Jurisdiction',
    autoset: true,
    exists: true,
    autopopulate: true,
    index: true
  },


  /**
   * @name name
   * @description Human readable name of the priority 
   * e.g High, Low, Medium.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  name: {
    type: String,
    // unique: true,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'commerce',
      type: 'productName'
    }
  },


  /**
   * @name weight
   * @description Weight of the priority to help in ordering 
   * service request(issue) based on priority.
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  weight: {
    type: Number,
    index: true,
    default: 0
  },


  /**
   * @name type
   * @description A color code used to differentiate a service request 
   * priority visually.
   * 
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  color: {
    type: String,
    trim: true,
    uppercase: true,
    default: randomColor()
  }

}, { timestamps: true, emitIndexErrors: true });



//Indexes

//ensure `unique` compound index on jurisdiction and name
//to fix unique indexes on name in case they are used in more than
//one jurisdiction with different administration
PrioritySchema.index({
  jurisdiction: 1,
  name: 1,
}, {
  unique: true
});



//Hooks

PrioritySchema.pre('validate', function (next) {

  //set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor();
  }

  next();

});



//Statics

/**
 * @name findDefault
 * @description find default priority
 * @param  {Function} done a callback to invoke on success or failure
 * @return {Priority}        default priority
 * @since 0.1.0
 * @version 0.1.0
 * @public
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



//Plugins

/* use mongoose rest actions*/
PrioritySchema.plugin(actions);



/* export priority model */
module.exports = mongoose.model('Priority', PrioritySchema);
