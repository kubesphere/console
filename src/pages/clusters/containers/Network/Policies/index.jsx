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

import ResourceTable from 'clusters/components/ResourceTable'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { ListPage, withClusterList } from 'components/HOCs/withList'
import { get } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import NetworkPolicyStore from 'stores/network/policy'

import { getDisplayName, getLocalTime, showNameAndAlias } from 'utils'
import { ICON_TYPES } from 'utils/constants'

@withClusterList({
  store: new NetworkPolicyStore('networkpolicies'),
  name: 'NETWORK_POLICY',
  module: 'networkpolicies',
  rowKey: 'key',
})
export default class NetworkPolicies extends React.Component {
  tips = [
    {
      title: t('NETWORK_POLICY_Q'),
      description: t.html('NETWORK_POLICY_A'),
    },
    {
      title: t('NETWORK_POLICY_Q1'),
      description: t.html('NETWORK_POLICY_A1'),
    },
  ]

  constructor(props) {
    super(props)
    this.store = props.store
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  get cluster() {
    return get(this.params, 'cluster')
  }

  get itemActions() {
    const { trigger, routing, name } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
            success: routing.query,
          }),
      },
    ]
  }

  get actions() {
    const { trigger, routing } = this.props
    const { cluster } = this
    return [
      {
        key: 'create',
        type: 'control',
        text: t('CREATE_BTN'),
        action: 'create',
        onClick: () =>
          trigger('network.policies.addByYaml', {
            ...this.props,
            cluster,
            success: routing.query,
          }),
      },
    ]
  }

  get getColumns() {
    const { getSortOrder, module } = this.props
    const { cluster } = this.props.match.params
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
          />
        ),
      },
      {
        title: t('PROJECT'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '22%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {showNameAndAlias(namespace, 'project')}
          </Link>
        ),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
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
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={tips} />
        <ResourceTable
          {...tableProps}
          rowKey="key"
          itemActions={this.itemActions}
          namespace={query.namespace}
          columns={this.getColumns}
          actions={this.actions}
          cluster={match.params.cluster}
          searchType="name"
        />
      </ListPage>
    )
  }
}
