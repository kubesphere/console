/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import path from 'node:path';

const PATHS = {
  root: path.resolve(__dirname, '../'),
} as const;

const resolvePath = (...paths) => path.resolve(PATHS.root, ...paths);

const resolvePackagePath = (...paths) => resolvePath('packages', ...paths);

const PACKAGES = [
  {
    packageName: 'kubesphere-console',
    absolutePath: PATHS.root,
    isBuild: false,
    isPublish: false,
  },
  {
    packageName: '@ks-console/locales',
    absolutePath: resolvePath('locales'),
    isBuild: false,
    isPublish: true,
  },
  {
    packageName: '@ks-console/appstore',
    absolutePath: resolvePackagePath('appstore'),
    isBuild: true,
    isPublish: true,
  },
  {
    packageName: '@ks-console/bootstrap',
    absolutePath: resolvePackagePath('bootstrap'),
    isBuild: false,
    isPublish: true,
  },
  {
    packageName: '@ks-console/console',
    absolutePath: resolvePackagePath('console'),
    isBuild: true,
    isPublish: true,
  },
  {
    packageName: '@ks-console/core',
    absolutePath: resolvePackagePath('core'),
    isBuild: true,
    isPublish: true,
  },
  {
    packageName: '@ks-console/shared',
    absolutePath: resolvePackagePath('shared'),
    isBuild: true,
    isPublish: true,
  },
  {
    packageName: '@ks-console/server',
    absolutePath: resolvePath('server'),
    isBuild: false,
    isPublish: true,
  },
] as const;

const PACKAGES_TO_BUILD = PACKAGES.filter(({ isBuild }) => isBuild);

const PACKAGES_TO_PUBLISH = PACKAGES.filter(({ isPublish }) => isPublish);

export { PATHS, PACKAGES, PACKAGES_TO_BUILD, PACKAGES_TO_PUBLISH };
