import { pkg } from '@lykmapipo/common';
import _ from 'lodash';
import { getString, getStrings } from '@lykmapipo/env';
import { Router } from '@lykmapipo/express-common';
import async from 'async';
import randomColor from 'randomcolor';
import mongoose from 'mongoose';
import localize from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import { schema, models } from '@codetanzania/majifix-common';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';

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
var Priority = mongoose.model(PRIORITY_MODEL_NAME, PrioritySchema);

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

/* local  constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_LIST = '/priorities';
const PATH_SINGLE = '/priorities/:id';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/priorities';

/* declarations */
const router = new Router({
  version: API_VERSION,
});

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
router.get(PATH_LIST, function getPriorities(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  Priority.get(options, function onGetPriorities(error, results) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
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
router.post(PATH_LIST, function postPriority(request, response, next) {
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
router.get(PATH_SINGLE, function getPriority(request, response, next) {
  // obtain request options
  const options = _.merge({}, request.mquery);

  // obtain priority id
  options._id = request.params.id; // eslint-disable-line no-underscore-dangle

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
router.patch(PATH_SINGLE, function patchPriority(request, response, next) {
  // obtain priority id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

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
router.put(PATH_SINGLE, function putPriority(request, response, next) {
  // obtain priority id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

  // obtain request body
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
router.delete(PATH_SINGLE, function deletePriority(request, response, next) {
  // obtain priority id
  const _id = request.params.id; // eslint-disable-line no-underscore-dangle

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
router.get(PATH_JURISDICTION, function getPriorities(request, response, next) {
  // obtain request options
  const { jurisdiction } = request.params;
  const filter = jurisdiction ? { filter: { jurisdiction } } : {}; // TODO support parent and no jurisdiction
  const options = _.merge({}, filter, request.mquery);

  Priority.get(options, function onGetPriorities(error, found) {
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
 * const { app } = require('@codetanzania/majifix-priority');
 *
 * ...
 *
 * app.start();
 */

const info = pkg(
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

// extract api version
const apiVersion = router.version;

export { Priority, apiVersion, info, router };
