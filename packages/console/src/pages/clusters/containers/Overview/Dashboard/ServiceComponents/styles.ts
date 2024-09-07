/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Tooltip = styled.span`
  &:hover {
    &::before {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -26px;
      display: inline-block;
      padding: 3px 6px;
      border-radius: 2px;
      background: #000;
      color: #fff;
      white-space: nowrap;
      z-index: 100;
    }
  }
`;
