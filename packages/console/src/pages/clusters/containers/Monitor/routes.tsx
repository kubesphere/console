import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

import ClusterMonitor from './Cluster';
import ResourceMonitor from './Resource';
import CustomMonitoring from './CustomMonitoring';

const PATH = '/clusters/:cluster';

const routes: RouteObject[] = [
  {
    path: `${PATH}/monitor-cluster`,
    element: <Navigate to="overview" replace />,
  },
  {
    path: `${PATH}/monitor-cluster/:tab`,
    element: <ClusterMonitor />,
  },
  {
    path: `${PATH}/monitor-resource`,
    element: <Navigate to="usage" replace />,
  },
  {
    path: `${PATH}/monitor-resource/:tab`,
    element: <ResourceMonitor />,
  },
  {
    path: `${PATH}/custom-monitoring`,
    element: <CustomMonitoring />,
  },
];

export default routes;
