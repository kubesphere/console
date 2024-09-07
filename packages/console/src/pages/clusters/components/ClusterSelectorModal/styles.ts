/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Entity, Field } from '@kubed/components';

export const Toolbar = styled.div`
  display: flex;
  padding: 6px 20px;
  box-shadow:
    0 1px 0 0 ${({ theme }) => theme.palette.accents_2},
    0 -1px 0 0 ${({ theme }) => theme.palette.accents_3};
  background-color: ${({ theme }) => theme.palette.accents_1};
`;

export const FilterInputWrapper = styled.div`
  flex: 1;
  padding: 0 12px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  padding: 0 12px;
`;

export const ListWrapper = styled.div`
  padding: 12px;
`;

export const ListContainer = styled.div`
  height: 472px;
  padding: 12px 0;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  .ks-InfiniteScroll-container {
    padding: 0 12px;

    .ks-InfiniteScroll-content {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
    }
  }
`;

export const StyledEntity = styled(Entity)`
  cursor: pointer;

  .entity-main {
    padding: 0 12px;

    .field-main-title {
      flex: 1;
      min-width: 330px;
      width: auto;
    }
  }
  .favorite-action {
    visibility: hidden;
  }
  &:hover .favorite-action {
    visibility: visible;
  }
`;

export const StyledField = styled(Field)`
  min-width: 125px;

  &.field-provider {
    .field-content {
      width: 130px;

      .field-value {
        /* overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; */
        width: 100%;
      }
    }
  }
`;
