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
import { Avatar, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getDisplayName, showNameAndAlias } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import IPPoolStore from 'stores/network/ippool'

@withList({
  store: new IPPoolStore(),
  module: 'ippools',
  name: 'POD_IP_POOL',
})
export default class IPPools extends React.Component {
  get tips() {
    return [
      {
        title: t('IPPOOL_USAGE_Q'),
        description: t('IPPOOL_USAGE_A'),
      },
    ]
  }

  get itemActions() {
    const { trigger, name, match } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'viewYaml',
        icon: 'eye',
        text: t('VIEW_YAML'),
        action: 'view',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            readOnly: true,
          }),
      },
      {
        key: 'modify',
        icon: 'enterprise',
        text: t('ASSIGN_WORKSPACE'),
        action: 'edit',
        onClick: item =>
          trigger('network.ipool.assignworkspace', {
            detail: item,
            cluster: match.params.cluster,
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
          }),
      },
    ]
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        width: '40%',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={`${this.props.match.url}/${name}`}
          />
        ),
      },
      {
        title: t('NETWORK_SEGMENT'),
        dataIndex: 'cidr',
      },
      {
        title: t('USED_IP_ADDRESSES'),
        dataIndex: 'status',
        render: status => {
          const capacity = get(status, 'capacity', 0)
          const unallocated = get(status, 'unallocated', 0)

          return (
            <Text
              title={capacity - unallocated}
              description={t('TOTAL_VALUE', { value: capacity })}
            />
          )
        },
      },
      {
        title: t('WORKSPACE'),
        dataIndex: 'workspace',
        render: (workspace, record) =>
          record.isDefault
            ? t('ALL')
            : showNameAndAlias(workspace, 'workspace') || t('NOT_ASSIGNED'),
      },
    ]
  }

  showCreate = () => {
    const { match, module } = this.props
    return this.props.trigger('network.ippool.add', {
      module,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
          getCheckboxProps={this.getCheckboxProps}
          searchType="name"
        />
      </ListPage>
    )
  }
}
