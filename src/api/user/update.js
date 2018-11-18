'use strict';

const log = require('../../log');
const updateCategory = require('../../services/user/update');

async function remove(ctx, next) {
  try {
    let result;
    result = await updateCategory(ctx.params.id, ctx.request.body);

    ctx.status = 200;
    ctx.body = {
      ok: true,
      message: 'Updated successfully',
      status: true,
      data: result,
    };
  } catch (e) {
    log.error(e);
    ctx.status = 400;

    let errorData = {
      message: e.message,
      errorCode: e.code,
      status: 400,
    };
    ctx.body = errorData;
  }

  await next();
}

module.exports = remove;
