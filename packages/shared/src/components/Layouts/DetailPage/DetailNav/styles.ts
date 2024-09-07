/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 14px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.colors.dark[3]};
  margin: 0 0 12px;
`;

export const NavItem = styled(NavLink)`
  min-width: 96px;
  height: 32px;
  line-height: 32px;
  margin: 0 6px;
  padding: 0 14px;
  font-weight: 500;
  color: #fff;
  border: 1px solid transparent;
  text-align: center;
  transition: all 0.3s;

  &:first-child {
    margin: 0 6px 0 0;
  }

  &.active {
    border-radius: 4px;
    box-shadow: 0 8px 16px 0 rgba(85, 188, 138, 0.36);
    background-color: ${({ theme }) => theme.palette.colors.green[2]};
    border-color: ${({ theme }) => theme.palette.colors.green[2]};

    &:hover {
      color: #fff;
    }
  }
`;
