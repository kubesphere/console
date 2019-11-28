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
import { isEmpty } from 'lodash'

import FORM_TEMPLATES from 'utils/form.templates'
import WorkspaceStore from 'stores/workspace'

import { Columns, Column } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'
import CreateModal from 'components/Modals/WorkspaceCreate'
import Workspaces from './Workspaces'
import Resources from './Resources'

export default class UserDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = { workspace: this.getWorkspace(), showCreate: false }

    this.store = new WorkspaceStore()

    localStorage.setItem(
      `${globals.user.username}-workspace`,
      this.state.workspace
    )
  }

  get enabledActions() {
    return globals.app.getActions({ module: 'workspaces' })
  }

  get formTemplate() {
    return FORM_TEMPLATES['workspaces']()
  }

  getWorkspace() {
    let workspace
    const savedWorkspace = localStorage.getItem(
      `${globals.user.username}-workspace`
    )

    if (savedWorkspace && globals.app.workspaces.includes(savedWorkspace)) {
      workspace = savedWorkspace
    } else {
      workspace = globals.app.workspaces[0]
    }

    return workspace
  }

  handleWorkspaceChange = workspace => {
    this.setState({ workspace })
  }

  showCreate = () => {
    this.setState({ showCreate: true })
  }

  hideCreate = () => {
    this.setState({ showCreate: false })
  }

  renderEmpty() {
    const { showCreate } = this.state
    const canCreate = this.enabledActions.includes('manage')

    return (
      <div>
        <EmptyList
          title={t('USER_DASHBOARD_EMPTY_TITLE')}
          desc={t('USER_DASHBOARD_EMPTY_DESC')}
          actions={
            canCreate ? (
              <Button type="control" onClick={this.showCreate}>
                {t('Create Workspace')}
              </Button>
            ) : null
          }
        />
        {canCreate && (
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
    const { workspace } = this.state

    if (isEmpty(workspace)) {
      return this.renderEmpty()
    }

    return (
      <div>
        <Columns className="is-variable is-1_1">
          <Column className="is-narrow">
            <Workspaces
              workspace={workspace}
              onChange={this.handleWorkspaceChange}
            />
          </Column>
          <Column>
            <Resources workspace={workspace} />
          </Column>
        </Columns>
      </div>
    )
  }
}
