import React from 'react';
import type { RouteObject } from 'react-router-dom';

import Login from './Login';
import LoginConfirm from './LoginConfirm';
import PasswordConfirm from './PasswordConfirm';

export const sessionRoutes: RouteObject[] = [
  { path: '/login', element: <Login /> },
  { path: '/login/confirm', element: <LoginConfirm /> },
  { path: '/password/confirm', element: <PasswordConfirm /> },
];
