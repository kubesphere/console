/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const PaginationLeft = styled.div`
  display: fiex;
  align-items: center;
  .item-inner {
    justify-content: center;
  }
`;

export const PageSize = styled.div`
  cursor: pointer;
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #36435c;
`;

export const Divider = styled.div`
  width: 1px;
  height: 12px;
  background: #e3e9ef;
  margin: 0 12px;
`;
