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

import UpdateStrategy from 'components/EditForms/Workload/UpdateStrategy'
import PodTemplate from 'components/EditForms/Workload/PodTemplate'
import VolumeSettings from 'components/EditForms/Workload/VolumeSettings'
import Affinity from 'components/EditForms/Workload/Affinity'
import ServiceSetting from 'fedprojects/components/ServiceSetting'
import ClusterDiffSettings from 'fedprojects/components/ClusterDiffSettings'
import TerminationSeconds from 'components/EditForms/Workload/TerminationSeconds'

export default {
  deployments: [
    {
      icon: 'dashboard',
      name: 'updateStrategy',
      title: 'UPDATE_STRATEGY',
      component: UpdateStrategy,
    },
    {
      icon: 'container',
      name: 'podTemplate',
      title: 'CONTAINER_PL',
      component: PodTemplate,
    },
    {
      icon: 'storage',
      name: 'volumeSettings',
      title: 'STORAGE',
      component: VolumeSettings,
    },
    {
      icon: 'group',
      name: 'deploymentMode',
      title: 'POD_SCHEDULING_RULES',
      component: Affinity,
    },
    {
      icon: 'forbid-right-duotone',
      name: 'podMode',
      title: 'POD_GRACE_PERIOD',
      component: TerminationSeconds,
    },
    {
      title: 'CLUSTER_DIFF',
      icon: 'blue-green-deployment',
      name: 'Diff Settings',
      component: ClusterDiffSettings,
    },
  ],
  statefulsets: [
    {
      icon: 'dashboard',
      name: 'updateStrategy',
      title: 'UPDATE_STRATEGY',
      component: UpdateStrategy,
    },
    {
      icon: 'container',
      name: 'podTemplate',
      title: 'CONTAINER_PL',
      component: PodTemplate,
    },
    {
      icon: 'forbid-right-duotone',
      name: 'podMode',
      title: 'POD_GRACE_PERIOD',
      component: TerminationSeconds,
    },
    {
      icon: 'storage',
      name: 'volumeSettings',
      title: 'STORAGE',
      component: VolumeSettings,
    },
    {
      title: 'CLUSTER_DIFF',
      icon: 'blue-green-deployment',
      name: 'Diff Settings',
      component: ClusterDiffSettings,
    },
  ],
  service: [
    {
      icon: 'network-router',
      name: 'editService',
      title: 'SERVICE_SETTINGS',
      component: ServiceSetting,
    },
    {
      title: 'CLUSTER_DIFF',
      icon: 'blue-green-deployment',
      name: 'Diff Settings',
      component: ClusterDiffSettings,
    },
  ],
}
