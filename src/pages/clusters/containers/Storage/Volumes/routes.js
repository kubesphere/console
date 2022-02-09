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
 *
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import { getIndexRoute } from 'utils/router.config'

import Volume from './Volume'
import PV from '../PV'

const PATH = '/clusters/:cluster/volumes'
export default [
  {
    path: `${PATH}/Volumes`,
    title: 'VOLUME_PL',
    component: Volume,
    exact: true,
  },
  {
    path: `${PATH}/PV`,
    title: 'VOLUME_INSTANCE_PL',
    component: PV,
    exact: true,
  },
  getIndexRoute({
    path: PATH,
    to: `${PATH}/Volumes`,
    exact: true,
  }),
]
