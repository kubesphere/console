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
import { observer, inject } from 'mobx-react'

import { Status, Avatar, Panel } from 'components/Base'
import { getLocalTime } from 'utils'
import SubnetStore from 'stores/kubeovn/subnet'

import BaseTable from 'components/Tables/Base'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Gateway extends React.Component {
  constructor(props) {
    super(props)
    this.subnetStore = props.subnetStore || new SubnetStore()
  }

  get store() {
    return this.props.detailStore
  }

  componentDidMount() {
    this.handleFetch()
  }

  handleFetch = (params = {}) => {
    const { cluster, name } = this.store.detail
    if (params.keyword) {
      params.name = params.keyword
      delete params.keyword
    }

    this.subnetStore.fetchList({
      name,
      cluster,
      ...params,
    })
  }

  getColumns = () => [
    {
      title: t('GatewayAddress'),
      dataIndex: 'gateway',
      width: '18%',
      render: gateway => (
        <Avatar icon="gateway" iconSize={30} title={gateway} noLink />
      ),
    },
    {
      title: t('GatewayNode'),
      dataIndex: 'gatewayNode',
      render: gatewayNode => gatewayNode || '-',
    },
    {
      title: t('GatewayType'),
      dataIndex: 'gatewayType',
      render: gatewayType => t(gatewayType),
    },
    {
      title: t('NatOutgoing'),
      dataIndex: 'natOutgoing',
      render: this.renderNat,
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      width: '16%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  renderNat = (_, record) => {
    const { natOutgoing } = record

    let type = 'Disabled'
    if (natOutgoing === true) {
      type = 'Succeeded'
    }

    return <Status type={type} name={t(natOutgoing.toString())} flicker />
  }

  render() {
    const { data, isLoading } = this.subnetStore.list

    return (
      <Panel loading={isLoading}>
        <BaseTable
          data={data}
          className={styles.wrapper}
          columns={this.getColumns()}
          placeholder={t('Please input a name to find')}
          isLoading={isLoading}
          hideSearch={true}
          hideFooter={true}
          hideHeader={true}
          onFetch={this.handleFetch}
        />
      </Panel>
    )
  }
}
