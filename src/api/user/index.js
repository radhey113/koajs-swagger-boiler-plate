'use strict';

const Router = require('koa-router');

const get = require('./get');
const create = require('./create');
const remove = require('./remove');
const update = require('./update');

const userRoutes = new Router({
  prefix: '/user',
});

userRoutes.get(`/`, middlewareOperation, get);
userRoutes.post(`/`, middlewareOperation, create);

userRoutes.delete(`/:id`, middlewareOperation, remove);
userRoutes.put(`/:id`, middlewareOperation, update);

async function middlewareOperation(req, next) {
  console.log(`middleware logic here...`);
  await next();
}

module.exports = userRoutes;
