/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Card, Row } from '@kubed/components';
import { StatusCircle } from '@ks-console/shared';

export const CardWrapper = styled(Card)`
  min-height: 150px;
  margin-bottom: 0;
`;

export const StyleRow = styled(Row)`
  margin: 0 -12px;
`;

export const Title = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  zoom: 1;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
`;

export const NodeStatus = styled(StatusCircle)`
  padding: 25px 18px;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -3px;
`;

export const Item = styled.div`
  flex: 1 0 250px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin: 3px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  overflow: hidden;

  &.disabled {
    opacity: 0.4;
    cursor: unset !important;

    p {
      font-size: 16px;
      color: ${({ theme }) => theme.palette.accents_5};
    }
  }
`;

export const ServiceItem = styled(Item)`
  flex: 1 0 250px;
  justify-content: space-between;
  cursor: pointer;

  img {
    width: 94px;
    height: 20px;
  }

  p {
    height: 44px;
    line-height: 44px;
    font-size: 26px;
    font-weight: 600;
    margin: 0;

    span {
      font-size: 12px;
      line-height: 20px;
    }
  }
`;

export const CoreItem = styled(Item)`
  height: 44px;

  p {
    font-weight: 600;
    @include ellipsis;
  }
`;

export const CoreItemIcon = styled.div`
  flex: 0 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;

  &.healthy,
  &.ready {
    background-color: ${({ theme }) => theme.palette.colors.green[2]};
  }

  &.unhealthy,
  &.warn {
    background-color: ${({ theme }) => theme.palette.colors.yellow[2]};
  }

  &.danger {
    background-color: ${({ theme }) => theme.palette.colors.red[2]};
  }

  &.unknown {
    background-color: ${({ theme }) => theme.palette.accents_5};
  }
`;
