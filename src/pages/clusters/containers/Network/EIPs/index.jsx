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

import { Avatar, Status, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES, EIP_STATUS } from 'utils/constants'

import EIPStore from 'stores/network/eip'

@withList({
  store: new EIPStore(),
  module: 'eips',
  name: 'EIP',
})
export default class EIPs extends React.Component {
  get itemActions() {
    const { trigger, store, routing } = this.props
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
        key: 'viewYaml',
        icon: 'eye',
        text: t('View YAML'),
        action: 'view',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            readOnly: true,
          }),
      },
      {
        key: 'enable',
        icon: 'start',
        text: t('Enable'),
        action: 'edit',
        show: item => item.disable,
        onClick: item => store.switch(item, false).then(routing.query()),
      },
      {
        key: 'disable',
        icon: 'stop',
        text: t('Disable'),
        action: 'edit',
        show: item => !item.disable,
        onClick: item => store.switch(item, true).then(routing.query()),
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

  getStatus() {
    return EIP_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => {
    const { getSortOrder, module, prefix, getFilteredValue } = this.props
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={`${prefix}/${name}`}
          />
        ),
      },
      {
        title: t('Status'),
        dataIndex: 'importStatus',
        filters: this.getStatus(),
        filteredValue: getFilteredValue('importStatus'),
        isHideable: true,
        search: true,
        render: importStatus => (
          <Status type={importStatus} name={t(importStatus)} />
        ),
      },
      {
        title: t('IP Address'),
        dataIndex: 'address',
        isHideable: true,
      },
      {
        title: t('Protocol'),
        dataIndex: 'protocol',
        isHideable: true,
      },
      {
        title: t('Used IP'),
        dataIndex: 'status',
        isHideable: true,
        render: status => {
          const usage = get(status, 'usage', 0)
          const poolSize = get(status, 'poolSize', 0)

          return (
            <Text title={usage} description={`${t('Total')}: ${poolSize}`} />
          )
        },
      },
      {
        title: t('Created Time'),
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
    const { trigger, module } = this.props
    return trigger('network.eip.create', {
      title: t('Create EIP'),
      module,
      ...this.props.match.params,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tips={this.tips} />
        <Table
          {...tableProps}
          onCreate={this.showCreate}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          searchType="name"
        />
      </ListPage>
    )
  }
}
