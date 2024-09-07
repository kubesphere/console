/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import Detail from './index';

const PATH = '/workspaces/:workspace/gateways/:component/:gatewayName';
export default [
  {
    path: PATH,
    element: <Detail />,
    children: [
      {
        path: 'monitors',
        element: <></>,
      },
      {
        path: 'gateway-configs',
        element: <></>,
      },
      {
        path: 'logs',
        element: <></>,
      },
      {
        path: 'resource-status',
        element: <></>,
      },
      {
        path: 'metadata',
        element: <></>,
      },
    ],
  },
];
