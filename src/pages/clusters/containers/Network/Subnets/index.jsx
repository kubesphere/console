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
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import SubnetStore from 'stores/kubeovn/subnet'
import { withClusterList, ListPage } from 'components/HOCs/withList'
import ResourceTable from 'clusters/components/ResourceTable'

import { getLocalTime } from 'utils'
import { ICON_TYPES } from 'utils/constants'

@withClusterList({
  store: new SubnetStore(),
  name: 'Subnet',
  module: 'subnets',
  rowKey: 'key',
})
export default class Subnets extends React.Component {
  get params() {
    return get(this.props.match, 'params', {})
  }

  get cluster() {
    return get(this.params, 'cluster')
  }

  get itemActions() {
    const { trigger, routing } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
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
        text: t('Edit YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            success: routing.query,
          }),
      },
      {
        key: 'editSubnet',
        icon: 'network-router',
        text: t('Edit Subnet'),
        action: 'edit',
        onClick: item =>
          trigger('subnet.edit', {
            disabled: item.name === 'ovn-default' || item.name === 'join',
            detail: item,
            module: this.props.module,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: item =>
          trigger('resource.delete', {
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
        text: t('Create Subnet'),
        action: 'create',
        onClick: () =>
          trigger('subnet.create', {
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
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        render: name => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={name}
            to={`/clusters/${cluster}/${module}/${name}`}
          />
        ),
      },
      {
        title: t('CIDR'),
        dataIndex: 'cidr',
        isHideable: true,
        render: (cidr, record) => (
          <Link to={`/clusters/${cluster}/${module}/${record.name}`}>
            {cidr}
          </Link>
        ),
      },
      {
        title: t('Available IP'),
        dataIndex: 'availableIPs',
        isHideable: true,
      },
      {
        title: t('Namespaces'),
        dataIndex: 'namespaces',
        isHideable: true,
        render: namespaces => namespaces.toString() || '-',
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
