'use strict';

const log = require('../../log');
const getUser = require('../../services/user/get');

/** CTX is request Parameter **/

async function get(ctx, next) {
  try {
    let result = await getUser();
    ctx.status = 200;
    ctx.body = result;
  } catch (e) {
    log.error(e);
    ctx.type = 'application/json';
    ctx.status = 400;
    ctx.body = { msg: 'Error Message', status: 400 };
  }

  await next();
}

/** Export get method **/

module.exports = get;
