/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import NodesDetail from './index';
import MeData from './MeData';
import Pods from './Pods';
import RunningStatus from './RunningStatus';
import Events from './Events';
import Monitorings from './Monitoring';

const PATH = '/clusters/:cluster';
const routes: RouteObject[] = [
  {
    path: `${PATH}/nodes/:name`,
    element: <NodesDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="status" />,
      },
      {
        path: 'metadata',
        element: <MeData />,
      },
      {
        path: 'pods',
        element: <Pods />,
      },
      {
        path: 'monitors',
        element: <Monitorings />,
      },
      {
        path: 'status',
        element: <RunningStatus />,
      },
      {
        path: 'events',
        element: <Events />,
      },
    ],
  },
];
export default routes;
