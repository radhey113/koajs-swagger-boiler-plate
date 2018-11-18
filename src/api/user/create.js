const log = require('../../log');
const createCategory = require('../../services/user/create');

async function create(ctx, next) {
  try {
    let result;
    result = await createCategory(ctx.request.body);
    delete result.__v;

    ctx.status = 200;
    ctx.body = {
      ok: true,
      message: 'Success',
      status: 200,
      data: result,
    };
  } catch (e) {
    log.error(e);

    let body = {
      message: e.message,
      errorCode: e.code,
      status: 402,
    };

    ctx.status = 402;
    ctx.body = body;
  }

  await next();
}

module.exports = create;
