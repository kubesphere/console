/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AlertMessages from './AlertMessages';
import AlertPolicies from './AlertPolicies';
import AlertPolicyDetail from './AlertPolicies/Detail';

const ALERT_POLICIES_PATH = 'alert-rules';
const ALERT_POLICY_DETAIL_CHILDREN: RouteObject[] = [
  { path: '', element: <Navigate to="rules" replace />, index: true },
  { path: ':tab', element: <AlertPolicyDetail /> },
];

const ALERT_BUILTIN_POLICY_DETAIL_CHILDREN: RouteObject[] = [
  { path: '', element: <Navigate to="rules" replace />, index: true },
  { path: ':tab', element: <AlertPolicyDetail type={'builtin'} /> },
];

export const alertingListRoutes: RouteObject[] = [
  {
    path: 'alerts',
    element: <AlertMessages />,
  },
  {
    path: ALERT_POLICIES_PATH,
    element: <AlertPolicies />,
  },
];

export const alertingDetailRoutes: RouteObject[] = [
  {
    path: ALERT_POLICIES_PATH,
    children: [
      {
        path: 'builtin/:name',
        children: ALERT_BUILTIN_POLICY_DETAIL_CHILDREN,
      },
      {
        path: ':name',
        children: ALERT_POLICY_DETAIL_CHILDREN,
      },
    ],
  },
];
