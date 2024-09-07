/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h4`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-right: 12px;
  margin-bottom: 0;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Count = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.accents_5};
  line-height: 20px;
`;
