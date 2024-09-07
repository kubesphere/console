/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, Menu } from '@kubed/components';

export const TableActionButton = styled(Button)`
  min-width: 96px;
  margin-left: 12px;
`;

export const BatchActionButton = styled(Button)`
  min-width: 96px;
  & + button {
    margin-left: 12px;
  }
`;

export const DetailBaseButton = styled(Button)`
  margin: 6px;
`;

export const DetailMoreButton = styled(Button)`
  width: 96px;
  padding: 5px 0;
  margin: 6px;
  span {
    overflow: visible;
  }

  .kubed-icon {
    margin: -2px -5px 0 0;
  }
`;

export const DarkMenu = styled(Menu)`
  color: #ffffff;
  background-color: ${({ theme }) => theme.palette.accents_8};

  .item-label {
    color: #ffffff;
  }

  button {
    &:hover {
      background-color: ${({ theme }) => theme.palette.accents_7};
    }
  }
`;
