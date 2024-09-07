/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Root = styled.div<{ $pageHeaderHeight: number }>`
  position: fixed;
  top: ${({ $pageHeaderHeight }) => $pageHeaderHeight + 20}px;
  left: 20px;
  width: 364px;
  min-width: 360px;
  padding-right: 16px;
  height: calc(100vh - 100px);
  overflow: auto;

  @media screen and (max-width: 1280px) {
    width: 300px;
    min-width: 300px;
  }
`;
