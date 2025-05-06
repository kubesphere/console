/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Button } from '@kubed/components';

export const StyledButton = styled(Button)`
  height: 16px;
  border: 0;

  &:active {
    opacity: 0.7;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
`;
