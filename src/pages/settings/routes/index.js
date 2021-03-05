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

import { get } from 'lodash'
import { getIndexRoute } from 'utils/router.config'

import Layout from '../containers/layout'
import BaseInfo from '../containers/BaseInfo'
import ThirdPartyLogin from '../containers/ThirdPartyLogin'
import Mail from '../containers/Notification/Mail'
import DingTalk from '../containers/Notification/DingTalk'
import WeCom from '../containers/Notification/WeCom'
import Slack from '../containers/Notification/Slack'
import Webhook from '../containers/Notification/Webhook'

const PATH = '/settings'

const navs = globals.app.getPlatformSettingsNavs()
const indexRoute = get(navs, '[0].items[0].name', 'nodes')

export default [
  {
    path: PATH,
    component: Layout,
    routes: [
      {
        path: `${PATH}/base-info`,
        component: BaseInfo,
      },
      {
        path: `${PATH}/third-login`,
        component: ThirdPartyLogin,
      },
      {
        path: `${PATH}/mail`,
        component: Mail,
      },
      {
        path: `${PATH}/dingtalk`,
        component: DingTalk,
      },
      {
        path: `${PATH}/wecom`,
        component: WeCom,
      },
      {
        path: `${PATH}/slack`,
        component: Slack,
      },
      {
        path: `${PATH}/webhook`,
        component: Webhook,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/${indexRoute}`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
