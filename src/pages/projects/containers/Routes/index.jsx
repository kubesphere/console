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

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import StatusReason from 'projects/components/StatusReason'
import Table from 'components/Tables/List'

import { getLocalTime, getDisplayName } from 'utils'
import { getWorkloadStatus } from 'utils/status'
import { WORKLOAD_STATUS, ICON_TYPES } from 'utils/constants'

import RouterStore from 'stores/router'

@withProjectList({
  store: new RouterStore(),
  module: 'ingresses',
  name: 'Route',
})
export default class Routers extends React.Component {
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
        key: 'editRules',
        icon: 'firewall',
        text: t('Edit Rules'),
        action: 'edit',
        onClick: item =>
          trigger('router.rules.edit', {
            detail: item,
          }),
      },
      {
        key: 'editAnnotations',
        icon: 'firewall',
        text: t('Edit Annotations'),
        action: 'edit',
        onClick: item =>
          trigger('router.annotations.edit', {
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

  getStatus() {
    return WORKLOAD_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getItemDesc = record => {
    const { status, reason } = getWorkloadStatus(record, this.module)
    const desc = reason ? (
      <StatusReason status={status} reason={t(reason)} data={record} />
    ) : (
      record.description || '-'
    )

    return desc
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    const { cluster, namespace } = this.props.match.params
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
            desc={this.getItemDesc(record)}
            to={`/cluster/${cluster}/namespaces/${namespace}/${module}/${name}`}
          />
        ),
      },
      {
        title: t('Gateway Address'),
        dataIndex: 'loadBalancerIngress[0].ip',
        isHideable: true,
        width: '22%',
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
    const { match, module, projectStore } = this.props
    return this.props.trigger('router.create', {
      module,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
      cluster: match.params.cluster,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
