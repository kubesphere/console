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
import { Link } from 'react-router-dom'

import { getLocalTime } from 'utils'
import IPStore from 'stores/kubeovn/ip'
import SubnetStore from 'stores/kubeovn/subnet'

import { isUndefined } from 'lodash'

import { Avatar, Panel } from 'components/Base'
import BaseTable from 'components/Tables/Base'
import styles from './index.scss'

@inject('detailStore')
@observer
export default class IPAM extends React.Component {
  constructor(props) {
    super(props)

    this.ipStore = new IPStore()
    this.subnetStore = new SubnetStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const { cluster, name } = this.props.match.params

    await this.subnetStore.fetchDetail(this.props.match.params)
    await this.ipStore.fetchList({
      cluster,
      labelSelector: `ovn.kubernetes.io/subnet=${name}`,
    })
  }

  handleFetch = (params = {}) => {
    const { cluster, name } = this.props.match.params

    this.ipStore.fetchList({
      cluster,
      labelSelector: `ovn.kubernetes.io/subnet=${name}`,
      ...params,
    })
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '25%',
      search: true,
      render: name => <Avatar icon="ip" iconSize={30} title={name} noLink />,
    },
    {
      title: t('IpAddress'),
      dataIndex: 'ipAddress',
      width: '13%',
      search: true,
    },
    {
      title: t('MacAddress'),
      dataIndex: 'macAddress',
      width: '13%',
    },
    {
      title: t('PodName'),
      dataIndex: 'podName',
      render: this.renderPodName,
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  renderPodName = (_, record) => {
    const { name, podName, cluster } = record
    if (name.split('.').length <= 1) {
      return <div>{podName}</div>
    }

    const namespace = name.split('.')[1]
    return (
      <Link to={`/clusters/${cluster}/projects/${namespace}/pods/${podName}`}>
        {podName}
      </Link>
    )
  }

  renderIPAM() {
    const { data, filters, isLoading, total, page, limit } = this.ipStore.list
    const pagination = { total, page, limit }

    return (
      <Panel title={t('IPAM')} loading={isLoading}>
        <BaseTable
          data={data}
          filters={filters}
          columns={this.getColumns()}
          placeholder={t('Please input a name to find')}
          pagination={pagination}
          isLoading={isLoading}
          key="key"
          onFetch={this.handleFetch}
        />
      </Panel>
    )
  }

  renderSubnetStatus() {
    const { usingIPs, availableIPs } = this.subnetStore.detail

    let totalIPs = 0
    if (!isUndefined(usingIPs) && !isUndefined(availableIPs)) {
      totalIPs = usingIPs + availableIPs
    }

    return (
      <Panel title={t('SubnetStatus')}>
        <div className={styles.item}>
          <div className={styles.text}>
            <p>{t('Total IP')}</p>
            <div>{totalIPs}</div>
          </div>
          <div className={styles.text}>
            <p>{t('Available IP')}</p>
            <div>{availableIPs}</div>
          </div>
          <div className={styles.text}>
            <p>{t('Using IP')}</p>
            <div>{usingIPs}</div>
          </div>
        </div>
      </Panel>
    )
  }

  render() {
    return (
      <div>
        {this.renderSubnetStatus()}
        {this.renderIPAM()}
      </div>
    )
  }
}
