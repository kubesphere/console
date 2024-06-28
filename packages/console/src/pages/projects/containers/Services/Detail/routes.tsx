import React from 'react';
import { Navigate } from 'react-router-dom';

export default [
  {
    index: true,
    element: <Navigate to="resource-status" replace />,
  },
  {
    path: 'resource-status',
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
