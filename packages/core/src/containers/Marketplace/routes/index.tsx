/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { RouteObject } from 'react-router-dom';

import { MARKETPLACE_PAGE_PATH } from '../../../constants/marketplace';
import AuthCallback from '../AuthCallback';
import AuthException from '../AuthException';
import SubscribeCallback from '../SubscribeCallback';

const routes: RouteObject[] = [
  {
    path: MARKETPLACE_PAGE_PATH.auth.callback,
    element: <AuthCallback />,
  },
  {
    path: MARKETPLACE_PAGE_PATH.auth.exception,
    element: <AuthException />,
  },
  {
    path: MARKETPLACE_PAGE_PATH.subscribe.callback,
    element: <SubscribeCallback />,
  },
];

export default routes;
