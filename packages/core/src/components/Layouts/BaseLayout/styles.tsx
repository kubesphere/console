/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Main = styled.div<{ $headerHight: number }>`
  padding-top: ${({ $headerHight }) => $headerHight}px;
  min-width: 1164px;
  height: 100%;
`;
