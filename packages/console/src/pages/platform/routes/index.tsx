/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import BaseInfo from '../containers/BaseInfo';
// import BaseInfo from '../containers/BaseInfo/Embed';
import SettingsLayout from '../containers/SettingsLayout';
// import NotificationConfigurationRoutes from './notificationConfig';
// import NotificationSubscriptionRoutes from './subscriptionConfig';
// import NotificationConfiguration from '../containers/NotificationConfiguration';
import Dashboard from '../containers/Dashboard';
// import History from '../containers/History';
// import SilentPolicy from '../containers/SilentPolicy';
// import NotificationLanguage from '../containers/NotificationLanguage';

// import SilentPolicyRoutes from '../containers/SilentPolicy/Detail/routes';

const routes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/settings',
    element: <SettingsLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="base-info" replace />,
      },
      {
        path: 'base-info',
        element: <BaseInfo />,
      },
      // {
      //   path: 'channel-configuration',
      //   element: <NotificationConfiguration />,
      //   children: NotificationConfigurationRoutes,
      // },
      // {
      //   path: 'notification-history',
      //   element: <History />,
      // },
      // {
      //   path: 'silent-policy',
      //   element: <SilentPolicy />,
      // },
      // {
      //   path: 'notification-language',
      //   element: <NotificationLanguage />,
      // },
      // {
      //   path: 'notification-subscription',
      //   children: NotificationSubscriptionRoutes,
      // },
    ],
  },
  // {
  //   path: '/settings/notification-configuration',
  //   element: <SettingsLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="/settings/silent-policy" replace />,
  //     },
  //   ],
  // },
  // ...SilentPolicyRoutes,
];

export default routes;
