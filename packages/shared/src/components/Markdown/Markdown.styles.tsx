/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { FlattenSimpleInterpolation } from 'styled-components';
import styled from 'styled-components';

export const Root = styled.div<{
  $styles: FlattenSimpleInterpolation | undefined;
}>`
  ${({ $styles }) => $styles}
`;
