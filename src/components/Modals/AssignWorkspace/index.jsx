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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { Alert, Modal, Form, SearchSelect } from 'components/Base'

import WorkspaceStore from 'stores/workspace'
import WorkspaceMemberStore from 'stores/workspace/member'

@observer
export default class AssignWorkspaceModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      workspace: '',
    }

    this.formTemplate = {}

    this.workspaceStore = new WorkspaceStore()
    this.memberStore = new WorkspaceMemberStore()
  }

  componentDidMount() {
    this.workspaceStore.fetchResourceList()
  }

  getWorkspaces() {
    return this.workspaceStore.list.data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  getUsers() {
    return this.memberStore.list.data.map(item => ({
      label: item.username,
      value: item.username,
    }))
  }

  handleWorkspaceChange = workspace => {
    this.setState({ workspace }, () => {
      this.fetchMembers()
    })
  }

  fetchWorkspaces = async params => this.workspaceStore.fetchList(params)

  fetchMembers = async params => {
    if (this.state.workspace) {
      return this.memberStore.fetchList({
        workspace: this.state.workspace,
        ...params,
      })
    }

    return Promise.resolve({})
  }

  render() {
    return (
      <Modal.Form
        title={t('Assign Workspace')}
        icon="firewall"
        width={691}
        data={this.formTemplate}
        {...this.props}
      >
        <Alert
          className="margin-b12"
          type="info"
          message={t('PROJECT_ASSIGN_DESC')}
        />
        <Form.Item label={t('Target Workspace')} desc={t('Choose a workspace')}>
          <SearchSelect
            name="metadata.labels['kubesphere.io/workspace']"
            onChange={this.handleWorkspaceChange}
            options={this.getWorkspaces()}
            page={this.workspaceStore.list.page}
            total={this.workspaceStore.list.total}
            currentLength={this.workspaceStore.list.data.length}
            isLoading={this.workspaceStore.list.isLoading}
            onFetch={this.fetchWorkspaces}
          />
        </Form.Item>
        <Form.Item
          label={t('Project Manager')}
          desc={t(
            'Select an user of the workspace as the manager of the project.'
          )}
        >
          <SearchSelect
            name="metadata.annotations['kubesphere.io/creator']"
            options={this.getUsers()}
            page={this.memberStore.list.page}
            total={this.memberStore.list.total}
            currentLength={this.memberStore.list.data.length}
            isLoading={this.workspaceStore.list.isLoading}
            onFetch={this.fetchMembers}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
