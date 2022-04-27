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

import BaseInfo from 'components/Forms/CronJob/BaseInfo'
import JobSettings from 'components/Forms/Job/JobSettings'
import ContainerSettings from 'components/Forms/Job/ContainerSettings'
import VolumeSettings from 'components/Forms/Workload/VolumeSettings'
import AdvanceSettings from 'components/Forms/Workload/AdvanceSettings'

export default [
  {
    title: 'BASIC_INFORMATION',
    icon: 'cdn',
    component: BaseInfo,
    required: true,
  },
  {
    title: 'STRATEGY_SETTINGS',
    icon: 'cron-job',
    component: withProps(JobSettings, { prefix: 'spec.jobTemplate.spec.' }),
    required: true,
  },
  {
    title: 'POD_SETTINGS',
    icon: 'docker',
    component: withProps(ContainerSettings, {
      prefix: 'spec.jobTemplate.spec.template.',
    }),
    required: true,
  },
  {
    title: 'STORAGE_SETTINGS',
    icon: 'storage',
    component: withProps(VolumeSettings, {
      prefix: 'spec.jobTemplate.spec.template.',
    }),
    required: true,
  },
  {
    title: 'ADVANCED_SETTINGS',
    icon: 'slider',
    component: withProps(AdvanceSettings, {
      prefix: 'spec.jobTemplate.spec.template.',
    }),
    required: true,
  },
]
