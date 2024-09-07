/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cluster } from '@kubed/icons';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import {
  ListPageSide,
  ListPageMain,
  NavTitle,
  NavMenu,
  useGlobalStore,
  permissionStore,
} from '@ks-console/shared';

const NAV_KEY = 'FED_PROJECT_NAV';

function ListLayout(): JSX.Element {
  const { workspace, namespace } = useParams<'workspace' | 'namespace'>();
  const location = useLocation();
  const { getNav, setNav } = useGlobalStore();
  const { getfederatedProjectNavs } = permissionStore();
  let navs = getNav(NAV_KEY);

  useEffect(() => {
    if (!navs) {
      navs = getfederatedProjectNavs();
      setNav(NAV_KEY, navs);
    }
  }, []);

  return (
    <>
      <ListPageSide>
        <NavTitle
          title={t('MULTI_CLUSTER_PROJECT_SCAP')}
          icon={<Cluster variant="light" size={40} />}
          style={{ marginBottom: '20px' }}
        />
        <NavMenu
          navs={navs}
          prefix={`/${workspace}/federatedprojects/${namespace}`}
          pathname={location.pathname}
        />
      </ListPageSide>
      <ListPageMain>
        <Outlet />
      </ListPageMain>
    </>
  );
}

export default ListLayout;
