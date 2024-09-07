/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { Navigate, RouteObject } from 'react-router-dom';

import { NavMenuItemTab } from '@ks-console/shared';

import { getNotificationConfigurationTabs } from '../utils/navs';

const tabs: NavMenuItemTab[] = getNotificationConfigurationTabs();
const indexRoutePath = get(tabs, '[0].name', '/404');

const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={indexRoutePath} replace />,
  },
  {
    path: '/settings/channel-configuration/:tab',
    element: <></>,
  },
];

export default routes;
