const log = require('../../log');
const createCategory = require('../../services/user/create');
// const { withSqlConnection } = require('../../common/sql');

async function create(ctx, next) {
  try {
    console.log(ctx.query, ctx.body, ctx.params, ctx.param);
    await withSqlConnection(async () => {
      await createCategory(ctx.request.body);
    });

    ctx.status = 200;
    ctx.body = { ok: true };
  } catch (e) {
    log.error(e);
    ctx.throw(400, 'Bad request');
  }

  await next();
}

module.exports = create;
