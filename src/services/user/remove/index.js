'use strict';

const assert = require('assert');
const Models = require('../../../models');

/* remove user data */

async function removeUser(id) {
  const values = { id };
  assert.ok(id, 'Id is required');

  let result = await Models.User.remove({ _id: values.id });
  return { result };
}

module.exports = removeUser;
