import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cogwheel } from '@kubed/icons';
import { Outlet, useLocation } from 'react-router-dom';
import { NavTitle, NavMenu, useGlobalStore } from '@ks-console/shared';

import { NAV_KEY } from '../../constants';
import { ListPageSide, permissionStore } from '@ks-console/shared';
const { getPlatformSettingsNavs } = permissionStore();

const PageMain = styled.div`
  margin-left: 240px;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

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
      <PageMain>
        <Outlet />
      </PageMain>
    </>
  );
}

export default PlatformSettingsLayout;
