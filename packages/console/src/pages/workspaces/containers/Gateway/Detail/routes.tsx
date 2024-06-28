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
