'use strict';

const assert = require('assert');

async function updateCategory(id, body) {
  assert.ok(body.username, 'Username is required');

  return {
    username: body.username,
  };
}

module.exports = updateCategory;
