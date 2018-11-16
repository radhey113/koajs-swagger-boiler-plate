const Router = require('koa-router');

const get = require('./get');
const create = require('./create');
const remove = require('./remove');
const update = require('./update');

const categoryRouter = new Router({
  prefix: '/user',
});

categoryRouter.get('/', get);
categoryRouter.post('/', create);

categoryRouter.delete('/:id', remove);
categoryRouter.put('/:id', update);

module.exports = categoryRouter;
