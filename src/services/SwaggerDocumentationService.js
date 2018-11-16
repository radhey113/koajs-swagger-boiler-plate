const path = require('path');
const { promisify } = require('util');

const glob = promisify(require('glob'));
const RefParser = require('json-schema-ref-parser');
const { mergeWith } = require('lodash');

/**
 * Load documentation from specified folder.
 * @param {string} documentationRootFile Documentation root file.
 */
async function loadSwaggerDocumentation(documentationRootFile) {
  if (!documentationRootFile) {
    throw new Error('Documentation root file is not defined.');
  }

  const documentationFolder = path.dirname(documentationRootFile);

  const documentationFiles = await glob(path.join(documentationFolder, '/**/api.yaml'));

  const apis = await Promise.all(documentationFiles.map(f => RefParser.dereference(f)));

  const document = mergeWith({}, ...apis, function customizer(objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });

  return document;
}

module.exports = {
  loadSwaggerDocumentation,
};
