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

import { isEmpty, isUndefined, get, omitBy, throttle } from 'lodash'
import React from 'react'
import { parse } from 'qs'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Avatar, Notify, Status } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Base from 'core/containers/Base/List'
import CreateModal from 'components/Modals/ProjectCreate'
import DeleteModal from 'components/Modals/Delete'
import EditModal from 'components/Modals/ProjectEdit'
import QuotaEditModal from 'components/Modals/QuotaEdit'
import { getLocalTime, getDisplayName } from 'utils'
import { getSuitableValue } from 'utils/monitoring'
import FORM_TEMPLATES from 'utils/form.templates'

import ProjectStore from 'stores/project'
import QuotaStore from 'stores/quota'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Projects extends Base {
  init() {
    this.store = new ProjectStore()
    this.quotaStore = new QuotaStore()

    this.initWebsocket()
  }

  initWebsocket() {
    const { workspace } = this.props.match.params

    if ('getWatchListUrl' in this.store) {
      const url = this.store.getWatchListUrl({ workspace })

      this.websocket.watch(url)

      this.getData = throttle(this.getData, 1000)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.type === 'DELETED') {
            const params = parse(location.search.slice(1))
            this.getData({ ...params, silent: true })
          }
        }
      )
    }
  }

  get authKey() {
    return 'projects'
  }

  get module() {
    return 'projects'
  }

  get name() {
    return 'Project'
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get formTemplate() {
    if (!FORM_TEMPLATES.project) {
      return {}
    }

    const template = FORM_TEMPLATES.project()
    const limitRangeTemplate = FORM_TEMPLATES.limitRange()

    return {
      Project: template,
      LimitRange: limitRangeTemplate,
    }
  }

  get itemActions() {
    const actions = [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]

    if (
      globals.app.hasPermission({
        workspace: this.workspace,
        module: 'workspaces',
        action: 'edit',
      })
    ) {
      actions.splice(1, 0, {
        key: 'quotaEdit',
        icon: 'pen',
        text: t('Edit Quota'),
        action: 'edit',
        onClick: this.showModal('editQuotaModal'),
      })
    }

    return actions
  }

  get tips() {
    return [
      {
        title: t('PROJECT_TYPES_Q'),
        description: t('PROJECT_TYPES_A'),
      },
    ]
  }

  async getData({ silent, ...params }) {
    silent && (this.list.silent = true)
    await this.store.fetchList({
      ...this.props.match.params,
      ...params,
      metrics: true,
    })
    this.list.silent = false
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      searchType: 'keyword',
      getCheckboxProps: record => ({
        disabled: record.status === 'Terminating',
        name: record.name,
      }),
    }
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      width: '20%',
      render: (name, record) => (
        <Avatar
          to={record.status === 'Terminating' ? null : `/projects/${name}`}
          icon="project"
          iconSize={40}
          desc={record.description || '-'}
          title={getDisplayName(record)}
        />
      ),
    },
    {
      title: t('Pod Count'),
      dataIndex: 'annotations.namespace_pod_count',
      isHideable: true,
      width: '10%',
      render: count => (!isUndefined(count) ? count : 0),
    },
    {
      title: t('CPU Usage'),
      dataIndex: 'annotations.namespace_cpu_usage',
      isHideable: true,
      width: '13%',
      render: count => getSuitableValue(count, 'cpu', '-'),
    },
    {
      title: t('Memory Usage'),
      dataIndex: 'annotations.namespace_memory_usage_wo_cache',
      isHideable: true,
      width: '13%',
      render: count => getSuitableValue(count, 'memory', '-'),
    },
    {
      title: t('Creator'),
      dataIndex: 'creator',
      isHideable: true,
      width: '14%',
      render: creator => creator || '-',
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      sorter: true,
      sortOrder: this.getSortOrder('createTime'),
      isHideable: true,
      width: '16%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      render: (field, record) => {
        if (record.status === 'Terminating') {
          return <Status type="terminating" name={t('Terminating')} flicker />
        }

        return this.renderMore(field, record)
      },
    },
  ]

  handleSelectRowKeys = params => {
    this.store.setSelectRowKeys('list', params)
  }

  handleEditQuota = data => {
    const { selectItem } = this.state
    const params = { name: data.name, namespace: selectItem.name }

    const hardData = get(data, 'spec.hard', data.hard)

    this.quotaStore.checkName(params).then(resp => {
      if (resp.exist) {
        this.quotaStore
          .update(params, {
            ...data,
            spec: { hard: omitBy(hardData, isEmpty) },
          })
          .then(this.postEditQuota)
      } else {
        this.quotaStore
          .create({
            apiVersion: 'v1',
            kind: 'ResourceQuota',
            metadata: { ...params, name: selectItem.name },
            spec: { hard: hardData },
          })
          .then(this.postEditQuota)
      }
    })
  }

  postEditQuota = () => {
    this.hideModal('editQuotaModal')()
    Notify.success({ content: `${t('Updated Successfully')}!` })
  }

  renderHeader() {
    return (
      <Banner
        className={styles.header}
        icon="project"
        title={t('Projects')}
        description={t('PROJECTS_DESC')}
        module={this.module}
        tips={this.tips}
      />
    )
  }

  renderModals() {
    const formTemplate = { projects: this.formTemplate }
    const { isSubmitting } = this.store
    const {
      createModal,
      editModal,
      editQuotaModal,
      deleteModal,
      batchDeleteModal,
      selectItem = {},
    } = this.state

    return (
      <div>
        <DeleteModal
          type={t(this.name)}
          resource={selectItem[this.rowKey]}
          desc={t.html('DELETE_PROJECT_TIP', {
            resource: selectItem[this.rowKey],
          })}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={isSubmitting}
        />
        {this.list.selectedRowKeys && (
          <DeleteModal
            type={t(this.name)}
            resource={this.list.selectedRowKeys.join(', ')}
            visible={batchDeleteModal}
            desc={t.html('DELETE_PROJECT_TIP', {
              resource: this.list.selectedRowKeys.join(', '),
            })}
            onOk={this.handleBatchDelete}
            onCancel={this.hideModal('batchDeleteModal')}
            isSubmitting={isSubmitting}
          />
        )}
        <CreateModal
          type="projects"
          formTemplate={formTemplate}
          visible={createModal}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
        <EditModal
          detail={selectItem}
          visible={editModal}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
          isSubmitting={isSubmitting}
        />
        <QuotaEditModal
          detail={selectItem}
          visible={editQuotaModal}
          onOk={this.handleEditQuota}
          onCancel={this.hideModal('editQuotaModal')}
          isSubmitting={this.quotaStore.isSubmitting}
        />
      </div>
    )
  }
}
