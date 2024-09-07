/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import Subscription from '../containers/Subscription';
import SubscriptionCreate from '../containers/Subscription/create';
import SubscriptionDetail from '../containers/Subscription/Detail';
import SubscriptionDetailEdit from '../containers/Subscription/Detail/edit';

const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="subscription-mail" replace />,
  },
  {
    path: ':tab',
    element: <Subscription />,
  },
  {
    path: ':tab/list',
    element: <Subscription />,
  },
  { path: ':tab/create', element: <SubscriptionCreate /> },
  {
    path: ':tab/detail/:name',
    element: <SubscriptionDetail />,
  },
  { path: ':tab/detail/:name/edit', element: <SubscriptionDetailEdit /> },
];

export default routes;
