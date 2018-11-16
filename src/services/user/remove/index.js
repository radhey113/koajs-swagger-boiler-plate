// const { executeFile } = require('../../../common/sql');

async function removeCategory(id) {
  const values = { id };

  await executeFile(require.resolve('./removeCategory.sql'), values);

  return;
}

module.exports = removeCategory;
