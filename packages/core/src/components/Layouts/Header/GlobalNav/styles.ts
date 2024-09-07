/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

interface GlobalNavWrapperProps {
  $visible?: boolean;
}

export const GlobalNavWrapper = styled('div')<GlobalNavWrapperProps>`
  position: fixed;
  inset: 0;
  background-color: rgba(35, 45, 65, 0.7);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  overflow: auto;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;

export const GlobalNavInner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(24, 29, 40, 0.8);
`;

interface NavItemProps {
  $active?: boolean;
}

export const NavItem = styled('a')<NavItemProps>`
  position: relative;
  width: 240px;
  height: 100vh;
  text-align: center;
  padding: calc(50vh - 160px) 20px 0;
  overflow: hidden;
  background-color: ${({ $active }) => ($active ? '#329dce' : 'transparent')};

  .kubed-icon {
    margin-bottom: 6px;
  }

  .nav-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: #fff;
    text-shadow: 0 4px 8px rgb(36 46 66 / 10%);
    margin-bottom: 12px;
  }

  .nav-desc {
    color: #fff;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  .kubed-icon {
    color: hsla(0, 0%, 100%, 0.9);
    fill: hsla(0, 0%, 100%, 0.4);
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.accents_1};

    .kubed-icon {
      color: #324558;
      fill: #b6c2cd;
    }
  }
`;
