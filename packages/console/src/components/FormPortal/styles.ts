/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled, { css } from 'styled-components';

export const wrapperCss = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 12px;
  border: 1px solid #79879c;
  box-shadow: 0 4px 8px rgba(36, 46, 66, 0.2);
  border-radius: 4px;
  background-color: #fff;
  z-index: 10;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  background: #242e42;
  border-radius: 4px;
  padding: 4px 12px;
`;

export const ActionButton = styled.div<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  border-radius: 24px;
  padding: 0 12px;
  ${({ disabled = false }) => {
    if (disabled) {
      return css`
        pointer-events: none;
        & svg.kubed-icon {
          color: #79879c;
        }
      `;
    }
  }}
  &:hover {
    background-color: #eff4f9;
    cursor: pointer;
    & svg.kubed-icon {
      color: #000;
    }
  }
  &:active {
    background-color: #e3e9ef;
    cursor: pointer;
    & svg.kubed-icon {
      color: #000000;
    }
  }
`;
