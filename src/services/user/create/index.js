'use strict';

const assert = require('assert');

async function createCategory(body) {
  assert.ok(body.username, 'Name is required');
  return {
    username: body.username,
  };
}

module.exports = createCategory;
