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
import CreateModal from 'components/Modals/ProjectCreate'
import DeleteModal from 'components/Modals/Delete'
import EditModal from 'components/Modals/DevOpsEdit'
import { getLocalTime } from 'utils'
import Banner from 'components/Cards/Banner'

import DevOpsStore from 'stores/devops'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class DevOps extends Base {
  init() {
    this.store = new DevOpsStore()
  }

  get name() {
    return 'DevOps Project'
  }
  get module() {
    return 'devops'
  }

  get authKey() {
    return 'devops'
  }

  get formTemplate() {
    return {}
  }

  get tips() {
    return [
      {
        title: t('DEVOPS_TIP_GITOPS_Q'),
        description: t('DEVOPS_TIP_GITOPS_A'),
      },
      {
        title: t('DEVOPS_TIP_TYPE_Q'),
        description: t('DEVOPS_TIP_TYPE_A'),
      },
    ]
  }

  get rowKey() {
    return 'project_id'
  }

  getEmptyProps() {
    return {
      createText: t('Create DevOps Project'),
    }
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      searchType: 'keyword',
    }
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '40%',
      render: (name, record) => (
        <Avatar
          icon="strategy-group"
          iconSize={40}
          to={`/devops/${record.project_id}`}
          desc={record.description || '-'}
          title={name}
        />
      ),
    },
    {
      title: t('Creator'),
      dataIndex: 'creator',
      isHideable: true,
      width: '28%',
      render: creator => creator || '-',
    },
    {
      title: t('Created Time'),
      dataIndex: 'create_time',
      isHideable: true,
      width: '28%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      render: this.renderMore,
    },
  ]

  handleSelectRowKeys = params => {
    this.store.setSelectRowKeys('list', params)
  }

  handleEdit = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem.project_id, newObject).then(() => {
      this.hideModal('editModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  renderHeader() {
    return (
      <Banner
        title={t('DevOps Projects')}
        icon="strategy-group"
        description={t('DEVOPS_DESCRIPTION')}
        className={styles.header}
        module={this.module}
        tips={this.tips}
      />
    )
  }

  renderModals() {
    const formTemplate = { devops: this.formTemplate }
    const {
      createModal,
      editModal,
      deleteModal,
      batchDeleteModal,
      selectItem = {},
    } = this.state

    const selectedNames = this.list.data
      .filter(item => this.list.selectedRowKeys.includes(item[this.rowKey]))
      .map(item => item.name)
      .join(', ')

    return (
      <div>
        <DeleteModal
          type={t(this.name)}
          resource={selectItem.name}
          desc={t.html('DELETE_DEVOPS_TIP', {
            resource: selectItem.name,
          })}
          visible={deleteModal}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModal')}
          isSubmitting={this.store.isSubmitting}
        />
        {this.list.selectedRowKeys && (
          <DeleteModal
            type={t(this.name)}
            resource={selectedNames}
            visible={batchDeleteModal}
            desc={t.html('DELETE_DEVOPS_TIP', {
              resource: selectedNames,
            })}
            onOk={this.handleBatchDelete}
            onCancel={this.hideModal('batchDeleteModal')}
            isSubmitting={this.store.isSubmitting}
          />
        )}
        <CreateModal
          type="devops"
          formTemplate={formTemplate}
          visible={createModal}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
        <EditModal
          detail={selectItem}
          visible={editModal}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
      </div>
    )
  }
}
