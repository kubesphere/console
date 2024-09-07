/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ChartWrapper = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.colors.accents_0};
`;

export const Title = styled.div<{ darkMode?: boolean }>`
  position: absolute;
  left: 2px;
  top: 0;
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  color: #79879c;
`;
