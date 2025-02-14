/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const fs = require('fs');
const yaml = require('js-yaml/dist/js-yaml');

const { getCache, root } = require('../libs/utils');

const cache = getCache();

const handleSampleData = async ctx => {
  const sampleName = ctx.params.app;
  const isFilePath = /(\/)\1{1,}|(\.)\2{1,}/.test(sampleName);

  if (isFilePath) {
    ctx.body = 'Invalid sample name';
    return;
  }

  let resources = cache.get(sampleName);
  if (!resources) {
    try {
      resources = yaml.safeLoadAll(fs.readFileSync(root(`sample/${sampleName}.yaml`)), 'utf8');
      cache.set(sampleName, resources);
    } catch (error) {
      console.error(error);
    }
  }

  ctx.body = resources;
};

module.exports = {
  handleSampleData,
};
