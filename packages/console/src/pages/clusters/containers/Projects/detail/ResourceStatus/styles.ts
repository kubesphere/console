/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Card, Select, Tooltip } from '@kubed/components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.div`
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;
`;

export const CardWrapper = styled(Card)`
  padding-bottom: 12px;
`;

export const Header = styled.div`
  display: flex;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SelectWrapper = styled(Select)`
  width: 170px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 24px;
  height: 56px;
  border-bottom: 1px solid #ccd3db;
  background-color: #f9fbfd;
  &:first-child {
    border-top: 1px solid #ccd3db;
  }
`;

export const ItemIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemContent = styled(Link)`
  flex: auto;
  &:hover {
    cursor: pointer;
    & > strong,
    & > span {
      color: #369a6a;
    }
  }
`;
export const ItemTitle = styled.strong`
  color: #36435c;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43;
  display: block;
`;
export const ItemDesc = styled.span`
  color: #4a5974;
  line-height: 1.67;
  white-space: nowrap;
`;
export const ItemChart = styled.div`
  height: 40px;
  width: 330px;
`;

export const Badge = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  border-radius: 3px;
  background-color: #f5a623;
  box-shadow: 0 2px 4px 0 rgb(245 166 35 / 36%);
  cursor: pointer;
`;

export const Tips = styled(Tooltip)`
  white-space: nowrap;
`;

export const AppWrapper = styled.div`
  padding-bottom: 12px;
  padding-top: 12px;
`;

export const ChartItem = styled.div`
  padding: 12px;
  background-color: #f9fbfd;
  border-bottom: 1px solid #ccd3db;
  &:first-child {
    border-top: 1px solid #ccd3db;
  }
`;
