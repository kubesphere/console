/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { RouteObject } from 'react-router-dom';

import { Support } from './Support';

export const routes: RouteObject[] = [
  {
    path: '/support',
    element: <Support />,
  },
];
