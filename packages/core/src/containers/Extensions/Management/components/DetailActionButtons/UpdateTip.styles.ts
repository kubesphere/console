/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Update } from '@kubed/icons';

export const TipButton = styled(Update)`
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
