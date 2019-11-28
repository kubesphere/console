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
import { throttle } from 'lodash'
import { reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'

import ProjectStore from 'stores/project'

import { Avatar, Notify, Status } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import EditModal from 'components/Modals/ProjectEdit'
import AssignWorkspaceModal from 'components/Modals/AssignWorkspace'

import { getLocalTime, getDisplayName } from 'utils'

import Base from 'core/containers/Base/List'

import styles from './index.scss'

const WORKSPACE_STATUS = [
  { text: 'All', value: 'all' },
  { text: 'Not Assigned', value: 'not_assigned' },
]

@inject('rootStore')
@observer
export default class Projects extends Base {
  init() {
    this.store = new ProjectStore()
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

  get name() {
    return 'Project'
  }

  get authKey() {
    return 'projects'
  }

  get className() {
    return styles.wrapper
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      searchType: 'keyword',
      onCreate: null,
    }
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'manage',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'modify',
        icon: 'restart',
        text: t('Assign Workspace'),
        action: 'manage',
        show: record => !record.workspace,
        onClick: this.showModal('assignWorkspaceModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'manage',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getWorkspaceOptions() {
    return WORKSPACE_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      search: true,
      width: '30%',
      render: this.renderAvatar,
    },
    {
      title: t('Workspace'),
      dataIndex: 'kubesphere.io/workspace',
      filters: this.getWorkspaceOptions(),
      filteredValue: this.getFilteredValue('kubesphere.io/workspace'),
      search: true,
      isHideable: true,
      width: '20%',
      render: (_, record) =>
        record.workspace || <span className="tag">{t('Not Assigned')}</span>,
    },
    {
      title: t('Creator'),
      dataIndex: 'creator',
      isHideable: true,
      width: '20%',
      render: creator => creator || '-',
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      sorter: true,
      sortOrder: this.getSortOrder('createTime'),
      isHideable: true,
      width: '20%',
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

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleSelectRowKeys = params => {
    this.store.setSelectRowKeys('list', params)
  }

  handleAssignWorkspace = data => {
    this.store.patch(this.state.selectItem, data).then(() => {
      this.hideModal('assignWorkspaceModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  renderAvatar = (name, record) => {
    const url = record.workspace ? `/projects/${name}` : ''
    const props = globals.app.isClusterAdmin ? { to: url } : { noLink: true }
    return (
      <Avatar
        icon="project"
        iconSize={40}
        title={getDisplayName(record)}
        desc={record.description || '-'}
        {...props}
      />
    )
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <img className={styles.leftIcon} src="/assets/noicon.svg" alt="" />
        <img
          className={styles.rightIcon}
          src="/assets/banner-icon-2.svg"
          alt=""
        />
        <div className={styles.title}>
          <div className="h4">{t('NAV_PROJECTS')}</div>
          <p>{t('PROJECTS_DESC')}</p>
        </div>
      </div>
    )
  }

  renderModals() {
    const { isSubmitting } = this.store
    const {
      editModal,
      deleteModal,
      batchDeleteModal,
      assignWorkspaceModal,
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
        <EditModal
          detail={selectItem}
          visible={editModal}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
          isSubmitting={isSubmitting}
        />
        <AssignWorkspaceModal
          visible={assignWorkspaceModal}
          onOk={this.handleAssignWorkspace}
          onCancel={this.hideModal('assignWorkspaceModal')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}
