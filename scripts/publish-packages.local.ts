/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import shelljs from 'shelljs';

import { PACKAGES_TO_PUBLISH } from './constants';

shelljs.cd('packages');

PACKAGES_TO_PUBLISH.forEach(({ absolutePath }) => {
  shelljs.cd(absolutePath);
  const command = `yalc publish`;
  shelljs.exec(command);
});
