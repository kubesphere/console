/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import 'styled-components';
import { KubedTheme } from '@kubed/components';

declare module 'styled-components' {
  export interface DefaultTheme extends KubedTheme {}
}
