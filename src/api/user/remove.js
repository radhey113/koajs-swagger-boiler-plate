const log = require('../../log');
const removeCategory = require('../../services/user/remove');
// const { withSqlConnection } = require('../../common/sql');

async function remove(ctx, next) {
  try {
    await withSqlConnection(async () => {
      await removeCategory(ctx.params.id);
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
