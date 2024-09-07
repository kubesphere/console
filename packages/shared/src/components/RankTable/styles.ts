/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Empty } from '@kubed/components';
import styled from 'styled-components';

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

export const Wrapper = styled.div`
  position: relative;
`;

export const Table = styled.div<{ transparent?: boolean }>`
  > div {
    padding: 0;
  }
  tr {
    cursor: pointer;
    &:hover {
      td {
        background-color: #f9fbfd;
        &.rankCol {
          background: #dbefe2;
        }
      }
    }
  }
  td {
    color: #79879c;
  }
  table {
    border-collapse: separate;
    border-spacing: 0 5px;
    a {
      color: #79879c;
      &:hover {
        color: #55bc8a;
      }
    }
  }
  th {
    border-bottom: none;
    white-space: pre;
  }
  h3 {
    font-size: 14px;
    color: #242e42;
    font-weight: bold;
  }
  td,
  th {
    padding: 10px 15px;
    border: none;
  }
  td {
    background: #f9fbfd;
  }
  td div {
    white-space: nowrap;
  }
  td:first-child {
    border-radius: 4px 0 0 4px;
  }
  td:last-child {
    border-radius: 0 4px 4px 0;
  }
  td.rankCol {
    background: #dbefe2;
  }
  ${({ transparent }) =>
    transparent &&
    `
  table {
    background: #f9fbfd;
    border-collapse: separate;
    border-spacing: 0 5px;
    padding: 0;
  }
  td {
    color: #79879c;
  }
  td,
  th {
    border-bottom: none;
    padding: 5px 20px;
    border: none;
  }
  td {
    background: #fff;
  }
  td.rankCol {
    background: #dbefe2;
  }
  `}
`;
