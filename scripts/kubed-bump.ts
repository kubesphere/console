/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import path from 'node:path';
import { isEmpty } from 'lodash';
import latestVersion from 'latest-version';
import cleanDeep from 'clean-deep';

import { Logger } from './libs/logger';
import { readPackageJsonSync, updatePackageJsonSync } from './libs/package-json';
import { PACKAGES } from './constants';

const logger = new Logger('kubed-bump');

const KUBED_PACKAGE_NAME = [
  '@kubed/charts',
  '@kubed/code-editor',
  '@kubed/components',
  '@kubed/diff-viewer',
  '@kubed/hooks',
  '@kubed/icons',
  '@kubed/log-viewer',
];

async function fetchKubedPackageLatestVersions() {
  const promises = KUBED_PACKAGE_NAME.map(name => latestVersion(name));
  logger.info('fetching latest versions of @kubed/* packages ...');
  const versions = await Promise.all(promises);
  const result = versions.map((version, index) => ({
    packageName: KUBED_PACKAGE_NAME[index],
    version,
  }));
  const message = result.map(({ packageName, version }) => `${packageName}@${version}`).join(', ');
  logger.success(`fetched latest versions: ${message}`);
  return result;
}

function readPackageJsonFiles() {
  return PACKAGES.map(info => {
    const absolutePath = path.resolve(info.absolutePath, 'package.json');
    const packageJson = readPackageJsonSync({ path: absolutePath });
    return { absolutePath, packageJson };
  });
}

async function main() {
  const latestVersions = await fetchKubedPackageLatestVersions();

  const packageJsonFiles = readPackageJsonFiles();

  packageJsonFiles.forEach(({ absolutePath, packageJson }) => {
    const packageName = packageJson.name;
    const dependencies = packageJson.dependencies ?? {};
    const devDependencies = packageJson.devDependencies ?? {};
    const peerDependencies = packageJson.peerDependencies ?? {};
    const data = {
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    };

    [
      { key: 'dependencies', map: dependencies },
      { key: 'devDependencies', map: devDependencies },
      { key: 'peerDependencies', map: peerDependencies },
    ].forEach(({ key, map }) => {
      Object.keys(map).forEach(dependency => {
        const isKubed = KUBED_PACKAGE_NAME.includes(dependency);

        if (!isKubed) {
          return;
        }

        const latestVersion = latestVersions.find(info => info.packageName === dependency)?.version;

        if (!latestVersion) {
          return;
        }

        data[key][dependency] = `^${latestVersion}`;
      });
    });

    const finalData = cleanDeep(data);
    if (isEmpty(finalData)) {
      return;
    }

    updatePackageJsonSync({ path: absolutePath, data: finalData });
    logger.success(`update @kubed/* dependencies in ${packageName} ...`);
  });
}

main();
