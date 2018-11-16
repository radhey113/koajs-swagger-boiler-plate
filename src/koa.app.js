const Koa = require('koa');
const koaBody = require('koa-body');
const serve = require('koa-static-server');
const cors = require('@koa/cors');

const application = require('./application');
const conf = require('./conf');
const log = require('./log');

const categoryRouter = require('./api/user');

// Swagger documentation:
const { createSwaggerRouter } = require('./api/swagger-ui');

const runApp = async () => {
  const app = new Koa();

  app.use(cors({ credentials: true }));
  app.use(koaBody());

  app.use(categoryRouter.routes());
  app.use(categoryRouter.allowedMethods());

  const swaggerRouter = await createSwaggerRouter();
  app.use(swaggerRouter);
  app.use(serve({ rootDir: 'static', rootPath: '/static' }));

  // Start applicatoin
  const start = application.initializeLayer('WebServer', {
    initialize() {  
      return new Promise((resolve, reject) => {
        const server = app.listen(conf.PORT, error => {
          if (error) {
            return reject(error);
          }

          log.info(`EPlus Notification API started at port ${conf.PORT}`);
          resolve(server);
        });
      });
    }
  });

  start();
};

module.exports = { runApp };
