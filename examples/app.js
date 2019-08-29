const { get, mount, start } = require('@lykmapipo/express-common');
const { connect, jsonSchema } = require('@lykmapipo/mongoose-common');
const { priorityRouter, info, apiVersion } = require('../lib');

const startHttpServer = () => {
  get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  get(`/${apiVersion}/schemas`, (request, response) => {
    const schema = jsonSchema();
    response.status(200);
    response.json(schema);
  });

  // mount routers
  mount(priorityRouter);

  // fire http serve
  start((error, env) => {
    if (error) {
      throw error;
    }
    console.log(`visit http://0.0.0.0:${env.PORT}/${apiVersion}/priorities`);
  });
};

// connect and start http server
connect(error => {
  if (error) {
    throw error;
  }
  startHttpServer();
});
