const log = require('../../log');
const updateCategory = require('../../services/user/update');
// const { withSqlConnection } = require('../../common/sql');

async function remove(ctx, next) {
  try {
    await withSqlConnection(async () => {
      await updateCategory(ctx.params.id, ctx.request.body);
    });

    ctx.status = 200;
    ctx.body = { ok: true };
  } catch (e) {
    log.error(e);
    ctx.throw(400, 'Bad request');
  }

  await next();
}

module.exports = remove;
