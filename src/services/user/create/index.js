const assert = require('assert');

// const { executeFile } = require('../../../common/sql');

async function createCategory(body) {
  assert.ok(body.name, 'Name is required');
  assert.ok(body.status, 'Status is required');
  assert.ok(body.description, 'Description is required');
  assert.ok(body.icon, 'Icon is required');

  await executeFile(require.resolve('./createCategory.sql'), {
    ...body,
    parentId: body.parentId || null,
    communicationHierarchyId: body.communicationHierarchyId || null,
  });

  return;
}

module.exports = createCategory;
