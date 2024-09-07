/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ClusterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Cluster = styled.div`
  width: 326px;
  padding: 8px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.palette.accents_8};
  margin-right: 20px;
`;

export const DisabledTip = styled.div`
  padding: 18px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  font-size: 14px;
  line-height: 1.43;
  font-family: Roboto, ${({ theme }) => theme.font.sans};
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const Content = styled.div`
  margin-top: 12px;
`;
