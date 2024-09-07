/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const TooltipDivStyle = styled.div`
  width: auto;
  min-width: 120px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: $size-small;
  line-height: 1.67;
  border-radius: 4px;
  background-color: rgba(36, 46, 66, 0.8);
  box-shadow:
    0 6px 12px 0 rgba(2, 5, 8, 0.08),
    0 1px 2px 0 rgba(2, 5, 8, 0.08);
  z-index: 100;
`;

export const LabelStyle = styled.div`
  margin-bottom: 2px;
  font-weight: bold;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`;

export const ItemStyle = styled.div`
  display: flex;
  align-items: center;
  max-width: '100%';
  color: #ffffff !important;
  word-break: break-all;

  svg {
    margin-right: 4px;
  }

  i {
    width: 6px;
    height: 6px;
    margin-right: 8px;
    border-radius: 50%;
    background: $lightest;
    overflow: hidden;
  }
`;
