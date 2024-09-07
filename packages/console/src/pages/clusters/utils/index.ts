/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Pattern } from '@ks-console/shared';
const { PATTERN_LABEL } = Pattern;

export const isValidLabel = (label: Record<string, string>) =>
  Object.entries(label).every(
    ([key, value]) =>
      value.length <= 63 &&
      key.length <= (key.indexOf('/') !== -1 ? 253 : 63) &&
      key.replace(/\//g, '').replace(PATTERN_LABEL, '') === '' &&
      value.replace(PATTERN_LABEL, '') === '',
  );
