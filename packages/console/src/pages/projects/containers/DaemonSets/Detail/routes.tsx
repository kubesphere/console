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
    path: 'revision-control',
    element: <></>,
  },
  {
    path: 'metadata',
    element: <></>,
  },
  {
    path: 'monitors',
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
