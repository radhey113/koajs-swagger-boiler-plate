'use strict';

const Models = require('../../../models');
async function getUser(criteria) {
  const users = await Models.User.find(criteria, { __v: 0 }, { lean: true });
  return {
    ok: true,
    status: 200,
    message: 'Success',
    data: users,
  };
}

module.exports = getUser;
