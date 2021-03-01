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
import EmailConfigs from '../containers/EmailConfigs'
import EmailReceivers from '../containers/EmailReceivers'
import WeComConfigs from '../containers/WeComConfigs'
import WeComReceivers from '../containers/WeComReceivers'
import WebhookConfigs from '../containers/WebhookConfigs'
import SlackConfigs from '../containers/SlackConfigs'
import SlackReceivers from '../containers/SlackReceivers'
import DingTalkConfigs from '../containers/DingTalkConfigs'
import DingTalkReceivers from '../containers/DingTalkReceivers'
import Secrets from '../containers/Secrets'

import getDetailPath from './detail'

const PATH = '/settings'

const navs = globals.app.getPlatformSettingsNavs()
const indexRoute = get(navs, '[0].items[0].name', 'nodes')

export default [
  ...getDetailPath(PATH),
  {
    path: PATH,
    component: Layout,
    routes: [
      {
        path: `${PATH}/base-info`,
        component: BaseInfo,
      },
      {
        path: `${PATH}/email-configs`,
        component: EmailConfigs,
      },
      {
        path: `${PATH}/email-receivers`,
        component: EmailReceivers,
      },
      {
        path: `${PATH}/wecom-configs`,
        component: WeComConfigs,
      },
      {
        path: `${PATH}/wecom-receivers`,
        component: WeComReceivers,
      },
      {
        path: `${PATH}/webhook-configs`,
        component: WebhookConfigs,
      },
      {
        path: `${PATH}/slack-configs`,
        component: SlackConfigs,
      },
      {
        path: `${PATH}/slack-receivers`,
        component: SlackReceivers,
      },
      {
        path: `${PATH}/dingtalk-configs`,
        component: DingTalkConfigs,
      },
      {
        path: `${PATH}/dingtalk-receivers`,
        component: DingTalkReceivers,
      },
      {
        path: `${PATH}/Secrets`,
        component: Secrets,
      },
      {
        path: `${PATH}/third-login`,
        component: ThirdPartyLogin,
      },
      getIndexRoute({ path: PATH, to: `${PATH}/${indexRoute}`, exact: true }),
      getIndexRoute({ path: '*', to: '/404', exact: true }),
    ],
  },
]
