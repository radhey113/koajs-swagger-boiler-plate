'use strict';

const assert = require('assert');
const { User } = require('../../../models');

async function updateUserData(id, body) {
  assert.ok(body.username, 'Username is required');
  let result = await User.update({ _id: id }, { $set: body }, { lean: true, new: true });
  return { result };
}

module.exports = updateUserData;
