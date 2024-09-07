/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Cluster } from '@kubed/icons';
import { Col, Empty, Field } from '@kubed/components';

export const Wrapper = styled.div`
  display: flex;
`;

export const Info = styled.div`
  position: relative;
  width: 30%;
  min-width: 366px;
  overflow: hidden;
`;

export const InfoTitle = styled.div`
  margin-bottom: 20px;
`;

export const InfoDesc = styled.div`
  margin-bottom: 16px;
`;

export const CornerIcon = styled(Cluster)`
  position: absolute;
  top: -80px;
  right: -60px;
  opacity: 0.1;
`;

export const Chart = styled.div`
  width: 400px;
  height: 200px;
  position: absolute;
  top: 100px;
  right: 0;
`;

export const Monitor = styled.div`
  margin-left: 12px;
  flex: 1;
  padding: 12px;
  border-radius: 2px;
  background-color: #f9fbfd;
`;

export const MonitorItem = styled.div`
  background-color: #fff;
  border-radius: 3px;
  border: solid 1px ${({ theme }) => theme.palette.border};
  &:not(:first-child) {
    margin-top: 12px;
  }
`;

export const EmptyWrapper = styled(Empty)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  padding: 40px 0;
  .empty-title {
    margin-top: 30px;
  }
`;

export const StyledField = styled(Field)`
  min-width: 120px;
  flex-grow: 0;
  margin-bottom: 12px;
`;

export const StyledCol = styled(Col)`
  overflow: hidden;
`;
