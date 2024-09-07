/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Entity } from '@kubed/components';

import { TableFooter } from '../../DataTable';

export const CardContentWrapper = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_1};
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  & > div:first-child {
    flex: 1;
  }
`;

export const MainContent = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    & > div:nth-child(2) {
      z-index: 2 !important;
    }
  }

  .isExpanded {
    background-color: ${({ theme }) => theme.palette.accents_8};

    .field-value,
    .field-label,
    .kubed-icon {
      color: #ffffff;
    }

    .cloud {
      color: currentColor;
    }

    .status {
      border-color: inherit;
    }
  }
`;

export const StyledEntity = styled(Entity)`
  .entity-main {
    align-items: center;
  }

  .isExpand {
    transform: rotateX(180deg);
  }
  &.marginBottom {
  margin-bottom: 229px;
`;

export const EmptyText = styled.div`
  height: 56px;
  line-height: 56px;
  text-align: center;
`;

export const VersionStatusAvatar = styled.div`
  position: relative;

  .cloud {
    color: #ffffff;
  }

  .status {
    position: absolute;
    right: 2px;
    bottom: 12px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
`;

export const StyledTableFooter = styled(TableFooter)`
  padding: 10px 0;
  background-color: transparent;

  .total-count {
    color: ${({ theme }) => theme.palette.accents_8};
  }
`;
