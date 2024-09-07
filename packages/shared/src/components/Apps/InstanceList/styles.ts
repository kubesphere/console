/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { TableFooter } from '../../DataTable';

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .filter {
    flex: 1;
  }
`;

export const MainContent = styled.div`
  margin: 12px auto;

  & > div:not(:last-child) {
    margin-bottom: 8px;
  }

  .entity-main {
    & > div {
      flex: 1;
    }
  }
`;

export const StyledTableFooter = styled(TableFooter)`
  padding: 10px 0;
  background-color: #ffffff;

  .total-count {
    color: ${({ theme }) => theme.palette.accents_8};
  }
`;

export const EmptyText = styled.div`
  height: 56px;
  line-height: 56px;
  text-align: center;
`;

export const LoadingBox = styled.div`
  text-align: center;
  padding: 20px 0;
`;
