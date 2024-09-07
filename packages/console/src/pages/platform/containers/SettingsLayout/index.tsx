/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cogwheel } from '@kubed/icons';
import { Outlet, useLocation } from 'react-router-dom';
import { NavTitle, NavMenu, useGlobalStore } from '@ks-console/shared';

import { NAV_KEY } from '../../constants';
import { ListPageSide, ListPageMain, permissionStore } from '@ks-console/shared';
const { getPlatformSettingsNavs } = permissionStore();

function PlatformSettingsLayout(): JSX.Element {
  const location = useLocation();
  const { getNav, setNav } = useGlobalStore();
  let navs = getNav(NAV_KEY);

  useEffect(() => {
    if (!navs) {
      navs = getPlatformSettingsNavs();
      setNav(NAV_KEY, navs);
    }
  }, []);

  return (
    <>
      <ListPageSide>
        <NavTitle
          icon={<Cogwheel variant="light" size={40} />}
          title={t('PLATFORM_SETTINGS')}
          subtitle={t('PLATFORM_SETTINGS_SELECTOR_DESC')}
          style={{ marginBottom: '20px' }}
        />
        <NavMenu navs={navs} prefix={'/settings'} pathname={location.pathname} />
      </ListPageSide>
      <ListPageMain>
        <Outlet />
      </ListPageMain>
    </>
  );
}

export default PlatformSettingsLayout;
