/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Close } from '@kubed/icons';
import { useHotkeys } from '@kubed/hooks';
import { Icon, useGlobalStore } from '@ks-console/shared';
import { GlobalNavWrapper, GlobalNavInner, CloseButton, NavItem } from './styles';

interface GlobalNavProps {
  navs: any[];
}

const GlobalNav = ({ navs }: GlobalNavProps) => {
  const [activeNav, setActiveNav] = useState(navs[0].name);
  const { setNavOpen, globalStore } = useGlobalStore();

  useHotkeys([
    [
      'Escape',
      () => {
        setNavOpen(false);
      },
    ],
  ]);

  return (
    <GlobalNavWrapper $visible={globalStore.globalNavOpen}>
      <GlobalNavInner
        onClick={() => {
          setNavOpen(false);
        }}
      >
        {navs.map(nav => {
          const { name, icon, title, desc } = nav;
          const isActive = activeNav === name;
          const to = nav.link || `/${name}`;
          return (
            <NavItem
              as={Link}
              to={to}
              key={name}
              $active={isActive}
              onMouseEnter={() => {
                setActiveNav(name);
              }}
            >
              <Icon name={icon} size={60} variant="light" />
              <div className="nav-title">{t(title)}</div>
              <div className="nav-desc">
                {t(desc || `${title.replace(/\s/g, '_').toUpperCase()}_DESC`)}
              </div>
            </NavItem>
          );
        })}
      </GlobalNavInner>
      <CloseButton
        onClick={() => {
          setNavOpen(false);
        }}
      >
        <Close size={24} />
      </CloseButton>
    </GlobalNavWrapper>
  );
};

export default GlobalNav;
