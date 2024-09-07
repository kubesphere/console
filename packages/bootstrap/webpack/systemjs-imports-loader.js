/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    importsMap: {
      type: 'object',
    },
  },
};

module.exports = function (source) {
  const options = getOptions(this);
  validate(schema, options, 'SystemImport Loader');

  const importsStr = Object.entries(options.importsMap).map(([key, value]) => {
    if (key === 'react') {
      return `System.set("${value}", { default: require("${key}"), ...require("${key}"), })`;
    }
    return `System.set("${value}", require("${key}"))`;
  });

  const callback = this.async();
  callback(null, source + '\n\n' + importsStr + '\n\n');
};
