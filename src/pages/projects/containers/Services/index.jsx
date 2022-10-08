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
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { Tooltip } from '@kube-design/components'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES, SERVICE_TYPES } from 'utils/constants'

import ServiceStore from 'stores/service'

import Topology from './Topology'

@withProjectList({
  store: new ServiceStore(),
  module: 'services',
  name: 'SERVICE',
  searchByApp: true,
})
export default class Services extends React.Component {
  state = {
    type: 'list',
  }

  handleTabChange = value => {
    this.setState({ type: value })
  }

  get tabs() {
    const { cluster } = this.props.match.params
    if (!globals.app.hasClusterModule(cluster, 'network.topology')) {
      return {}
    }

    return {
      value: this.state.type,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'list',
          label: t('SERVICE_LIST'),
        },
        {
          value: 'topology',
          label: t('SERVICE_TOPOLOGY'),
        },
      ],
    }
  }

  get tips() {
    return [
      {
        title: t('SERVICE_TYPES_Q'),
        description: t('SERVICE_TYPES_A'),
      },
      {
        title: t('SCENARIOS_FOR_SERVICES_Q'),
        description: t('SCENARIOS_FOR_SERVICES_A'),
      },
    ]
  }

  get itemActions() {
    const { trigger, name } = this.props
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
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'editService',
        icon: 'network-router',
        text: t('EDIT_SERVICE'),
        action: 'edit',
        onClick: item =>
          trigger('service.edit', {
            detail: item,
          }),
      },
      {
        key: 'editGateway',
        icon: 'ip',
        text: t('EDIT_EXTERNAL_ACCESS'),
        action: 'edit',
        show: record => record.type === SERVICE_TYPES.VirtualIP,
        onClick: item =>
          trigger('service.gateway.edit', {
            detail: item,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('service.delete', {
            type: name,
            detail: item,
          }),
      },
    ]
  }

  get tableActions() {
    const { tableProps, name, rowKey, trigger } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('DELETE'),
          action: 'delete',
          onClick: () =>
            trigger('service.batch.delete', {
              type: name,
              rowKey,
            }),
        },
      ],
    }
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        search: true,
        width: '20%',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={`${this.props.match.url}/${name}`}
            isMultiCluster={record.isFedManaged}
          />
        ),
      },
      {
        title: t('SERVICE_TYPE_TCAP'),
        dataIndex: 'annotations["kubesphere.io/serviceType"]',
        isHideable: true,
        width: '15%',
        render: (serviceType, record) => (
          <Text
            title={
              serviceType
                ? t(`SERVICE_TYPE_${serviceType.toUpperCase()}`)
                : t('CUSTOM_SERVICE')
            }
            description={t(record.type) || '-'}
          />
        ),
      },
      {
        title: t('APP'),
        dataIndex: 'app',
        isHideable: true,
        search: true,
        width: '15%',
        render: (app, record) => {
          const instance = get(record, 'labels["app.kubesphere.io/instance"]')
          const name = get(record, 'labels["app.kubernetes.io/name"]')
          return instance || name || '-'
        },
      },
      {
        title: t('INTERNAL_ACCESS'),
        dataIndex: 'clusterIP',
        isHideable: true,
        width: '15%',
        render: (_, record) => {
          return (
            <Text
              title={record.clusterIP || ''}
              description={t(`${record.type}`)}
            />
          )
        },
      },
      {
        title: t('EXTERNAL_ACCESS'),
        dataIndex: 'specType',
        isHideable: true,
        width: '20%',
        render: (_, record) => this.renderExternalService(record),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: '15%',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  renderExternalService = data => {
    const text = {
      des: '-',
      title: '-',
    }

    if (data.specType === 'NodePort') {
      text.des = t('NODE_PORTS_SCAP')
      text.title = data.ports
        .filter(port => port.nodePort)
        .map(port => `${port.nodePort}/${port.protocol}`)
        .join('; ')
    }

    if (data.specType === 'LoadBalancer') {
      text.des =
        data.loadBalancerIngress.length > 1
          ? t('LOAD_BALANCERS_SCAP')
          : t('LOAD_BALANCER_SCAP')
      text.title = data.loadBalancerIngress.join('; ')
    }

    if (data.externalName) {
      return (
        <Text
          description={text.des}
          title={() => (
            <Tooltip content={data.externalName}>
              <span>{text.title}</span>
            </Tooltip>
          )}
        />
      )
    }

    return <Text description={t(`${text.des}`)} title={text.title} />
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('service.create', {
      module,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { type } = this.state
    const { bannerProps, tableProps, match } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} tabs={this.tabs} tips={this.tips} />
        {type === 'topology' ? (
          <Topology match={match} />
        ) : (
          <Table
            {...tableProps}
            itemActions={this.itemActions}
            tableActions={this.tableActions}
            columns={this.getColumns()}
            onCreate={this.showCreate}
          />
        )}
      </ListPage>
    )
  }
}
