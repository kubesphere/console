/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Button, Popover } from '@kubed/components';
import { Warning } from '@kubed/icons';

const SIZE = 20;

export const StyledPopover = styled(Popover)`
  &.tippy-box {
    min-width: 200px;

    .tippy-content {
      padding: 12px;
    }
  }
`;

export const StyledButton = styled(Button).attrs({ variant: 'text' })`
  margin: 0 4px;
  width: ${SIZE}px;
  height: ${SIZE}px;
  padding: 0;
  border: 0;

  &:hover {
    background-color: inherit;
  }
`;

export const Icon = styled(Warning).attrs({ size: SIZE })``;
