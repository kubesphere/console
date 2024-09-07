/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Input } from '@kubed/components';
import { Close } from '@kubed/icons';

export const StyledInput = styled(Input)`
  border-color: transparent;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.palette.accents_1};

  &.input-focus {
    border-color: ${({ theme }) => theme.palette.accents_5};
    box-shadow: none;
  }

  .kubed-input {
    color: ${({ theme }) => theme.palette.accents_8};
    font-size: 12px;
    line-height: 20px;
  }
`;

export const Clear = styled(Close)`
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
