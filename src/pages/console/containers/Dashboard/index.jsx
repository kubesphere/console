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
import { isEmpty } from 'lodash'

import { getLocalTime } from 'utils'
import { Icon } from '@kube-design/components'
import { inject } from 'mobx-react'

import EmptyList from 'components/Cards/EmptyList'
import AdminDashboard from './Admin'

import styles from './index.scss'

@inject('rootStore')
class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    if (!globals.app.isPlatformAdmin) {
      if (globals.user.globalrole === 'users-manager') {
        return this.routing.push(`/access/accounts`)
      }

      if (globals.app.getActions({ module: 'workspaces' }).includes('create')) {
        return this.routing.push(`/access/workspaces`)
      }

      if (!isEmpty(globals.user.workspaces)) {
        return this.routing.push(`/workspaces/${this.workspace}`)
      }
    }
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get workspace() {
    let workspace
    const savedWorkspace = localStorage.getItem(
      `${globals.user.username}-workspace`
    )

    if (savedWorkspace && globals.app.workspaces.includes(savedWorkspace)) {
      workspace = savedWorkspace
    } else {
      workspace = globals.app.workspaces[0]
    }

    return workspace
  }

  renderHeader() {
    const { avatar_url, globalrole, username, lastLoginTime } =
      globals.user || {}

    const loginTime = `${t('Last login time')}: ${getLocalTime(
      lastLoginTime
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
              {globalrole}
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
    if (globals.app.isPlatformAdmin) {
      return <AdminDashboard />
    }

    return (
      <EmptyList
        title={t('USER_DASHBOARD_EMPTY_TITLE')}
        desc={t('USER_DASHBOARD_EMPTY_DESC')}
      />
    )
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
