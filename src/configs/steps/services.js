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

import { withProps, composeComponent } from 'utils'

import BaseInfo from 'components/Forms/Service/BaseInfo'
import ContainerSettings from 'components/Forms/Workload/ContainerSettings'
import VolumeSettings from 'components/Forms/Workload/VolumeSettings'
import AdvanceSettings from 'components/Forms/Service/AdvanceSettings'
import ExternalName from 'components/Forms/Service/ExternalName'
import ServiceSettings from 'components/Forms/Service/ServiceSettings'
import StatefulSetting from 'components/Forms/Service/StatefulSetting'
import B2IForm from 'components/Forms/ImageBuilder/B2IForm'
import S2IForm from 'components/Forms/ImageBuilder/S2IForm'
import S2iContainerSetting from 'components/Forms/Service/ContainerSetting'

export default {
  statelessservice: [
    { title: 'Basic Info', icon: 'cdn', component: BaseInfo, required: true },
    {
      title: 'Container Image',
      icon: 'docker',
      component: withProps(ContainerSettings, { withService: true }),
      required: true,
    },
    {
      title: 'Mount Volumes',
      icon: 'storage',
      component: VolumeSettings,
      required: true,
    },
    {
      title: 'Advanced Settings',
      icon: 'slider',
      component: AdvanceSettings,
      required: true,
    },
  ],
  statefulservice: [
    { title: 'Basic Info', icon: 'cdn', component: BaseInfo, required: true },
    {
      title: 'Container Image',
      icon: 'docker',
      component: withProps(ContainerSettings, { withService: true }),
      required: true,
    },
    {
      title: 'Mount Volumes',
      icon: 'storage',
      component: VolumeSettings,
      required: true,
    },
    {
      title: 'Advanced Settings',
      icon: 'slider',
      component: AdvanceSettings,
      required: true,
    },
  ],
  externalservice: [
    {
      title: 'Basic Info',
      icon: 'cdn',
      component: withProps(BaseInfo, { noWorkload: true }),
      required: true,
    },
    {
      title: 'External Name',
      icon: 'strategy-group',
      component: ExternalName,
      required: true,
    },
  ],
  simpleservice: [
    {
      title: 'Basic Info',
      icon: 'cdn',
      component: withProps(BaseInfo, { noWorkload: true }),
      required: true,
    },
    { title: 'Service Settings', component: ServiceSettings, required: true },
    {
      title: 'Advanced Settings',
      icon: 'slider',
      component: withProps(AdvanceSettings, { noWorkload: true }),
      required: true,
    },
  ],
  b2iservice: [
    { title: 'Basic Info', icon: 'cdn', component: BaseInfo, required: true },
    {
      title: 'Build Settings',
      icon: 'strategy-group',
      component: composeComponent(
        StatefulSetting,
        withProps(B2IForm, { prefix: 'S2i' })
      ),
      required: true,
    },
    {
      title: 'Container Settings',
      icon: 'docker',
      component: withProps(S2iContainerSetting, { withService: true }),
      required: true,
    },
    {
      title: 'Mount Volumes',
      icon: 'storage',
      component: VolumeSettings,
      required: true,
    },
    {
      title: 'Advanced Settings',
      icon: 'slider',
      component: AdvanceSettings,
      required: true,
    },
  ],
  s2iservice: [
    { title: 'Basic Info', icon: 'cdn', component: BaseInfo, required: true },
    {
      title: 'Build Settings',
      icon: 'strategy-group',
      component: composeComponent(
        StatefulSetting,
        withProps(S2IForm, { prefix: 'S2i' })
      ),
      required: true,
    },
    {
      title: 'Container Settings',
      icon: 'docker',
      component: withProps(S2iContainerSetting, { withService: true }),
      required: true,
    },
    {
      title: 'Mount Volumes',
      icon: 'storage',
      component: VolumeSettings,
      required: true,
    },
    {
      title: 'Advanced Settings',
      icon: 'slider',
      component: AdvanceSettings,
      required: true,
    },
  ],
}
