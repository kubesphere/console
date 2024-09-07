/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Content = styled.div`
  margin: 0 -6px;
  zoom: 1;
  &:after {
    content: '.';
    display: block;
    clear: both;
    overflow: hidden;
    height: 0;
    visibility: hidden;
  }
`;

export const Box = styled.div`
  float: left;
  width: 50%;
  padding: 6px;
`;

export const FullBox = styled.div`
  float: left;
  width: 100%;
  padding: 6px;
`;

export const Wrapper = styled.div`
  margin-top: 12px;
`;

export const Status = styled.div`
  min-height: 190px;
  padding: 0 6px;
  background-color: #f9fbfd;
`;
