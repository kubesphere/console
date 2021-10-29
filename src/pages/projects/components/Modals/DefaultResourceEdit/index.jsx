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

import { get, mergeWith, isUndefined } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/Base'
import { ResourceLimit } from 'components/Inputs'
import QuotaStore from 'stores/quota'
import WorkspaceQuotaStore from 'stores/workspace.quota'
import { getLeftQuota } from 'utils/workload'

export default class DefaultResourceEditModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    namespace: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    namespace: '',
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.quotaStore = new QuotaStore()
    this.workspaceQuotaStore = new WorkspaceQuotaStore()

    this.state = {
      data: get(props.detail, 'limit', {}),
      error: '',
      leftQuota: {},
    }
  }

  componentDidMount() {
    this.fetchQuota()
  }

  componentDidUpdate(prevProps) {
    const { detail } = this.props
    if (detail.limit && detail.limit !== prevProps.detail.limit) {
      this.setState({ data: detail.limit })
    }
  }

  get resourceLimit() {
    return {
      requests: get(this.props.detail, 'limit.defaultRequest', {}),
      limits: get(this.props.detail, 'limit.default', {}),
      gpu: get(this.props.detail, 'limit.gpu', {
        type: '',
        value: '',
      }),
    }
  }

  handleChange = data => {
    this.setState({
      data: {
        default: data.limits,
        defaultRequest: data.requests,
        gpu: data.gpu,
      },
    })
  }

  fetchQuota() {
    const { workspace, project } = this.props
    const { cluster, name } = project || {}

    if (workspace && name) {
      Promise.all([
        this.quotaStore.fetch({
          cluster,
          namespace: name,
        }),
        this.workspaceQuotaStore.fetchDetail({
          name: workspace,
          workspace,
          cluster,
        }),
      ]).then(() => {
        this.setState({
          leftQuota: getLeftQuota(
            get(this.workspaceQuotaStore.detail, 'status.total'),
            this.quotaStore.data
          ),
        })
      })
    }
  }

  get workspaceQuota() {
    const nsQuota = get(this.state.leftQuota, 'namespace', {})
    const wsQuota = get(this.state.leftQuota, 'workspace', {})
    return mergeWith(nsQuota, wsQuota, (ns, ws) => {
      if (!ns && !ws) {
        return undefined
      }
      if (!isUndefined(ns)) {
        return ns
      }
      return ws
    })
  }

  handleOk = () => {
    const { onOk } = this.props
    onOk(this.state.data)
  }

  handleError = error => this.setState({ error })

  getQuotaInfo = path => get(this.workspaceQuota, path, undefined)

  render() {
    const { visible, onCancel, isSubmitting } = this.props
    const { error } = this.state
    const workspaceLimitProps = {
      limits: {
        cpu: this.getQuotaInfo('limits.cpu'),
        memory: this.getQuotaInfo('limits.memory'),
      },
      requests: {
        cpu: this.getQuotaInfo('requests.cpu'),
        memory: this.getQuotaInfo('requests.memory'),
      },
      limitType: 'project',
    }

    return (
      <Modal
        width={960}
        title={t('EDIT_DEFAULT_CONTAINER_QUOTAS')}
        icon="firewall"
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
        disableSubmit={!!error}
      >
        <ResourceLimit
          defaultValue={this.resourceLimit}
          onChange={this.handleChange}
          onError={this.handleError}
          supportGpuSelect={this.props.supportGpuSelect || false}
          workspaceLimitProps={workspaceLimitProps}
        />
      </Modal>
    )
  }
}
