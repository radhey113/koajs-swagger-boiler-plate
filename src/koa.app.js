`use strict`;

const Koa = require(`koa`);
const koaBody = require(`koa-body`);
const serve = require(`koa-static-server`);
const cors = require(`@koa/cors`);

const application = require(`./application`);
const conf = require(`./common`);
const log = require(`./log`);
const dbConnection = require(`./common/db`).dbConnection;

const categoryRouter = require(`./api/user`);

// Swagger documentation:
const { createSwaggerRouter } = require(`./api/swagger-ui`);
const dbConfig = conf.db.dbConfig();

const runApp = async () => {
  const app = new Koa();

  app.use(cors({ credentials: true }));
  app.use(koaBody());
  app.use(categoryRouter.routes());
  app.use(categoryRouter.allowedMethods());

  const swaggerRouter = await createSwaggerRouter();
  app.use(swaggerRouter);
  app.use(serve({ rootDir: `static`, rootPath: `/static` }));

  // Start applicatoin
  const start = application.initializeLayer(`WebServer`, {
    initialize() {
      return new Promise((resolve, reject) => {
        const server = app.listen(dbConfig.PORT, error => {
          dbConnection();
          if (error) {
            return reject(error);
          }

          log.info(` Server started at port ${dbConfig.PORT}`);
          resolve(server);
        });
      });
    },
  });

  start();
};

module.exports = { runApp };
