import React from 'react';
import { Navigate } from 'react-router-dom';
import { kebabCase } from 'lodash';

import App from '../App';
import DocLayout from '../container/DocLayout';
import Slug from '../container/slug';
import menuData from './menuData';

const firstComponent = menuData.components?.[0].menu?.[0];
const indexPath = `/docs/components/${kebabCase(firstComponent)}`;

export default [
  {
    path: '/docs',
    element: <App />,
  },
  {
    path: '/docs/:category',
    element: <DocLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={indexPath} replace />,
      },
      {
        path: '/docs/:category/:slug',
        element: <Slug />,
      },
    ],
  },
];
