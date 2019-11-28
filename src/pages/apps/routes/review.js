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

import ReviewsLayout from '../containers/Reviews'
import Unprocessed from '../containers/Reviews/Unprocessed'
import Processed from '../containers/Reviews/Processed'
import All from '../containers/Reviews/All'

const PATH = '/apps-manage/reviews'

const ROUTES = [
  { name: 'unprocessed', title: 'Unprocessed', component: Unprocessed },
  { name: 'processed', title: 'Processed', component: Processed },
  { name: 'all', title: 'All', component: All },
]

export default [
  {
    path: PATH,
    component: ReviewsLayout,
    routes: getChildRoutes(ROUTES, PATH),
  },
]
