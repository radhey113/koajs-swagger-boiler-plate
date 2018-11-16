const { ui } = require('swagger2-koa');

const { loadSwaggerDocumentation } = require('../services/SwaggerDocumentationService');

async function createSwaggerRouter() {
  const document = await loadSwaggerDocumentation(require.resolve('../../doc/api.yaml'));
  const swaggerRouter = ui(document, '/doc');

  return swaggerRouter;
}

module.exports = { createSwaggerRouter };
