import React from 'react';
import type { RouteObject } from 'react-router-dom';

import { Forbidden } from './403';

export const errorRoutes: RouteObject[] = [
  {
    path: 'errors',
    children: [
      {
        path: '403',
        element: <Forbidden />,
      },
    ],
  },
];
