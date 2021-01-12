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

import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'
import VersionStatus from 'apps/components/VersionStatus'

import AuditStore from 'stores/openpitrix/audit'
import { getLocalTime } from 'utils'

import styles from './index.scss'

@withList({
  store: new AuditStore(),
  module: 'apps',
  name: 'Audits',
  rowKey: 'status_time',
})
export default class AuditRecord extends React.Component {
  getData = params => {
    const { appId } = this.props.match.params
    this.props.store.fetchList({ app_id: appId, ...params })
  }

  get tableActions() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onCreate: null,
      selectActions: [],
    }
  }

  getColumns = () => [
    {
      title: t('Time'),
      dataIndex: 'status_time',
      width: '20%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '15%',
      render: status => <VersionStatus type={status} name={status} />,
    },
    {
      title: t('Version'),
      dataIndex: 'version_name',
      isHideable: true,
      width: '15%',
    },
    {
      title: t('Rejection Reason'),
      key: 'reject',
      isHideable: true,
      width: '40%',
      render: (reviewId, item) => item.message || '-',
    },
    {
      title: t('Operator'),
      dataIndex: 'operator',
      isHideable: true,
      width: '10%',
    },
  ]

  render() {
    const { tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <div className={styles.title}>{t('Audit Records')}</div>
        <Table
          {...tableProps}
          tableActions={this.tableActions}
          itemActions={[]}
          columns={this.getColumns()}
          hideSearch
        />
      </ListPage>
    )
  }
}
