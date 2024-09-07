/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { themeUtils, Empty } from '@kubed/components';

const { getColor } = themeUtils;

export const StyledEmpty = styled(Empty)`
  height: 240px;

  .custom-empty-image > .kubed-icon {
    margin-bottom: 0;
  }
`;

export const LinkButton = styled.a`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => getColor('blue', theme)};
`;
