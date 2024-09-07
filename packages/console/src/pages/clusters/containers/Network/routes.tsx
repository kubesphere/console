/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

// import IPPools from './IPPools';
// import IPPoolDetail from './IPPools/Detail';
// import Workspaces from './IPPools/Detail/Workspaces';
// import IPPoolPods from './IPPools/Detail/Pods';
import IPPools from './IPPools/Embed';
import IPPoolDetail from './IPPools/Detail/Embed';

// import Policies from './Policies';
// import PoliciesDetail from './Policies/Detail';
import Policies from './Policies/Embed';
import PoliciesDetail from './Policies/Detail/Embed';

// import Viewer from './Policies/Detail/Viewer';

const PATH = '/clusters/:cluster';

const networkListRoutes = [
  {
    path: `${PATH}/ippools`,
    element: <IPPools />,
  },
  {
    path: `${PATH}/networkpolicies`,
    element: <Policies />,
  },
];

const networkDetailRoutes = [
  {
    path: `${PATH}/ippools/:name`,
    element: <IPPoolDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="workspaces" replace />,
      },
      {
        path: 'workspaces',
        element: <IPPoolDetail />,
      },
      {
        path: 'namespaces',
        element: <IPPoolDetail />,
      },
      {
        path: 'pods',
        element: <IPPoolDetail />,
      },
    ],
  },
  {
    path: `${PATH}/projects/:namespace/networkpolicies/:name`,
    element: <PoliciesDetail />,
    children: [
      { index: true, element: <Navigate to="egress" replace /> },
      {
        path: 'egress',
        element: <PoliciesDetail />,
        // element: <Viewer direction={'egress'} />,
      },
      {
        path: 'ingress',
        element: <PoliciesDetail />,
        // element: <Viewer direction={'ingress'} />,
      },
    ],
  },
];

export { networkListRoutes, networkDetailRoutes };
