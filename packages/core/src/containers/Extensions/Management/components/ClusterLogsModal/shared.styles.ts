/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Block = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #fff;
`;

export const Title = styled.h6`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};
`;
