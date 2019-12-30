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
import { Avatar, Notify } from 'components/Base'
import Base from 'core/containers/Base/List'
import StatusReason from 'projects/components/StatusReason'
import RedeployModal from 'projects/components/Modals/Redeploy'
import CreateModal from 'components/Modals/Create'
import EditYamlModal from 'components/Modals/EditYaml'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import WorkloadDeleteModal from 'projects/components/Modals/WorkloadDelete'
import WorkloadStatus from 'projects/components/WorkloadStatus'

import { getDisplayName, getLocalTime } from 'utils'
import { getWorkloadStatus } from 'utils/status'
import { WORKLOAD_STATUS, ICON_TYPES, MODULE_KIND_MAP } from 'utils/constants'

@inject('rootStore')
@observer
export default class WorkloadsBaseList extends Base {
  init() {
    this.store = this.props.store
    this.initWebsocket()
  }

  componentDidUpdate(prevProps) {
    if (this.props.module !== prevProps.module) {
      this.store = this.props.store
      this.store.list.reset()
      this.initWebsocket()
      this.getData()
    }
  }

  get module() {
    return this.props.module
  }

  get name() {
    return this.props.name
  }

  get steps() {
    return this.props.formSteps
  }

  get params() {
    const { module, ...rest } = this.props.match.params
    return rest
  }

  async getData({ silent, ...params } = {}) {
    silent && (this.list.silent = true)
    await this.store.fetchList({ ...this.params, ...params })
    this.list.silent = false
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: this.showModal('editYamlModal'),
      },
      {
        key: 'redeploy',
        icon: 'restart',
        text: t('Redeploy'),
        action: 'edit',
        onClick: this.showModal('redeployModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getStatus() {
    return WORKLOAD_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: (name, record) => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          iconSize={40}
          title={getDisplayName(record)}
          desc={this.getItemDesc(record)}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      filters: this.getStatus(),
      filteredValue: this.getFilteredValue('status'),
      isHideable: true,
      search: true,
      width: '20%',
      render: this.renderStatus,
    },
    {
      title: t('Application'),
      dataIndex: 'app',
      isHideable: true,
      search: true,
      width: '25%',
    },
    this.module === 'deployments'
      ? {
          title: t('Updated Time'),
          dataIndex: 'updateTime',
          sorter: true,
          sortOrder: this.getSortOrder('updateTime'),
          isHideable: true,
          width: 150,
          render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
        }
      : {
          title: t('Created Time'),
          dataIndex: 'createTime',
          sorter: true,
          sortOrder: this.getSortOrder('createTime'),
          isHideable: true,
          width: 150,
          render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
        },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  getItemDesc = record => {
    const { status, reason } = getWorkloadStatus(record, this.module)
    const desc = reason ? (
      <StatusReason status={status} reason={t(reason)} data={record} />
    ) : (
      record.description || '-'
    )

    return desc
  }

  updateCallback() {
    this.props.rootStore.quota.fetch(this.props.match.params)
  }

  handleYamlEdit = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editYamlModal')()
    })
  }

  renderStatus = (status, record) => (
    <WorkloadStatus data={record} module={this.module} />
  )

  handleRedeploy = () => {
    const { selectItem } = this.state

    this.store
      .patch(selectItem, {
        spec: {
          template: {
            metadata: {
              annotations: {
                'kubesphere.io/restartedAt': new Date(),
              },
            },
          },
        },
      })
      .then(() => {
        this.hideModal('redeployModal')()
        Notify.success({ content: `${t('Redeploy Successfully')}!` })
      })
  }

  renderHeader() {
    return null
  }

  renderModals() {
    const {
      editModal,
      editYamlModal,
      deleteModal,
      batchDeleteModal,
      createModal,
      redeployModal,
      selectItem = {},
    } = this.state
    const { isSubmitting } = this.store

    return (
      <>
        <EditBasicInfoModal
          visible={editModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
        <EditYamlModal
          store={this.store}
          visible={editYamlModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleYamlEdit}
          onCancel={this.hideModal('editYamlModal')}
        />
        <WorkloadDeleteModal
          resource={selectItem}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={isSubmitting}
        />
        {this.list.selectedRowKeys && (
          <WorkloadDeleteModal
            resource={this.list.data.filter(item =>
              this.list.selectedRowKeys.includes(item.name)
            )}
            visible={batchDeleteModal}
            onOk={this.handleBatchDelete}
            onCancel={this.hideModal('batchDeleteModal')}
            isSubmitting={isSubmitting}
          />
        )}
        <RedeployModal
          visible={redeployModal}
          detail={selectItem}
          type={MODULE_KIND_MAP[this.module]}
          onOk={this.handleRedeploy}
          onCancel={this.hideModal('redeployModal')}
          isSubmitting={isSubmitting}
        />
        <CreateModal
          name={this.name}
          module={this.module}
          store={this.store}
          visible={createModal}
          steps={this.steps}
          formTemplate={this.props.formTemplate}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
      </>
    )
  }
}
