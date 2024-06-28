import React from 'react';
import { Navigate } from 'react-router-dom';

export default [
  {
    index: true,
    element: <Navigate to="components" replace />,
  },
  {
    path: 'components',
    element: <></>,
  },
  {
    path: 'traffic',
    element: <></>,
  },
  {
    path: 'grayrelease',
    element: <></>,
  },
  {
    path: 'tracing',
    element: <></>,
  },
];
