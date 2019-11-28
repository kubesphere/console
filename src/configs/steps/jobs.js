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

import { withProps } from 'utils'

import BaseInfo from 'components/Forms/Workload/BaseInfo'
import VolumeSettings from 'components/Forms/Workload/VolumeSettings'
import AdvanceSettings from 'components/Forms/Workload/AdvanceSettings'

import JobSettings from 'components/Forms/Job/JobSettings'
import ContainerSettings from 'components/Forms/Job/ContainerSettings'

export default [
  {
    title: 'Basic Info',
    icon: 'cdn',
    component: withProps(BaseInfo, { maxNameLength: 63 }),
    required: true,
  },
  {
    title: 'Job Settings',
    icon: 'job',
    component: JobSettings,
    required: true,
  },
  {
    title: 'Container Image',
    icon: 'docker',
    component: ContainerSettings,
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
]
