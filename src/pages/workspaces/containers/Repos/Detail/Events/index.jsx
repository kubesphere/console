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
import { observer, inject } from 'mobx-react'

import { Table } from '@kube-design/components'
import { Panel, Status } from 'components/Base'
import { getLocalTime } from 'utils'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Events extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.store.fetchEvents({
      ...this.props.match.params,
    })
  }

  getColumns = () => [
    {
      title: t('Created Time'),
      dataIndex: 'create_time',
      width: '24%',
      render: create_time =>
        getLocalTime(create_time).format(`YYYY-MM-DD HH:mm:ss`),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      width: '16%',
      render: status => <Status type={status} name={t(status)} />,
    },
    {
      title: t('Message'),
      dataIndex: 'result',
      render: result => result || '-',
    },
  ]

  render() {
    const { data, isLoading } = this.store.events

    return (
      <Panel title={t('Events')}>
        <Table
          className={styles.table}
          dataSource={toJS(data)}
          columns={this.getColumns()}
          loading={isLoading}
          rowKey={'create_time'}
        />
      </Panel>
    )
  }
}
