'use strict';

const Router = require('koa-router');

const get = require('./get');
const create = require('./create');
const remove = require('./remove');
const update = require('./update');

const categoryRouter = new Router({
  prefix: '/user',
});

categoryRouter.get(`/`, middlewareOperation, get);
categoryRouter.post(`/`, middlewareOperation, create);

categoryRouter.delete(`/:id`, middlewareOperation, remove);
categoryRouter.put(`/:id`, middlewareOperation, update);

async function middlewareOperation(req, next) {
  console.log(`middleware logic here...`);
  await next();
}

module.exports = categoryRouter;
