/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Card } from '@kubed/components';
import styled from 'styled-components';

export const TableWrapper = styled(Card)`
  position: relative;
  & > div {
    padding: 0;
  }
`;

export const TableMain = styled.div`
  // padding: 0 12px 12px;

  table {
    width: 100%;
    text-align: left;
  }
`;

export const TableStyles = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;

  th {
    padding: 16px 12px;
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 12px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: #79879c;
    cursor: pointer;
  }

  .table-selector {
    line-height: 1;
  }

  .table-placeholder {
    position: relative;
    padding: 16px;
    background: white;
    text-align: center;
    z-index: 1;
  }
`;

export const TBody = styled.tbody`
  tr {
    &:hover {
      td {
        background-color: #eff4f9;
      }
    }

    &:last-child {
      td {
        border-bottom: 1px solid #eff4f9;
      }

      &.row-selected {
        & > td {
          border-bottom: 1px solid #55bc8a;
        }
      }
    }

    &.table-row-expand {
      & > td {
        background-color: #eff4f9;
      }
    }

    &.row-selected {
      & > td {
        border-top: 1px solid #55bc8a;
        background-color: #eff4f9;

        &:first-child {
          border-left: 1px solid #55bc8a;
        }

        &:last-child {
          border-right: 1px solid #55bc8a;
        }
      }

      & + .row-selected {
        & > td {
          border-top: 1px solid transparent;
        }
      }

      & + tr {
        & > td {
          border-top: 1px solid #55bc8a;
        }
      }
    }
  }

  td {
    height: 56px;
    padding: 8px 12px;
    border-top: 1px solid #eff4f9;
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;
    color: #242e42;
    word-break: break-all;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    &:first-child {
      border-left: 1px solid transparent;
    }

    &:last-child {
      border-right: 1px solid transparent;
    }
  }
`;
