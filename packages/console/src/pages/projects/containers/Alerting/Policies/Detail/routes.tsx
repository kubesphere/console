import React from 'react';
import { Navigate } from 'react-router-dom';

export default [
  {
    index: true,
    element: <Navigate to="rules" replace />,
  },
  {
    path: 'rules',
    element: <></>,
  },
  {
    path: 'messages',
    element: <></>,
  },
];
