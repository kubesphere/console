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
import { Avatar, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withProjectList, ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import FedWorkloadStatus from 'fedprojects/components/FedWorkloadStatus'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import FederatedStore from 'stores/federated'
import WorkloadStore from 'stores/workload'

@withProjectList({
  store: new FederatedStore(new WorkloadStore('deployments')),
  module: 'deployments',
  name: 'DEPLOYMENT',
  rowKey: 'uid',
})
export default class Deployments extends React.Component {
  get prefix() {
    const { workspace, namespace } = this.props.match.params
    return `/${workspace}/federatedprojects/${namespace}`
  }

  handleTabChange = value => {
    this.props.routing.push(`${this.prefix}/${value}`)
  }

  get tabs() {
    return {
      value: this.props.module,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'deployments',
          label: t('DEPLOYMENTS'),
        },
        {
          value: 'statefulsets',
          label: t('STATEFULSETS'),
        },
      ],
    }
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
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: item =>
          trigger('workload.delete', {
            type: name,
            detail: item,
            isFederated: true,
          }),
      },
    ]
  }

  get selectActions() {
    const { tableProps, trigger, name, rootStore } = this.props
    return [
      ...get(tableProps, 'tableActions.selectActions', {}),
      {
        key: 'stop',
        text: t('STOP'),
        onClick: () =>
          trigger('resource.batch.stop', {
            type: name,
            rowKey: 'uid',
            success: rootStore.routing.query(),
          }),
      },
    ]
  }

  get tableActions() {
    const { trigger, name, tableProps } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('DELETE'),
          action: 'delete',
          onClick: () =>
            trigger('workload.batch.delete', {
              type: name,
              rowKey: 'name',
              isFederated: true,
            }),
        },
      ],
    }
  }

  getColumns = () => {
    const { module, projectStore } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            isMultiCluster={record.isFedManaged}
            title={getDisplayName(record)}
            desc={record.description || '-'}
            to={record.deletionTime ? null : `${this.props.match.url}/${name}`}
          />
        ),
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        width: '22%',
        render: (status, record) =>
          status === 'Deleting' ? (
            <Status type={status} name={t(status)} flicker />
          ) : (
            <FedWorkloadStatus
              data={record}
              module={module}
              clusters={projectStore.detail.clusters}
            />
          ),
      },
      {
        title: t('APP'),
        dataIndex: 'app',
        isHideable: true,
        width: '22%',
      },
      {
        title: t('UPDATE_TIME_TCAP'),
        dataIndex: 'updateTime',
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { match, module, projectStore } = this.props
    return this.props.trigger('workload.create', {
      module,
      isFederated: true,
      projectDetail: projectStore.detail,
      namespace: match.params.namespace,
      renderScheduleTab: true,
      supportGpuSelect: true,
    })
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} isFederated>
        <Banner
          {...bannerProps}
          title={t('WORKLOAD_PL')}
          description={t('WORKLOAD_DESC')}
          tabs={this.tabs}
        />
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          selectActions={this.selectActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          searchType="name"
        />
      </ListPage>
    )
  }
}
