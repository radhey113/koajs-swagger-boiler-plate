'use strict';

const Models = require('../../../models');
const assert = require('assert');

async function createCategory(body) {
  assert.ok(body.username, 'Name is required');
  let saveDataModel = new Models.User(body);
  return await saveDataModel.save();
}

module.exports = createCategory;
