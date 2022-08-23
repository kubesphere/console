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

import Providers from 'components/Forms/Cluster/Providers'
import BaseInfo from 'components/Forms/Cluster/BaseInfo'
import Configuration from 'components/Forms/Cluster/Configuration'
import ClusterSettings from 'components/Forms/Cluster/ClusterSettings'
import ServiceComponents from 'components/Forms/Cluster/ServiceComponents'
import AdvanceSettings from 'components/Forms/Cluster/AdvanceSettings'

export const IMPORT_CLUSTER = [
  // {
  //   title: 'How to Add',
  //   component: Providers,
  //   required: true,
  // },
  {
    title: 'BASIC_INFORMATION',
    component: BaseInfo,
    required: true,
  },
  {
    title: 'CONNECTION_SETTINGS',
    component: Configuration,
    required: true,
    isForm: false,
  },
]

export const NEW_CLUSTER = [
  {
    title: 'HOW_TO_ADD',
    component: Providers,
    required: true,
  },
  {
    title: 'BASIC_INFORMATION',
    component: BaseInfo,
    required: true,
  },
  {
    title: 'CONNECTION_SETTINGS',
    component: ClusterSettings,
    required: true,
  },
  {
    title: 'SYSTEM_COMPONENT_PL',
    component: ServiceComponents,
    required: true,
  },
  {
    title: 'ADVANCED_SETTINGS',
    component: AdvanceSettings,
    required: true,
  },
]
