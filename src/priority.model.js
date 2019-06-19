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
import _ from 'lodash';
import async from 'async';
import randomColor from 'randomcolor';
import mongoose from 'mongoose';
import localize from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import { schema, models } from '@codetanzania/majifix-common';
import { getString, getStrings } from '@lykmapipo/env';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/* local constants */
const DEFAULT_LOCALE = getString('DEFAULT_L0CALE', 'en');
const JURISDICTION_PATH = 'jurisdiction';
const SCHEMA_OPTIONS = { timestamps: true, emitIndexErrors: true };
const OPTION_AUTOPOPULATE = {
  select: { name: 1, color: 1 },
  maxDepth: schema.POPULATION_MAX_DEPTH,
};
const {
  PRIORITY_MODEL_NAME,
  SERVICEGROUP_MODEL_NAME,
  SERVICE_MODEL_NAME,
  SERVICEREQUEST_MODEL_NAME,
  getModel,
} = models;

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
const PrioritySchema = new Schema(
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
      exists: true,
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
      required: true,
      index: true,
      searchable: true,
      locales,
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
      default() {
        return randomColor().toUpperCase();
      },
      fake: true,
    },
  },
  SCHEMA_OPTIONS
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

PrioritySchema.pre('validate', function cb(next) {
  // set default color if not set
  if (_.isEmpty(this.color)) {
    this.color = randomColor().toUpperCase();
  }

  next();
});

/*
 *------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------
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
  // restrict delete if

  async.parallel(
    {
      // 1...there are service groups use the priority
      serviceGroup: function checkServiceGroupDependency(next) {
        // get service group model
        const ServiceGroup = getModel(SERVICEGROUP_MODEL_NAME);

        // check service group dependency
        if (ServiceGroup) {
          ServiceGroup.count(
            { priority: this._id }, // eslint-disable-line no-underscore-dangle
            function cb(error, count) {
              let cbError = error;
              // warning can not delete
              if (count && count > 0) {
                const errorMessage = `Fail to Delete. ${count} service groups depend on it`;
                cbError = new Error(errorMessage);
              }

              // ensure error status
              if (cbError) {
                cbError.status = 400;
              }

              // return
              next(cbError, this);
            }.bind(this)
          );
        }

        // continue
        else {
          next();
        }
      }.bind(this),

      // 1...there are services use the priority
      service: function checkServiceDependency(next) {
        // get service model
        const Service = getModel(SERVICE_MODEL_NAME);

        // check service dependency
        if (Service) {
          Service.count(
            { priority: this._id }, // eslint-disable-line no-underscore-dangle
            function cb(error, count) {
              let cbError = error;
              // warning can not delete
              if (count && count > 0) {
                const errorMessage = `Fail to Delete. ${count} services depend on it`;
                cbError = new Error(errorMessage);
              }

              // ensure error status
              if (cbError) {
                cbError.status = 400;
              }

              // return
              next(cbError, this);
            }.bind(this)
          );
        }

        // continue
        else {
          next();
        }
      }.bind(this),

      // 1...there are service request use the priority
      serviceRequest: function checkServiceRequestDependency(next) {
        // get service request model
        const ServiceRequest = getModel(SERVICEREQUEST_MODEL_NAME);

        // check service request dependency
        if (ServiceRequest) {
          ServiceRequest.count(
            { priority: this._id }, // eslint-disable-line no-underscore-dangle
            function cb(error, count) {
              let cbError = error;
              // warning can not delete
              if (count && count > 0) {
                const errorMessage = `Fail to Delete. ${count} service requests depend on it`;
                cbError = new Error(errorMessage);
              }

              // ensure error status
              if (cbError) {
                cbError.status = 400;
              }

              // return
              next(cbError, this);
            }.bind(this)
          );
        }

        // continue
        else {
          next();
        }
      }.bind(this),
    },
    function cb(error) {
      done(error, this);
    }
  );
};

/**
 * @name beforePost
 * @function beforePost
 * @description pre save priority logics
 * @param  {function} done callback to invoke on success or error
 *
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
PrioritySchema.methods.beforePost = function beforePost(done) {
  // ensure jurisdiction is pre loaded before post(save)
  const jurisdictionId = this.jurisdiction
    ? this.jurisdiction._id // eslint-disable-line no-underscore-dangle
    : this.jurisdiction;

  // prefetch existing jurisdiction
  if (jurisdictionId) {
    Jurisdiction.getById(
      jurisdictionId,
      function cb(error, jurisdiction) {
        // assign existing jurisdiction
        if (jurisdiction) {
          this.jurisdiction = jurisdiction;
        }

        // return
        done(error, this);
      }.bind(this)
    );
  }

  // continue
  else {
    done();
  }
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
  // ensure jurisdiction is populated after post(save)
  const population = _.merge(
    {},
    { path: JURISDICTION_PATH },
    Jurisdiction.OPTION_AUTOPOPULATE
  );
  this.populate(population, done);
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
PrioritySchema.statics.MODEL_NAME = PRIORITY_MODEL_NAME;
PrioritySchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */

/* use mongoose rest actions */
PrioritySchema.plugin(actions);

/* export priority model */
export default mongoose.model(PRIORITY_MODEL_NAME, PrioritySchema);