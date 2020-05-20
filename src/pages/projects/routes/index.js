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

import { getIndexRoute } from 'utils/router.config'

import ProjectLayout from '../containers/layout'

import Overview from '../containers/Overview'
import CRDApps from '../containers/Applications/CRDApps'
import OPApps from '../containers/Applications/OPApps'
import Deployments from '../containers/Deployments'
import StatefulSets from '../containers/StatefulSets'
import DaemonSets from '../containers/DaemonSets'
import Pods from '../containers/Pods'
import Jobs from '../containers/Jobs'
import ImageBuilder from '../containers/ImageBuilder'
import CronJobs from '../containers/CronJobs'
import Services from '../containers/Services'
import GrayRelease from '../containers/GrayRelease'
import Routes from '../containers/Routes'
import Volumes from '../containers/Volumes'
import BaseInfo from '../containers/BaseInfo'
import ConfigMaps from '../containers/ConfigMaps'
import Secrets from '../containers/Secrets'
import Roles from '../containers/Roles'
import Members from '../containers/Members'
import AdvancedSettings from '../containers/AdvancedSettings'
import CustomMonitoring from '../containers/CustomMonitoring'
import NetworkPolicies from '../containers/Network/Policies'

import grayReleaseRoutes from './grayrelease'
import imageBuilderRoutes from './imagebuilder'

import detail from './detail'

const PATH = '/cluster/:cluster/projects/:namespace'

export default [
  ...detail,
  ...imageBuilderRoutes,
  {
    path: PATH,
    component: ProjectLayout,
    routes: [
      ...grayReleaseRoutes,
      {
        path: `${PATH}/overview`,
        component: Overview,
        exact: true,
      },
      {
        path: `${PATH}/applications/composing`,
        component: CRDApps,
        exact: true,
      },
      {
        path: `${PATH}/applications/template`,
        component: OPApps,
        exact: true,
      },
      {
        path: `${PATH}/deployments`,
        component: Deployments,
        exact: true,
      },
      {
        path: `${PATH}/statefulsets`,
        component: StatefulSets,
        exact: true,
      },
      {
        path: `${PATH}/daemonsets`,
        component: DaemonSets,
        exact: true,
      },
      { path: `${PATH}/pods`, component: Pods, exact: true },
      { path: `${PATH}/jobs`, component: Jobs, exact: true },
      {
        path: `${PATH}/s2ibuilders`,
        component: ImageBuilder,
        ksModule: 'devops',
        exact: true,
      },
      { path: `${PATH}/cronjobs`, component: CronJobs, exact: true },
      { path: `${PATH}/services`, component: Services, exact: true },
      {
        path: `${PATH}/grayrelease`,
        component: GrayRelease,
        ksModule: 'servicemesh',
        exact: true,
      },
      { path: `${PATH}/ingresses`, component: Routes, exact: true },
      { path: `${PATH}/volumes`, component: Volumes, exact: true },
      { path: `${PATH}/base-info`, component: BaseInfo, exact: true },
      {
        path: `${PATH}/networkpolicies`,
        component: NetworkPolicies,
        exact: true,
      },
      { path: `${PATH}/configmaps`, component: ConfigMaps, exact: true },
      { path: `${PATH}/secrets`, component: Secrets, exact: true },
      { path: `${PATH}/roles`, component: Roles, exact: true },
      { path: `${PATH}/members`, component: Members, exact: true },
      { path: `${PATH}/advanced`, component: AdvancedSettings, exact: true },
      {
        path: `${PATH}/custom-monitoring`,
        component: CustomMonitoring,
        exact: true,
      },
      getIndexRoute({
        path: `${PATH}/workloads`,
        to: `${PATH}/deployments`,
        exact: true,
      }),
      getIndexRoute({
        path: `${PATH}/applications`,
        to: `${PATH}/applications/${getDefaultAppType()}`,
        exact: true,
      }),
      getIndexRoute({ path: PATH, to: `${PATH}/overview`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]

function getDefaultAppType() {
  return globals.app.enableAppStore ? 'template' : 'composing'
}
