/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Card = styled.div`
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(36, 46, 66, 0.06);
  background-color: #fff;

  &:hover {
    box-shadow: 0 8px 16px rgba(36, 46, 66, 0.16);
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_9};
`;
