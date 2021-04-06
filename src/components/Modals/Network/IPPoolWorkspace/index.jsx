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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { pick, get, set, cloneDeep } from 'lodash'

import { Alert, Form, Select } from '@kube-design/components'
import { Modal } from 'components/Base'

import WorkspaceStore from 'stores/workspace'

const ALL_WORKSPACE = ''

@observer
export default class IPPoolWorkspaceModal extends Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.formTemplate = cloneDeep(toJS(props.detail._originData))

    this.workspaceStore = new WorkspaceStore()
  }

  componentDidMount() {
    if (this.props.detail.isDefault) {
      set(
        this.formTemplate,
        "metadata.labels['kubesphere.io/workspace']",
        ALL_WORKSPACE
      )
    }
    this.workspaceStore.fetchList({ cluster: this.props.cluster })
  }

  getWorkspaces() {
    return [
      { label: t('All'), value: ALL_WORKSPACE },
      ...this.workspaceStore.list.data.map(item => ({
        label: item.name,
        value: item.name,
      })),
    ]
  }

  fetchWorkspaces = async params => this.workspaceStore.fetchList(params)

  workspaceValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { detail } = this.props
    const hasAllocation = get(detail, 'status.allocations', 0) > 0
    const workspace = detail.workspace

    if (hasAllocation && workspace && value !== workspace) {
      return callback({
        message: t('IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING'),
        field: rule.field,
      })
    }

    if (hasAllocation && value !== ALL_WORKSPACE) {
      return callback({
        message: t('IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING'),
        field: rule.field,
      })
    }

    callback()
  }

  handleSubmit = data => {
    const { onOk } = this.props
    const formData = {}
    const workspace = get(data, "metadata.labels['kubesphere.io/workspace']")
    if (workspace === ALL_WORKSPACE) {
      set(formData, "metadata.labels['kubesphere.io/workspace']", null)
      set(
        formData,
        "metadata.labels['ippool.network.kubesphere.io/default']",
        ''
      )
    } else {
      set(
        formData,
        "metadata.labels['kubesphere.io/workspace']",
        workspace || null
      )
      set(
        formData,
        "metadata.labels['ippool.network.kubesphere.io/default']",
        null
      )
    }

    onOk(formData)
  }

  render() {
    const { detail } = this.props
    const hasAllocation = get(detail, 'status.allocations', 0) > 0
    const workspace = detail.workspace
    return (
      <Modal.Form
        title={t('Assign Workspace')}
        icon="enterprise"
        width={691}
        data={this.formTemplate}
        {...this.props}
        onOk={this.handleSubmit}
      >
        {hasAllocation && workspace ? (
          <Alert
            className="margin-b12"
            type="warning"
            message={t('IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING')}
          />
        ) : (
          <Alert
            className="margin-b12"
            type="info"
            message={t('IPPOOL_ASSIGN_WORKSPACE_DESC')}
          />
        )}
        <Form.Item
          label={t('Target Workspace')}
          desc={t('Choose a workspace')}
          rules={[{ validator: this.workspaceValidator }]}
        >
          <Select
            name="metadata.labels['kubesphere.io/workspace']"
            options={this.getWorkspaces()}
            pagination={pick(this.workspaceStore.list, [
              'page',
              'total',
              'limit',
            ])}
            isLoading={this.workspaceStore.list.isLoading}
            onFetch={this.fetchWorkspaces}
            searchable
            clearable
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
