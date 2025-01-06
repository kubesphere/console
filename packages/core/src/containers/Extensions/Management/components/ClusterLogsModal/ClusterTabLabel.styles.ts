/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Title } from './shared.styles';

export const ClusterItem = styled.div`
  display: flex;
  gap: 12px;
  text-align: start;
`;

export const ClusterInfos = styled.div`
  flex: 1;
`;

export const ClusterName = styled(Title)<{ $isSelected: boolean }>`
  display: block;
  word-break: break-all;
  white-space: break-spaces;
  color: ${({ $isSelected }) => ($isSelected ? '#fff' : '')};
`;

export const ClusterStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ClusterStatusText = styled.span`
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_5};
`;
