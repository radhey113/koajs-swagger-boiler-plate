`use strict`;

const Koa = require(`koa`);
const koaBody = require(`koa-body`);
const serve = require(`koa-static-server`);
const cors = require(`@koa/cors`);

const conf = require(`./common`);
const log = require(`./log`);
const dbConnection = require(`./common/db`).dbConnection;

const userRoutes = require(`./api/user`);

// Swagger documentation:
const { createSwaggerRouter } = require(`./api/swagger-ui`);
const dbConfig = conf.db.dbConfig();

const runApp = async () => {
  const app = new Koa();

  app.use(cors({ credentials: true }));
  app.use(koaBody());
  app.use(userRoutes.routes());
  app.use(userRoutes.allowedMethods());

  const swaggerRouter = await createSwaggerRouter();
  app.use(swaggerRouter);
  app.use(serve({ rootDir: `static`, rootPath: `/static` }));

  // Start applicatoin
  const startServer = () => {
    app.listen(dbConfig.PORT, error => {
      if (error) {
        log.error(`Server Error:  ${error}`);
        return;
      }
      dbConnection();
      log.info(`Server started at port: ${dbConfig.PORT}`);
    });
  };

  startServer();
};

module.exports = { runApp };
