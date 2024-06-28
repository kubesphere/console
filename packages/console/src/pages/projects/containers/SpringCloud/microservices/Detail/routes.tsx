import React from 'react';
import { Navigate } from 'react-router-dom';

export default [
  {
    index: true,
    element: <Navigate to="instances" replace />,
  },
  {
    path: 'instances',
    element: <></>,
  },
  {
    path: 'metadata',
    element: <></>,
  },
  {
    path: 'events',
    element: <></>,
  },
];
