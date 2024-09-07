/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  background-color: #ffffff;
  overflow: hidden;
  margin-top: 12px;
`;

export const Panel = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

export const PanelToolbar = styled(Panel)`
  background-color: #f9fbfd;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: solid 1px #d8dee5;
  &::after {
    content: '';
    clear: both;
    display: block;
  }
`;

export const PanelPagination = styled.div`
  background-color: #f9fbfd;
  line-height: 56px;
  box-shadow: 0 -1px 0 0 #d8dee5;
  .total-count {
    visibility: hidden;
  }
`;

export const PanelTitle = styled(Panel)`
  font-size: 14px;
  font-weight: 600;
  line-height: 66px;
  color: #242e42;
`;

export const PanelList = styled.div`
  position: relative;
`;

export const ToolbarButton = styled.div`
  float: right;
`;

export const ToolbarFilter = styled.div`
  float: left;
  display: flex;
  .kubed-select {
    width: 250px;
    &:not(:first-child) {
      margin-left: 12px;
    }
  }
`;

export const SortButton = styled.div`
  display: inline-block;
  margin-top: 7px;
  margin-left: 30px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  .kubed-icon {
    color: #00aa72;
    fill: #90e0c5;
  }
`;

export const AverageLoad = styled.div`
  white-space: nowrap;
`;

export const Label = styled.span`
  color: #fff;
  border-radius: 4px;
  background: #36435c;
  padding: 0 0.3em;
  margin: 0 0.3em;
`;
