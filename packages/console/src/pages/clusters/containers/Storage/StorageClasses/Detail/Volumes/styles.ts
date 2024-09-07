/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Card } from '@kubed/components';

export const ItemStyle = styled.div`
  display: flex;
  margin-bottom: 12px;

  .icon {
    margin-right: 12px;
    width: 40px;
    height: 40px;
  }

  span {
    display: block;
  }
`;

export const TitleStyle = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #242e42;
`;

export const DescStyle = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #79879c;
`;

export const BottomStyle = styled.div`
  display: flex;
`;

export const ItemBgStyle = styled.div`
  background: #f9fbfd;
  border-radius: 4px;
  padding: 12px;
  flex: 1;
  margin-right: 12px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

export const ItemContainer = styled(ItemStyle)`
  background: #f9fbfd;
  border-radius: 4px;
  padding: 12px;
  flex: 1;
  margin-right: 12px;

  &:last-of-type {
    margin-right: 0px;
  }
`;

export const CardTitle = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  zoom: 1;
  padding: 12px 0 0 12px;
`;

export const CardStyle = styled(Card)`
  & > div {
    padding: 0%;
  }
  & > div > div > div {
    box-shadow: none;
  }
`;
