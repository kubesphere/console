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

import React from 'react'

import { getLocalTime } from 'utils'
import { Icon } from '@pitrix/lego-ui'
import { inject } from 'mobx-react'

import AdminDashboard from './Admin'
import UserDashboard from './User'

import styles from './index.scss'

const ROLESMAP = {
  'cluster-admin': 'Super administrator',
  'workspaces-manager': 'Workspaces Manager',
  'cluster-regular': 'Regular user',
}

@inject('rootStore')
class Dashboard extends React.Component {
  componentWillMount() {
    if (
      !globals.app.isClusterAdmin &&
      globals.app.hasPermission({ module: 'workspaces', action: 'manage' })
    ) {
      this.props.rootStore.routing.push('/workspaces')
    }
  }

  getRoleText = role => ROLESMAP[role] || globals.user.cluster_role

  renderHeader() {
    const { avatar_url, cluster_role, username, last_login_time } =
      globals.user || {}
    const roleText = t(this.getRoleText(cluster_role))
    const loginTime = `${t('Last login time')}: ${getLocalTime(
      last_login_time
    ).format(`YYYY-MM-DD HH:mm:ss`)}`

    return (
      <div className={styles.header} data-test="dashboard-header">
        <div className={styles.avatar}>
          <img src={avatar_url || '/assets/default-user.svg'} />
        </div>
        <div className={styles.title}>
          <strong>{t('DASHBOARD_TITLE', { username })}</strong>
          <div className={styles.info}>
            <p>
              <Icon name="role" size={16} />
              {roleText}
            </p>
            <p>
              <Icon name="clock" size={16} />
              {loginTime}
            </p>
          </div>
        </div>
      </div>
    )
  }

  renderContent() {
    if (globals.app.isClusterAdmin) {
      return <AdminDashboard />
    }

    return <UserDashboard />
  }

  render() {
    return (
      <div className={styles.dashboard}>
        <div className={styles.wrapper}>
          {this.renderHeader()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

export default Dashboard
