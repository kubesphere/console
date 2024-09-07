/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  -webkit-box-shadow: 0 1px 0 0 ${({ theme }) => theme.palette.accents_1};
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.palette.accents_1};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  .toolbar-item,
  .toolbar-left,
  .toolbar-right {
    display: flex;
    align-items: center;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .toolbar-item {
    flex-grow: 1;
    justify-content: center;
  }

  .toolbar-left {
    justify-content: flex-start;
  }

  .toolbar-right {
    justify-content: flex-end;
  }
`;

export const ToolbarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .btn-refresh,
  .btn-setting {
    margin-left: 12px;
  }

  .menu-setting {
    padding: 4px 0;
    color: ${({ theme }) => theme.palette.background};
    background-color: ${({ theme }) => theme.palette.accents_8};

    .menu-label {
      color: ${({ theme }) => theme.palette.background};
      padding: 8px 12px;
    }

    button {
      padding: 6px 12px;
      line-height: 20px;
      color: ${({ theme }) => theme.palette.background};
      font-weight: 400;
      &:hover {
        background-color: ${({ theme }) => theme.palette.accents_7};
      }
    }
  }
`;

export const BatchActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  padding: 10px 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_8};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cancel-select {
    color: ${({ theme }) => theme.palette.background};
    &:hover {
      background-color: ${({ theme }) => theme.palette.accents_7};
    }
  }
`;
