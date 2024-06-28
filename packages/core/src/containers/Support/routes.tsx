import React from 'react';
import type { RouteObject } from 'react-router-dom';

import { Support } from './Support';

export const routes: RouteObject[] = [
  {
    path: '/support',
    element: <Support />,
  },
];
