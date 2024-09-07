/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { CSSProperties } from 'react';

export interface ComponentStyles {
  styles?: {
    root?: CSSProperties;
  };
  sx?: CSSProperties;
  style?: CSSProperties;
}
