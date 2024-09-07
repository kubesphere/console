/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const EmptyTips = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.palette.accents_4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
`;

export const ItemWrapper = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr repeat(3, minmax(0, 1fr));
  padding: 12px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border: solid 1px ${({ theme }) => theme.palette.border};
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StatusDesc = styled.span`
  margin-left: 2px;
`;
