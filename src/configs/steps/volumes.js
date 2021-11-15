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

import BaseInfo from 'components/Forms/Workload/BaseInfo'
import VolumeSettings from 'components/Forms/Volume/VolumeSettings'
import AdvanceSettings from 'components/Forms/Volume/AdvanceSettings'
import AccessModeSettings from 'components/Forms/Volume/VolumeSettings/AccessModeSelectForm'

export default [
  {
    title: 'BASIC_INFORMATION',
    icon: 'cdn',
    component: BaseInfo,
    required: true,
  },
  {
    title: 'STORAGE_SETTINGS',
    icon: 'storage',
    component: VolumeSettings,
    required: true,
  },
  {
    title: 'ADVANCED_SETTINGS',
    icon: 'slider',
    component: AdvanceSettings,
    required: true,
  },
]

export const APPLY_SNAPSHOT_FORM_STEPS = [
  {
    title: 'BASIC_INFORMATION',
    icon: 'cdn',
    component: BaseInfo,
    required: true,
  },
  {
    title: 'VOLUME_SETTINGS',
    icon: 'storage',
    component: AccessModeSettings,
    required: true,
  },
  {
    title: 'ADVANCED_SETTINGS',
    icon: 'slider',
    component: AdvanceSettings,
    required: true,
  },
]
