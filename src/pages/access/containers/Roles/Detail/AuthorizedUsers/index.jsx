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
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'

import { getLocalTime } from 'utils'
import { ROLE_QUERY_KEY } from 'utils/constants'
import { Panel, Status } from 'components/Base'
import Table from 'components/Tables/Base'

import UserStore from 'stores/user'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class AuthorizedUsers extends React.Component {
  store = new UserStore()

  componentDidMount() {
    this.fetchData()
  }

  fetchData = (params = {}) => {
    const { name, namespace, workspace, cluster } = this.props.match.params
    const { module } = this.props.detailStore
    this.store.fetchList({
      [ROLE_QUERY_KEY[module]]: name,
      namespace,
      workspace,
      cluster,
      ...params,
    })
  }

  getColumns = () => [
    {
      title: t('User Name'),
      dataIndex: 'username',
      width: '33%',
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      width: '33%',
      render: status => (
        <Status type={status} name={t(`USER_${status.toUpperCase()}`)} />
      ),
    },
    {
      title: t('Last Login Time'),
      dataIndex: 'lastLoginTime',
      width: '33%',
      render: login_time => (
        <p>
          {login_time
            ? getLocalTime(login_time).format('YYYY-MM-DD HH:mm:ss')
            : t('Not logged in yet')}
        </p>
      ),
    },
  ]

  get emptyProps() {
    return {
      icon: 'human',
      name: 'Users',
      desc: t('NO_AUTHORIZED_USERS'),
      className: styles.table,
    }
  }

  render() {
    const { data, total, page, limit, isLoading } = toJS(this.store.list)

    const pagination = { total, page, limit }

    return (
      <Panel title={t('Authorized Users')}>
        <Table
          className={styles.table}
          data={data}
          columns={this.getColumns()}
          pagination={pagination}
          isLoading={isLoading}
          onFetch={this.fetchData}
          emptyProps={this.emptyProps}
          hideCustom
          hideHeader
        />
      </Panel>
    )
  }
}
