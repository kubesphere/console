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
import { Link } from 'react-router-dom'
// import { toJS } from 'mobx'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import NetworkStore from 'stores/network'
import withList, { ListPage } from 'components/HOCs/withList'
// import Table from 'components/Tables/List'
import ResourceTable from 'clusters/components/ResourceTable'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'
// import styles from './index.scss'

@withList({
  store: new NetworkStore('networkpolicies'),
  name: 'Network Policy',
  module: 'networkpolicies',
})
export default class NetworkPolicies extends React.Component {
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

  get itemActions() {
    const { trigger } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: t(this.name),
            detail: item,
          }),
      },
    ]
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    const { cluster } = this.props.match.params
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description}
            to={`/clusters/${cluster}/projects/${
              record.namespace
            }/${module}/${name}`}
          />
        ),
      },
      {
        title: t('Project'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '22%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {namespace}
          </Link>
        ),
      },
      {
        title: t('Create Time'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { query, match, module } = this.props
    return this.props.trigger('workload.create', {
      module,
      namespace: query.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { tips } = this
    const { query, match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={tips} />
        <ResourceTable
          {...tableProps}
          rowKey="key"
          itemActions={this.itemActions}
          namespace={query.namespace}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
        />
      </ListPage>
    )
  }
}
