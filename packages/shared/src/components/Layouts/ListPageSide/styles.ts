/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Root = styled.div<{ $pageHeaderHeight: number }>`
  position: fixed;
  top: ${({ $pageHeaderHeight }) => $pageHeaderHeight + 20}px;
  padding: 0 20px 40px;
  width: 260px;
  z-index: 99;
`;
