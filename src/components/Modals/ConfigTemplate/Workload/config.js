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
import ClusterDiffSettings from 'components/EditForms/Workload/ClusterDiffSettings'

export default {
  deployments: [
    {
      icon: 'dashboard',
      name: 'updateStrategy',
      title: 'Update Strategy',
      component: UpdateStrategy,
    },
    {
      icon: 'container',
      name: 'podTemplate',
      title: 'Pod Template',
      component: PodTemplate,
    },
    {
      icon: 'storage',
      name: 'volumeSettings',
      title: 'Volume',
      component: VolumeSettings,
    },
    {
      icon: 'group',
      name: 'deploymentMode',
      title: 'Deployment Mode',
      component: Affinity,
    },
    {
      icon: 'blue-green-deployment',
      name: 'clusterDiffSettings',
      title: 'Diff Settings',
      isFederated: true,
      component: ClusterDiffSettings,
    },
  ],
  statefulsets: [
    {
      icon: 'dashboard',
      name: 'updateStrategy',
      title: 'Update Strategy',
      component: UpdateStrategy,
    },
    {
      icon: 'container',
      name: 'podTemplate',
      title: 'Pod Template',
      component: PodTemplate,
    },
    {
      icon: 'storage',
      name: 'volumeSettings',
      title: 'Volume',
      component: VolumeSettings,
    },
    {
      icon: 'blue-green-deployment',
      name: 'clusterDiffSettings',
      title: 'Diff Settings',
      isFederated: true,
      component: ClusterDiffSettings,
    },
  ],
  daemonsets: [
    {
      icon: 'dashboard',
      name: 'updateStrategy',
      title: 'Update Strategy',
      component: UpdateStrategy,
    },
    {
      icon: 'container',
      name: 'podTemplate',
      title: 'Pod Template',
      component: PodTemplate,
    },
    {
      icon: 'storage',
      name: 'volumeSettings',
      title: 'Volume',
      component: VolumeSettings,
    },
  ],
}
