/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const Chart = styled.div`
  width: 372px;
  .recharts-polar-grid-concentric {
    .recharts-polar-grid-concentric-circle {
      stroke: #d8dee5;

      &:last-child {
        fill: ${({ theme }) => theme.palette.accents_1};
        opacity: 0.5;
      }
    }
  }
`;

export const List = styled.div`
  flex: 1;
`;
