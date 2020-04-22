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

import { isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Table } from '@pitrix/lego-ui'

import { getLocalTime } from 'utils'
import { Card, Status } from 'components/Base'

@inject('detailStore')
@observer
export default class AuthorizedUsers extends React.Component {
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
      dataIndex: 'last_login_time',
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

  render() {
    const { data, isLoading } = toJS(this.props.detailStore.users)

    const isEmptyList = isEmpty(data) && !isLoading

    return (
      <Card
        title={t('Authorized Users')}
        isEmpty={isEmptyList}
        empty={t('No authorized users')}
      >
        <Table
          dataSource={data}
          columns={this.getColumns()}
          loading={isLoading}
        />
      </Card>
    )
  }
}
