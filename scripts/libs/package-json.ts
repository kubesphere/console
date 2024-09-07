/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import fs from 'fs-extra';
import { merge } from 'lodash';

interface Dependencies {
  [packageName: string]: string;
}

interface PackageJson {
  name: string;
  dependencies: Dependencies;
  devDependencies: Dependencies;
  peerDependencies: Dependencies;
  [key: string]: any;
}

export function readPackageJsonSync({ path }: { path: string }) {
  const result: PackageJson = fs.readJsonSync(path);
  return result;
}

export function updatePackageJsonSync({
  path,
  data,
}: {
  path: string;
  data: Partial<PackageJson>;
}) {
  const currentData = readPackageJsonSync({ path });
  const newData = merge(null, currentData, data);
  fs.writeJsonSync(path, newData, { spaces: 2 });
}
