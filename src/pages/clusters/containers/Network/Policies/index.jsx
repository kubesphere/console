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
// import { toJS } from 'mobx'
import Banner from 'components/Cards/Banner'
import NetworkStore from 'stores/network'
import withList, { ListPage } from 'components/HOCs/withList'
// import Table from 'components/Tables/List'
import ResourceTable from 'clusters/components/ResourceTable'
import { getLocalTime } from 'utils'
// import styles from './index.scss'

@withList({
  store: new NetworkStore('networkpolicies'),
  name: 'Network Policy',
  module: 'networkpolicies',
})
export default class Policies extends React.Component {
  tips = [
    {
      title: t('NETWORK_POLICY_Q'),
      description: t('NETWORK_POLICY_A'),
    },
    {
      title: t('NETWORK_POLICY_Q1'),
      description: t('NETWORK_POLICY_A1'),
    },
  ]
  constructor(props) {
    super(props)
    this.store = props.store
    this.state = {}
  }

  getData = async params => {
    await this.store.fetchList({ ...params, ...this.props.match.params })
  }

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'metadata.name',
        sorter: true,
        search: true,
      },
      {
        title: t('Updated Time'),
        dataIndex: 'metadata.creationTimestamp',
        sorter: true,
        sortOrder: getSortOrder('metadata.creationTimestamp'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  render() {
    const { tips } = this
    const { query, match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData}>
        <Banner {...bannerProps} tips={tips} />
        <ResourceTable
          {...tableProps}
          columns={this.getColumns()}
          // monitorLoading={false}
          namespace={query.namespace}
          cluster={match.params.cluster}
          noWatch
        />
      </ListPage>
    )
  }
}
