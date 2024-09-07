/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Button } from '@kubed/components';

export const Root = styled.div`
  position: fixed;
  right: -16px;
  bottom: 64px;
  z-index: 10000;
  transition: right 300ms ease;

  &:hover {
    right: 0;
  }
`;

export const ToolboxButton = styled(Button).attrs({ color: 'secondary' })`
  padding: 5px 20px 5px 7px;
  border-radius: 100px 0 0 100px;
`;
