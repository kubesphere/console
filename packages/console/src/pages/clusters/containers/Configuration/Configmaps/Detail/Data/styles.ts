/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  border-radius: 4px;
  background-color: #f9fbfd;

  & > ul > li {
    h6 {
      font-size: 14px;
      line-height: 1.43;
    }

    pre {
      margin-top: 8px;
      padding: 12px;
      border-radius: 4px;
      background-color: #ffffff;
      border: solid 1px #e3e9ef;
    }

    & + li {
      margin-top: 12px;
    }
  }
`;

export const CardTitle = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  @include clearfix;

  & > button {
    position: absolute;
    @include vertical-center;
    right: 0;
    z-index: 10;
  }
`;
