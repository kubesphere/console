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
import { Columns, Column, Loading } from '@pitrix/lego-ui'

import AppRepoStore from 'stores/openpitrix/repo'

import { Button, Search, Notify } from 'components/Base'
import CreateModal from 'components/Modals/AppRepoCreate'
import DeleteModal from 'components/Modals/Delete'

import Card from './Card'

import styles from './index.scss'

const EditModal = CreateModal

@inject('rootStore')
@observer
export default class AppRepos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCreate: false,
      showEdit: false,
      showDelete: false,
      selectRepo: {},
    }

    this.store = new AppRepoStore()

    this.getData()
  }

  get name() {
    return 'App Repository'
  }

  get enabledActions() {
    return globals.app.getActions({ module: 'repos' })
  }

  getData(params = {}) {
    this.store.fetchList({
      status: 'active',
      limit: undefined,
      controller: 0,
      ...params,
    })
  }

  showCreate = () => {
    this.setState({ showCreate: true })
  }

  hideCreate = () => {
    this.setState({ showCreate: false })
  }

  handleCreate = data => {
    this.store.create({ ...data, app_default_status: 'active' }).then(() => {
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

  hideDelete = () => {
    this.setState({ showDelete: false })
  }

  handleDelete = () => {
    this.store.delete(this.state.selectRepo).then(() => {
      this.hideDelete()
      this.getData()
    })
  }

  handleIndex = async repo => {
    const resp = await this.store.index(repo)
    const { repo_id } = resp.repo_event

    if (repo_id) {
      Notify.success(t('Submit Successfully'))
    }
  }

  handleMoreClick = repo => (e, key) => {
    switch (key) {
      case 'edit':
        this.setState({ showEdit: true, selectRepo: repo })
        break
      case 'index':
        this.handleIndex(repo)
        break
      case 'delete':
        this.setState({ showDelete: true, selectRepo: repo })
        break
      default:
        break
    }
  }

  handleRefresh = () => {
    this.getData()
  }

  handleSearch = value => {
    this.getData({ name: value })
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
          <div className="h4">{t('App Repositories')}</div>
          <p>{t('APP_REPO_DESC')}</p>
        </div>
        {this.renderToolbar()}
      </div>
    )
  }

  renderToolbar() {
    return (
      <div className={styles.toolbar}>
        <Columns className="is-variable is-2">
          <Column>
            <Search
              onSearch={this.handleSearch}
              placeholder={t('Please enter a name to find')}
            />
          </Column>
          <Column className="is-narrow">
            <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
            {this.enabledActions.includes('create') && (
              <Button type="control" onClick={this.showCreate}>
                {t('Add App Repository')}
              </Button>
            )}
          </Column>
        </Columns>
      </div>
    )
  }

  renderRepos() {
    const { data, total, isLoading } = this.store.list

    if (isLoading) {
      return (
        <div className={styles.loading}>
          <Loading />
        </div>
      )
    }

    if (total === 0 && !isLoading) {
      return (
        <div className={styles.empty}>
          <p>{t('RESOURCE_NOT_FOUND')}</p>
        </div>
      )
    }

    return (
      <div className={styles.list}>
        {data.map(repo => (
          <Card
            key={repo.repo_id}
            repo={repo}
            onMenuClick={this.handleMoreClick(repo)}
            enabledActions={this.enabledActions}
          />
        ))}
      </div>
    )
  }

  renderModals() {
    return (
      <div>
        <CreateModal
          store={this.store}
          visible={this.state.showCreate}
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

  render() {
    const { total } = this.store.list

    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        {this.renderRepos()}
        {this.renderModals()}
        <div className={styles.footer}>
          <p>{t('TOTAL_APP_REPOS', { num: total })}</p>
        </div>
      </div>
    )
  }
}
