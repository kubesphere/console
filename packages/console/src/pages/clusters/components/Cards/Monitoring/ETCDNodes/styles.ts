/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Empty, Loading, Tag } from '@kubed/components';
import { StatusIndicator } from '@ks-console/shared';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

export const StyledLoading = styled(Loading)`
  height: calc(100% - 28px) !important;
  max-height: 244px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Title = styled.div`
  height: 20px;
  line-height: 20px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const List = styled.div`
  position: relative;
  flex: 1;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e3e9ef;
  background-color: #fff;

  &:not(:first-child) {
    margin-top: 8px;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

export const IconStatus = styled(StatusIndicator)`
  position: absolute;
  right: -8px;
  bottom: -3px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
  padding: 0 12px;

  div,
  p {
    flex: 1;
    max-width: 200px;

    strong {
      display: block;
      font-size: 14px;
      line-height: 1.43;
      color: #242e42;
    }

    span {
      line-height: 1.67;
      color: #79879c;
    }
  }
`;

export const StyledTag = styled(Tag)`
  margin-left: 8px;
  span {
    color: #fff !important;
  }
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
