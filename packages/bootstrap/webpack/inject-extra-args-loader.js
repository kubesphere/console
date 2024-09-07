/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const path = require('path');
const fs = require('fs');

module.exports = function (content) {
  const regExp = /globals\.context\.registerExtension\(([^)]+)\)/g;
  const extensionPackageJsonPath = path.resolve(this.context, '../', 'package.json');

  const hasTarget = regExp.test(content);
  const hasPackageJson = fs.existsSync(extensionPackageJsonPath);
  if (!(hasTarget && hasPackageJson)) {
    return content;
  }

  const extensionPackageJson = require(extensionPackageJsonPath);
  const extensionName = extensionPackageJson?.name;

  const newContent = content.replace(
    regExp,
    `globals.context.registerExtension({ extensionName: '${extensionName}' , ...$1})`,
  );

  return newContent;
};
