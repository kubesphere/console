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

import { getChildRoutes } from 'utils/router.config'

import GrayReleaseLayout from '../containers/GrayRelease'
import Categories from '../containers/GrayRelease/Categories'
import Jobs from '../containers/GrayRelease/Jobs'

const PATH = '/:workspace/clusters/:cluster/projects/:namespace/grayrelease'

const ROUTES = [
  { name: 'cates', title: 'GRAY_RELEASE_CATEGORIES', component: Categories },
  { name: 'jobs', title: 'Job Status', component: Jobs },
]

export default [
  {
    path: PATH,
    component: GrayReleaseLayout,
    routes: getChildRoutes(ROUTES, PATH),
  },
]
