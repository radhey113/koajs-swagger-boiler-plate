const log = require('../../log');
const getCategory = require('../../services/user/get');
// const { withSqlConnection } = require('../../common/sql');

async function get(ctx, next) {
  try {
    let results;
    await withSqlConnection(async () => {
      results = await getCategory(ctx.request.query);
    });

    ctx.status = 200;
    ctx.body = results;
  } catch (e) {
    log.error(e);
    ctx.throw(400, 'Bad request');
  }

  await next();
}

module.exports = get;
