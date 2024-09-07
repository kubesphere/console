/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
export const Wrapper = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    .h6 {
      font-size: 14px;
      display: block;
      line-height: 20px;
      font-weight: 600;
      font-style: normal;
      color: #242e42;
      text-shadow: 0 4px 8px rgb(36 46 66 / 10%);
    }
  }
`;

export const TableWrapper = styled.div`
  border: 1px solid #ccd3db;
  border-radius: 3px;
  overflow: hidden;

  table {
    padding: 0;
    .table-thead {
      tr {
        > th {
          padding: 8px 12px;
        }
        &:first-child > th {
          text-align: center;
          background-color: #f9fbfd;
        }
        &:first-child > th:first-child {
          border-right: 1px solid #eff4f9;
        }
        &:last-child {
          & > th {
            border-top: 1px solid #eff4f9;
            border-right: 1px solid #eff4f9;
            &:nth-child(2) {
              border-right: 1px solid #eff4f9;
            }
          }
        }
      }
    }
    .table-tbody {
      tr {
        &:nth-child(even) {
          background-color: #f9fbfd;
        }
        &.table-expanded-row {
          &:hover td {
            background-color: #e3e9ef;
          }
          background-color: #e3e9ef;
        }
        > td {
          height: 40px;
          &:nth-child(2) {
            border-right: 1px solid #ccd3db;
          }
        }
      }
    }
  }

  .label {
    font-weight: 500;
    color: #36435c;
    background-color: #e3e9ef;
    border-radius: 2px;
    height: 20px;
    display: inline-block;
    margin-top: 2px;
    padding: 0 3px;

    span {
      background-color: #242e42;
      color: #fff;
      display: inline-block;
      margin-right: 6px;
      padding: 0 4px;
      line-height: 16px;
      box-sizing: border-box;
      border-radius: 2px;
    }
  }

  .cidr {
    width: 145px;

    label {
      display: inline-block;
      width: 128px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .expand {
    width: 40px;
  }
  .project {
    position: relative;
  }
  .detail {
    width: 100%;
    background-color: #f9fbfd;
    padding: 12px;
    border-radius: 4px;
  }
`;
