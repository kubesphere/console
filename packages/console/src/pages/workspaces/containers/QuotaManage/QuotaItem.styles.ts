/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Bar } from '@ks-console/shared';

export const Quota = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  &:hover {
    background-color: ${({ theme }) => theme.palette.accents_1};
  }
`;

export const Item = styled.div`
  flex: 1;
  min-width: 160px;
  margin-left: 20px;
`;

export const Title = styled.h6`
  margin: 0;
  font-size: 12px;
  line-height: 1.67;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Description = styled.p`
  margin: 0;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const BarItem = styled(Item)`
  flex: 3;
`;

export const StyledBar = styled(Bar)`
  width: 100%;
  height: 20px;
  border-radius: 2px;
`;
