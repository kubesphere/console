/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

// import Secrets from './Secrets';
// import ConfigMaps from './Configmaps';
// import ServiceAccounts from './ServiceAccounts';
import SecretDetail from './Secrets/Detail';
import SecretsData from './Secrets/Detail/Data';
import ConfigMapDetail from './Configmaps/Detail';
import ConfigMapData from './Configmaps/Detail/Data';
import ServiceAccountsDetail from './ServiceAccounts/Detail';
import ServiceAccountsData from './ServiceAccounts/Detail/Data';

// embed
import SecretsList from './Secrets/Embed';
import ConfigMaps from './Configmaps/Embed';
import ServiceAccounts from './ServiceAccounts/Embed';

const PATH = '/clusters/:cluster';

const configListRoutes = [
  {
    path: `${PATH}/secrets`,
    element: <SecretsList />,
  },
  {
    path: `${PATH}/configmaps`,
    element: <ConfigMaps />,
  },
  {
    path: `${PATH}/serviceaccounts`,
    element: <ServiceAccounts />,
  },
];

const configDetailRoutes = [
  {
    path: `${PATH}/projects/:namespace/secrets/:name`,
    element: <SecretDetail />,
    children: [
      { index: true, element: <Navigate to="detail" replace /> },
      {
        path: 'detail',
        element: <SecretsData />,
      },
    ],
  },
  {
    path: `${PATH}/projects/:namespace/configmaps/:name`,
    element: <ConfigMapDetail />,
    children: [
      { index: true, element: <Navigate to="detail" replace /> },
      {
        path: 'detail',
        element: <ConfigMapData />,
      },
    ],
  },
  {
    path: `${PATH}/projects/:namespace/serviceaccounts/:name`,
    element: <ServiceAccountsDetail />,
    children: [
      { index: true, element: <Navigate to="detail" replace /> },
      {
        path: 'detail',
        element: <ServiceAccountsData />,
      },
    ],
  },
];

export { configListRoutes, configDetailRoutes };
