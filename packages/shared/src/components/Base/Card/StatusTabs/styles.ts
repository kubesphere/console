/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Card, Empty } from '@kubed/components';
import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
`;

export const TabList = styled.div`
  display: flex;
  flex-direction: column;
  width: 242px;
  margin-right: 12px;
`;

export const Tab = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 68px;
  border-radius: 4px;
  background-color: #f9fbfd;
  cursor: pointer;

  &.active {
    background-color: ${({ theme }) => theme.palette.colors.green[2]};
  }

  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const TabImg = styled.i`
  position: absolute;
  top: 0;
  right: -30px;
  width: 80px;
  height: 80px;
  background-image: url('/assets/banner-icon-1.svg');
  background-size: 80px auto;
  background-repeat: no-repeat;
  pointer-events: none;
`;

export const TabInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const TabContent = styled.div`
  flex: 1;
`;

export const TabContentInner = styled.div`
  height: 100%;
  border-radius: 4px;
  background-color: #f9fbfd;
`;

export const EmptyWrapper = styled(Empty)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 40px 0;
  position: absolute;
  .empty-title {
    margin-top: 30px;
  }
`;

export const CardWrapper = styled(Card)`
  min-height: 150px;
  margin-bottom: 12px;
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

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;
