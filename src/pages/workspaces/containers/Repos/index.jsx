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
import { find } from 'lodash'
import { Icon, Menu } from '@pitrix/lego-ui'

import Base from 'core/containers/Base/List'
import AppRepoStore from 'stores/openpitrix/repo'

import { Notify, Avatar, Status } from 'components/Base'
import CreateModal from 'components/Modals/AppRepoCreate'
import DeleteModal from 'components/Modals/Delete'
import Banner from 'components/Cards/Banner'

import styles from './index.scss'

const EditModal = CreateModal

@inject('rootStore')
@observer
export default class AppRepos extends Base {
  init() {
    this.state = {
      createModal: false,
      batchDeleteModal: false,
      showEdit: false,
      showDelete: false,
      selectRepo: {},
    }

    this.store = new AppRepoStore()
  }

  get name() {
    return 'App Repository'
  }

  get authKey() {
    return 'repos'
  }

  get rowKey() {
    return 'repo_id'
  }

  get module() {
    return 'repos'
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get enabledActions() {
    const actions = globals.app.getActions({
      module: 'repos',
      workspace: this.workspace,
    })

    return [
      ...actions,
      ...(actions.includes('manage') ? ['create', 'edit', 'delete'] : []),
    ]
  }

  get selectedRepos() {
    return this.store.list.selectedRowKeys.slice()
  }

  get selectedRepoNames() {
    const { data } = this.store.list
    return this.selectedRepos.map(repo_id => find(data, { repo_id }).name)
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
      },
    ]
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  getData(params = {}) {
    this.store.fetchList({
      status: 'active',
      workspace: this.workspace,
      ...params,
    })
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      searchType: 'keyword',
      actions: [
        {
          key: 'create',
          type: 'control',
          text: t('Create Repo'),
          action: 'manage',
          onClick: this.showModal('createModal'),
        },
      ],
      selectActions: [
        {
          key: 'index',
          type: 'primary',
          text: t('Index Repo'),
          action: 'manage',
          onClick: this.handleIndex,
        },
      ],
    }
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '30%',
      render: (name, { description }) => (
        <Avatar
          icon="catalog"
          iconSize={40}
          title={name}
          desc={description || '-'}
          noLink
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '15%',
      render: status => <Status type={status} name={t(status)} />,
    },
    {
      title: t('URL'),
      dataIndex: 'url',
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  get tips() {
    return [
      {
        title: t('HOW_TO_USE_APP_REPO_Q'),
        description: t('HOW_TO_USE_APP_REPO_A'),
      },
    ]
  }

  hideCreate = () => {
    this.setState({ createModal: false })
  }

  handleCreate = async data => {
    await this.store
      .create({
        ...data,
        app_default_status: 'active',
        workspace: this.workspace,
      })
      .then(() => {
        this.getData()
        this.hideCreate()
      })
  }

  hideEdit = () => {
    this.setState({ showEdit: false })
  }

  handleEdit = data => {
    this.store.update(data).then(() => {
      this.getData()
      this.hideEdit()
    })
  }

  hideBatchDelete = () => {
    this.setState({ batchDeleteModal: false })
  }

  handleBatchDelete = async () => {
    const repos = this.selectedRepos
    try {
      await this.store.delete({ repo_id: repos })
      this.hideBatchDelete()
      this.getData()
    } catch (err) {}
  }

  hideDelete = () => {
    this.setState({ showDelete: false })
  }

  handleDelete = async () => {
    const repos = this.state.selectRepo.repo_id
    try {
      await this.store.delete({ repo_id: repos })
      this.hideDelete()
      this.getData()
    } catch (err) {}
  }

  handleIndex = async () => {
    await Promise.all(
      this.selectedRepos.map(async repo => {
        const resp = await this.store.index({ repo_id: repo })
        const { message } = resp

        if (message === 'success') {
          Notify.success(t('Index Successfully'))
        }
      })
    )
    this.store.setSelectRowKeys([])
  }

  handleMoreClick = repo => (e, key) => {
    switch (key) {
      case 'edit':
        this.setState({ showEdit: true, selectRepo: repo })
        break
      case 'delete':
        this.setState({ showDelete: true, selectRepo: repo })
        break
      default:
        break
    }
  }

  renderHeader() {
    return (
      <Banner
        title={t('App Repositories')}
        description={t('APP_REPO_DESC')}
        className={styles.header}
        module={this.module}
        tips={this.tips}
      />
    )
  }

  renderMoreMenu = record => (
    <Menu onClick={this.handleMoreClick(record)}>
      {this.enabledItemActions.map(action => (
        <Menu.MenuItem key={action.key}>
          <Icon name={action.icon} /> {action.text}
        </Menu.MenuItem>
      ))}
    </Menu>
  )

  renderModals() {
    return (
      <div>
        <CreateModal
          store={this.store}
          visible={this.state.createModal}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideCreate}
        />
        <EditModal
          store={this.store}
          detail={this.state.selectRepo}
          visible={this.state.showEdit}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideEdit}
        />
        <DeleteModal
          type={t(this.name)}
          resource={this.state.selectRepo.name}
          visible={this.state.showDelete}
          isSubmitting={this.store.isSubmitting}
          onOk={this.handleDelete}
          onCancel={this.hideDelete}
        />
      </div>
    )
  }
}
