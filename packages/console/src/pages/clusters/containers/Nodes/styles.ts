/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Row, Entity, Field, Col } from '@kubed/components';
import { DataTable } from '@ks-console/shared';

export const FullRow = styled(Row)`
  width: 100%;
`;
export const FullCol = styled(Col)`
  margin: 0;
`;
export const StyledEntity = styled(Entity)`
  padding: 0;
`;
export const StyledField = styled(Field)`
  align-items: flex-start;
  .field-label {
    white-space: break-spaces;
  }
`;
export const FieldLabel = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  font-weight: 400;
  color: #79879c;
  max-width: 300px;
`;

export const Resource = styled.div`
  & > span {
    display: inline-block;
    vertical-align: middle;
  }
  .kubed-icon-dark {
    color: #fff;
    fill: #ea4641;
  }
`;
export const Taints = styled.span`
  display: inline-block;
  min-width: 20px;
  height: 20px;
  margin-left: 8px;
  padding: 0 6px;
  line-height: 20px;
  border-radius: 2px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
  background-color: #181d28;
  text-align: center;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: none;
  }
`;
export const DataTableWrapper = styled(DataTable)`
  &.no-selector table .table-name {
    left: 0;
  }
  .table-main {
    overflow-x: auto;
  }
  table {
    th {
      white-space: nowrap;
    }
    tbody tr {
      white-space: nowrap;
      &:hover,
      &.row-selected {
        & > .table-selector,
        & > .table-name,
        & > .table-more {
          background-color: #eff4f9;
        }
      }
    }

    .table-selector,
    .table-name,
    .table-more {
      position: sticky;
      background: #fff;
      z-index: 2;
      border-top: 1px solid #eff4f9;
    }

    .table-selector {
      left: 0;
    }

    .table-name,
    .table-more {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 10px;
        height: 100%;
        pointer-events: none;
      }
    }
    .table-name {
      left: 40px;
      &::after {
        right: 0;
      }
    }
    .table-more {
      right: 0;
      &::after {
        left: 0;
      }
    }
    .table-name-shadow {
      &::after {
        box-shadow: 8px 0px 16px 0px rgba(36, 46, 66, 0.08);
      }
    }
    .table-more-shadow {
      &::after {
        box-shadow: -8px 0px 16px 0px rgba(36, 46, 66, 0.08);
      }
    }
  }
`;
