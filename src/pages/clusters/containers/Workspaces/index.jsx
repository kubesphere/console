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

import { get, isEmpty } from 'lodash'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Columns, Column, Loading, Pagination } from '@pitrix/lego-ui'
import { Button, Search } from 'components/Base'
import EmptyTable from 'components/Cards/EmptyTable'
import CreateModal from 'components/Modals/WorkspaceCreate'
import WorkspaceCard from 'clusters/components/Cards/Workspace'
import WorkspaceStore from 'stores/workspace'

import FORM_TEMPLATES from 'utils/form.templates'

import Title from './Title'

import styles from './index.scss'

@inject('rootStore')
@observer
class Workspaces extends React.Component {
  constructor(props) {
    super(props)

    this.store = new WorkspaceStore()

    this.state = {
      showCreate: false,
    }
  }

  componentDidMount() {
    this.store.fetchList({ limit: 10 })
  }

  get authKey() {
    return 'workspaces'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get formTemplate() {
    return FORM_TEMPLATES['workspaces']()
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.authKey,
    })
  }

  handlePagination = page => {
    this.store.fetchList({ page, limit: 10 })
  }

  enterWorkspace = async workspace => {
    const workspace_rule = get(globals.user, `workspace_rules[${workspace}]`)
    if (!workspace_rule) {
      await this.store.fetchRules({ workspace })
    }

    if (
      globals.app.hasPermission({ module: 'workspaces', action: 'manage' }) ||
      globals.app.hasPermission({
        module: 'workspaces',
        action: 'view',
        workspace,
      })
    ) {
      this.routing.push(`/workspaces/${workspace}/overview`)
    } else {
      this.routing.push('/')
    }
  }

  showCreate = () => {
    this.setState({ showCreate: true })
  }

  hideCreate = () => {
    this.setState({ showCreate: false })
  }

  handleCreate = data => {
    this.store.create(data).then(() => {
      this.hideCreate()
      location.href = `/workspaces/${data.metadata.name}`
    })
  }

  handleSearch = name => {
    this.store.fetchList({ name, limit: 10 })
  }

  renderList() {
    const { data, page, total, limit, isLoading } = this.store.list

    if (isEmpty(globals.user.workspaces)) {
      return <EmptyTable name="workspace" />
    }

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    return (
      <ul className={styles.cards}>
        <div className="h6">
          {t('List')} <span className={styles.total}>{total}</span>
        </div>
        {!isLoading && isEmpty(data) ? (
          <div className={styles.noData}>
            <img src="/assets/empty-card.svg" alt="" />
            <p>{t('RESOURCE_NOT_FOUND')}</p>
          </div>
        ) : (
          <>
            {data.map(item => (
              <WorkspaceCard
                key={item.name}
                data={item}
                onEnter={this.enterWorkspace}
              />
            ))}
            <div className="text-right margin-t12">
              <Pagination
                current={page}
                total={total}
                pageSize={limit}
                onChange={this.handlePagination}
              />
            </div>
          </>
        )}
      </ul>
    )
  }

  renderModals() {
    const { showCreate } = this.state
    return (
      <div>
        {this.enabledActions.includes('manage') && (
          <CreateModal
            store={this.store}
            formTemplate={this.formTemplate}
            visible={showCreate}
            onOk={this.handleCreate}
            onCancel={this.hideCreate}
            isSubmitting={this.store.isSubmitting}
          />
        )}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Title
          className={styles.title}
          icon="enterprise"
          title={t('Workspaces')}
          desc={t('WORKSPACE_DESC')}
        />
        <Columns>
          <Column>
            <Search
              placeholder={t('WORKSPACE_SEARCH_PLACEHOLDER')}
              onSearch={this.handleSearch}
            />
          </Column>
          <Column className="is-narrow">
            {this.enabledActions.includes('manage') && (
              <Button
                type="primary"
                className={styles.create}
                onClick={this.showCreate}
                data-test="workspace-create"
              >
                {t('Create')}
              </Button>
            )}
          </Column>
        </Columns>
        {this.renderList()}
        {this.renderModals()}
      </div>
    )
  }
}

export default Workspaces
