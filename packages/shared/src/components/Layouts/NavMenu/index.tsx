/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { trimEnd } from 'lodash';

import NavItem, { NavMenuItemTab, NavMenuItem } from './NavItem';

import { Wrapper, InnerWrapper } from './styles';

const getOpenedNav = (navs: NavMenuItem[], currentPathArr: string[]) => {
  let name = '';
  navs.forEach((nav: NavMenuItem) => {
    nav.children?.forEach((item: NavMenuItem) => {
      if (
        item.children &&
        item.children.some((child: NavMenuItem) => {
          if (currentPathArr.includes(child.name)) {
            return true;
          }
          if (child.tabs) {
            return child.tabs.some((tab: NavMenuItemTab) => currentPathArr.includes(tab.name));
          }

          return false;
        })
      ) {
        name = item.name;
      }
    });
  });

  return name;
};

const getCurrentPath = (path: string, prefix = '/'): [string, string[]] => {
  let trimmedPath = path.slice(prefix.length);
  trimmedPath = trimEnd(trimmedPath, '/');
  const pathArr = trimmedPath.split('/');
  return [pathArr[pathArr.length - 1], pathArr];
};

interface NavMenuProps {
  navs: NavMenuItem[];
  prefix: string;
  disabled?: boolean;
  pathname: string;
}

export type { NavMenuItem, NavMenuItemTab };

export const NavMenu = ({ navs, prefix, disabled, pathname }: NavMenuProps) => {
  if (!navs || navs.length === 0) {
    return null;
  }

  const [current, currentPathArr] = getCurrentPath(pathname, prefix);
  const [openedNav, setOpenedNav] = useState(getOpenedNav(navs, currentPathArr));

  const handleToggleItem = (itemName: string) => {
    const newOpenedNav = openedNav === itemName ? '' : itemName;
    setOpenedNav(newOpenedNav);
  };

  return (
    <Wrapper>
      {navs.map((nav: NavMenuItem) => (
        <InnerWrapper key={nav.name}>
          {nav.title && <p>{t(nav.title)}</p>}
          <ul>
            {nav.children?.map((item: NavMenuItem) => (
              <NavItem
                key={item.name}
                item={item}
                prefix={prefix}
                onOpen={handleToggleItem}
                isOpen={item.name === openedNav}
                current={current}
                pathArr={currentPathArr}
                disabled={disabled}
              />
            ))}
          </ul>
        </InnerWrapper>
      ))}
    </Wrapper>
  );
};
