/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Openpitrix } from '@kubed/icons';
import { Outlet, useLocation } from 'react-router-dom';

import { ListPageSide, ListPageMain, NavMenu, NavTitle, useGlobalStore } from '@ks-console/shared';

const NAV_KEY = 'WORKSPACE_NAV';

function ListLayout(): JSX.Element {
  const location = useLocation();
  const { getNav, setNav } = useGlobalStore();
  let navs = getNav(NAV_KEY);

  useEffect(() => {
    if (!navs) {
      setNav(NAV_KEY, globals.config.manageAppNavs);
    }
  }, []);

  return (
    <>
      <ListPageSide>
        <NavTitle
          icon={<Openpitrix variant="light" size={40} />}
          title={t('APP_STORE_MANAGEMENT')}
          style={{ marginBottom: '20px' }}
        />
        <NavMenu navs={navs} prefix={`/apps-manage`} pathname={location.pathname} />
      </ListPageSide>
      <ListPageMain>
        <Outlet />
      </ListPageMain>
    </>
  );
}

export default ListLayout;
