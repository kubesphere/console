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

import GrayReleaseBaseInfo from 'components/Forms/GrayRelease/BaseInfo'
import GrayReleaseComponents from 'components/Forms/GrayRelease/Components'
import GrayReleaseVersion from 'components/Forms/GrayRelease/Version'
import PolicyConfig from 'components/Forms/GrayRelease/PolicyConfig'

export default [
  {
    title: 'BASIC_INFORMATION',
    component: GrayReleaseBaseInfo,
    required: true,
  },
  {
    title: 'SERVICE_SETTINGS',
    component: GrayReleaseComponents,
    required: true,
  },
  {
    title: 'NEW_VERSION_SETTINGS',
    component: GrayReleaseVersion,
    required: true,
  },
  {
    title: 'STRATEGY_SETTINGS',
    component: PolicyConfig,
    required: true,
  },
]
