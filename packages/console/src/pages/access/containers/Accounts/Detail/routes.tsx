import React from 'react';
import { Navigate } from 'react-router-dom';

import LoginHistory from './components/LoginHistory';
import AccountDetail from './index';

const indexPath = 'login-history';

export default [
  {
    path: '/access/accounts/:name',
    element: <AccountDetail />,
    children: [
      {
        index: true,
        element: <Navigate to={indexPath} replace />,
      },
      {
        path: indexPath,
        element: <LoginHistory />,
      },
    ],
  },
];
