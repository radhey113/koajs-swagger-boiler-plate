'use strict';

const assert = require('assert');

async function removeUser(id) {
  const values = { id };
  assert.ok(id, 'Id is required');
  return {
    username: 'Demo',
  };
}

module.exports = removeUser;
