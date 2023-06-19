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
import GatewayStore from 'stores/gateway'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { Tooltip, Icon } from '@kube-design/components'
import { isEmpty } from 'lodash'

@withList({
  store: new GatewayStore(),
  name: 'PROJECT_GATEWAY',
  module: 'gateways',
})
export default class ProjectGatewayCard extends React.Component {
  getData = async ({ silent, ...params } = {}) => {
    const { store } = this.props

    silent && (store.list.silent = true)

    await store.fetchList({
      ...this.props.match.params,
      ...params,
      labelSelector: this.labelSelector,
    })

    store.list.silent = false
  }

  get labelSelector() {
    return `kubesphere.io/gateway-type=${this.props.type}`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  getGatewayResource = gatewayData => {
    const name = gatewayData.name.split('kubesphere-router-')[1]
    const namespace = name === 'kubesphere-system' ? '' : name
    const cluster = gatewayData.cluster
    return { cluster, namespace }
  }

  get itemActions() {
    const { trigger } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        show: item => item.createTime,
        onClick: item => {
          trigger('gateways.edit', {
            detail: item._originData,
            ...this.getGatewayResource(item),
            success: this.routing.query,
          })
        },
      },
      {
        key: 'update',
        icon: 'update',
        text: t('UPDATE'),
        action: 'manage',
        show: item => !item.createTime,
        onClick: item =>
          trigger('gateways.update', {
            detail: item._originData,
            ...this.getGatewayResource(item),
            success: this.routing.query,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DISABLE'),
        action: 'delete',
        onClick: item =>
          trigger('gateways.delete', {
            type: this.props.name,
            detail: item,
            ...this.getGatewayResource(item),
            resource: item.name,
            success: this.routing.query,
          }),
      },
    ]
  }

  get tableActions() {
    const { tableProps, trigger } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('DISABLE'),
          action: 'delete',
          onClick: () =>
            trigger('gateways.batch.delete', {
              type: this.props.name,
              rowKey: 'name',
              success: this.routing.query,
            }),
        },
      ],
      onFetch: this.handleFetch,
    }
  }

  handleFetch = (params, refresh) => {
    this.routing.query({ ...params, type: this.type }, refresh)
  }

  renderDisabledTip(record) {
    if (!record.createTime) {
      return (
        <Tooltip content={t('UPDATE_GATEWAY_DESC')} placement="top">
          <Icon
            size={20}
            name="update"
            color={{
              primary: '#f5a623 ',
              secondary: '#ffe1be',
            }}
          />
        </Tooltip>
      )
    }

    return null
  }

  getColumns = () => {
    const { getSortOrder } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => {
          return (
            <>
              <span
                style={{ fontWeight: 700, cursor: 'auto', marginRight: '4px' }}
              >
                {name}
              </span>
              {this.renderDisabledTip(record)}
            </>
          )
        },
      },
      {
        title: t('ACCESS_MODE'),
        dataIndex: 'type',
      },
      {
        title: t('IP_ADDRESS'),
        dataIndex: 'defaultIngress',
      },
      {
        title: t('NODE_PORTS'),
        dataIndex: 'ports',
        render: ports => {
          return isEmpty(ports)
            ? '-'
            : ports
                .map(item => `${item.name.toUpperCase()}: ${item.nodePort}`)
                .join('/')
        },
      },
      {
        title: t('REPLICA_COUNT'),
        dataIndex: 'replicas',
      },
      {
        title: t('TRACING'),
        dataIndex: 'serviceMeshEnable',
        render: serviceMeshEnable => (serviceMeshEnable ? t('ON') : t('OFF')),
      },
    ]
  }

  render() {
    const { tableProps } = this.props

    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          onCreate={null}
          searchType="name"
          showEmpty={!tableProps?.data?.length}
        />
      </ListPage>
    )
  }
}
