/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import { lazy } from 'react'

import BaseLayout from 'core/layouts/Base'
import Login from 'core/containers/Login'
import LoginConfirm from 'core/containers/LoginConfirm'
import PasswordConfirm from 'core/containers/PasswordConfirm'

const Console = lazy(() =>
  import(/* webpackChunkName: "console" */ 'console/App.jsx')
)
const Clusters = lazy(() =>
  import(/* webpackChunkName: "clusters" */ 'clusters/App.jsx')
)
const AccessControl = lazy(() =>
  import(/* webpackChunkName: "access" */ 'access/App.jsx')
)
const Settings = lazy(() =>
  import(/* webpackChunkName: "settings" */ 'settings/App.jsx')
)
const Workspaces = lazy(() =>
  import(/* webpackChunkName: "workspaces" */ 'workspaces/App.jsx')
)
const Projects = lazy(() =>
  import(/* webpackChunkName: "projects" */ 'projects/App.jsx')
)
const FederatedProjects = lazy(() =>
  import(/* webpackChunkName: "fedprojects" */ 'fedprojects/App.jsx')
)
const DevOps = lazy(() =>
  import(/* webpackChunkName: "devops" */ 'devops/App.jsx')
)
const App = lazy(() => import(/* webpackChunkName: "apps" */ 'apps/App.jsx'))

export default [
  { path: `/login`, component: Login, exact: true },
  { path: `/login/confirm`, component: LoginConfirm, exact: true },
  { path: `/password/confirm`, component: PasswordConfirm, exact: true },
  {
    component: BaseLayout,
    routes: [
      {
        path: '/clusters',
        component: Clusters,
      },
      {
        path: '/access',
        component: AccessControl,
      },
      {
        path: '/:workspace/clusters/:cluster/projects/:namespace',
        component: Projects,
      },
      {
        path: '/:workspace/clusters/:cluster/devops/:devops',
        component: DevOps,
      },
      {
        path: '/:workspace/federatedprojects/:namespace',
        component: FederatedProjects,
      },
      {
        path: '/workspaces/:workspace',
        component: Workspaces,
      },
      {
        path: '/apps',
        component: App,
      },
      {
        path: '/apps-manage',
        component: App,
      },
      {
        path: '/settings',
        component: Settings,
      },
      {
        path: '*',
        component: Console,
      },
    ],
  },
]
