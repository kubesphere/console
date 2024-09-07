/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

export default [
  {
    index: true,
    element: <Navigate to="data" replace />,
  },
  {
    path: 'data',
    element: <></>,
  },
  {
    path: 'history',
    element: <></>,
  },
  {
    path: 'events',
    element: <></>,
  },
];
