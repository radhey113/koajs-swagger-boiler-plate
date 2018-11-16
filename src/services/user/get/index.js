// const { executeFile } = require('../../../common/sql');

async function getCategories() {
  const result = await executeFile(require.resolve('./getCategories.sql'));

  return result.rows;
}

module.exports = getCategories;
