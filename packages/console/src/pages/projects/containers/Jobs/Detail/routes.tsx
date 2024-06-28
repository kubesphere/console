import React from 'react';
import { Navigate } from 'react-router-dom';

export default [
  {
    index: true,
    element: <Navigate to="records" replace />,
  },
  {
    path: 'records',
    element: <></>,
    exact: true,
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
    path: 'env',
    element: <></>,
  },
  {
    path: 'events',
    element: <></>,
  },
];
