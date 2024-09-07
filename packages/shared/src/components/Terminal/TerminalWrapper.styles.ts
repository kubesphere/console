/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { DEFAULT_TERMINAL_OPTIONS } from './constants';

export const Wrapper = styled.div`
  height: 100%;
  padding: 12px;
  border-radius: 4px;
  background-color: ${DEFAULT_TERMINAL_OPTIONS.theme?.background};
  color: #fff;
`;

export const TerminalWrapper = styled.div`
  position: relative;
  height: 100%;
`;
export const ActionsWrapper = styled.div`
  align-items: center;
  background-color: #36435c;
  border-radius: 16px;
  color: #fff;
  display: flex;
  height: 32px;
  padding: 6px 10px;
  position: absolute;
  right: 32px;
  top: 2px;
  z-index: 2;
  gap: 12px;
  & .icon {
    opacity: 0.6;
  }
  & .icon-clickable {
    border-radius: 4px;
    cursor: pointer;
    pointer-events: auto;
    outline: none;
  }
  & .icon-clickable:hover {
    background-color: transparent;
    opacity: 1;
    color: #fff;
    fill: #fff;
  }
`;

export const Divider = styled.span`
  pointer-events: none;
`;
