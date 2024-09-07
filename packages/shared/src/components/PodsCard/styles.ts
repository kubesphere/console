/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { FilterInput, Button, Entity, Field } from '@kubed/components';
import StatusIndicator from '../StatusIndicator';
import Pagination from '../Pagination';

export const Header = styled.div`
  display: flex;
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.colors.white[0]};
`;

export const Body = styled.div`
  position: relative;
  min-height: 80px;
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.colors.white[0]};
`;

export const SearchInput = styled(FilterInput)`
  width: 100%;
`;

export const Actions = styled.div`
  flex: 1 0 auto;
`;

export const ActionButton = styled(Button)`
  margin-left: 12px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.colors.white[1]};
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 16px;
  left: 11px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyWrapper = styled.div`
  padding: 12px;
  color: #c1c9d1;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  background-color: #f9fbfd;
`;

export const IndicatorWrapper = styled.div`
  position: relative;
  height: 40px;
`;

export const StatusTip = styled.div`
  strong {
    color: #fff;
  }
`;

export const Indicator = styled(StatusIndicator)`
  position: absolute;
  width: 8px;
  height: 8px;
  right: 2px;
  bottom: 2px;
`;

export const IpTip = styled.div`
  width: 176px;

  ul {
    margin-top: 8px;
  }

  li {
    display: flex;
    font-weight: normal;

    .kubed-icon {
      margin-right: 4px;
      color: hsla(0, 0%, 100%, 0.9);
      fill: hsla(0, 0%, 100%, 0.4);
    }
  }

  li + li {
    margin-top: 4px;
  }
`;

export const PodIp = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${({ theme }) => theme.palette.colors.green[2]};
  margin-left: 8px;
  line-height: 20px;
  text-align: center;
  font-weight: 600;
  color: white;
`;

export const Charts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -10px;

  & > div {
    margin: 0 10px;
  }
`;

export const MonitorWrapper = styled.div<{ expanded?: boolean }>`
  ${({ expanded }) => expanded && 'color: white;'}
  flex: 1;
`;

export const EntityWrapper = styled.div`
  position: relative;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EntityMain = styled(Entity)`
  .entity-main {
    display: table;
    table-layout: fixed;
    width: 100%;
    line-height: 20px;
  }

  .field-avatar {
    float: left;
  }

  .recharts-tooltip-wrapper {
    z-index: 10000;
  }

  .field-label {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }

  &[aria-expanded='true'] {
    margin: 0 -4px;
    padding: 12px 16px;
    background-color: #242e42;
    border-color: #242e42;
    transition: all 0.3s;

    .field-label {
      color: #fff;
    }

    .field-value {
      color: #fff;

      a {
        color: #fff;
      }
    }
  }

  & + div {
    z-index: 1 !important;
  }
`;

export const ArrowWrapper = styled.div<{ expanded?: boolean }>`
  width: 3%;
  display: table-cell;
  vertical-align: middle;
  text-align: right;

  .kubed-icon {
    transition: all 0.3s;
    ${({ expanded }) =>
      expanded
        ? `transform-origin: center center;
  transform: rotate(180deg);`
        : ''}
  }
`;

export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
`;

export const Extra = styled.div`
  .title {
    margin-bottom: 9px;
    color: #242e42;
  }

  width: 100%;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
  z-index: 1;
`;

export const ExtraContainer = styled.div`
  > div {
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.palette.colors.white[2]};
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const FiledWrapper = styled(Field)<{ width: string }>`
  width: ${({ width }) => width};
  display: table-cell;
  vertical-align: top;
  padding-right: 20px;
`;

export const StyledPagination = styled(Pagination)`
  padding: 10px 12px;
  background-color: #f9fbfd;
  .total-count {
    color: #79879c;
  }
`;
