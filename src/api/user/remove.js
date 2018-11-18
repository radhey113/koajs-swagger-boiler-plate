'use strict';

const log = require('../../log');
const removeUser = require('../../services/user/remove');

async function remove(ctx, next) {
  try {
    let result;
    result = await removeUser(ctx.params.id);

    ctx.status = 200;
    ctx.body = {
      ok: true,
      message: 'Removed Successfully',
      status: 200,
      data: result,
    };
  } catch (e) {
    log.error(e);
    ctx.status = 400;
    let errorData = {
      message: e.message,
      staus: 400,
      errorCode: e.code,
    };
    ctx.body = errorData;
  }

  await next();
}

module.exports = remove;
