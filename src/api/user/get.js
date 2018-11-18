const log = require('../../log');
const getUser = require('../../services/user/get');

async function get(ctx, here, next) {
  try {
    let result = await getUser();

    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    log.error(e);
    ctx.throw(400, 'Bad request');
  }

  await next();
}

module.exports = get;
