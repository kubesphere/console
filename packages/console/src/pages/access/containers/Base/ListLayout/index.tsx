/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Key } from '@kubed/icons';
import { ListPageSide, ListPageMain, NavTitle, NavMenu, useGlobalStore } from '@ks-console/shared';

import { getAccessNavs } from '../../../utils/navs';

const navKey = 'ACCESS_NAVS';

function ListLayout() {
  const location = useLocation();
  const { getNav, setNav } = useGlobalStore();
  let navs = getNav(navKey);

  useEffect(() => {
    if (!navs) {
      navs = getAccessNavs();
      setNav(navKey, navs);
    }
  }, []);

  return (
    <>
      <ListPageSide>
        <NavTitle
          icon={<Key variant="light" size={40} />}
          title={t('USER_AND_ROLE_MANAGEMENT')}
          style={{ marginBottom: '20px' }}
        />
        <NavMenu navs={navs} prefix="." pathname={location.pathname} />
      </ListPageSide>
      <ListPageMain>
        <Outlet />
      </ListPageMain>
    </>
  );
}

export default ListLayout;
