/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const WorkspaceWrapper = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;

  .item {
    display: flex;
    padding: 12px;
    border: 1px solid#ccd3db;
    border-radius: 4px;
    background-color: white;

    & + .item {
      margin-top: 8px;
    }

    & > div {
      margin-right: 20px;
      min-width: 20%;

      &:first-of-type {
        flex: 1;
      }
    }
  }
  .empty {
    font-size: 14px;
    line-height: 1.43;
    color: #79879c;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: bold;
  }
`;
