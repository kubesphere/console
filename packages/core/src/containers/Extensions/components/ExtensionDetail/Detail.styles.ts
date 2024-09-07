/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow-x: hidden;
  flex: 1;
`;

export const Name = styled.h1`
  margin: 0;
  font-size: 32px;
  font-weight: 600;
  line-height: 44px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Description = styled.h1`
  padding-top: 8px;
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const TabsWrapper = styled.div`
  padding-top: 40px;
`;
