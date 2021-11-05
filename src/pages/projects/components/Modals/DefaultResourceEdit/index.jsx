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

import { get, mergeWith, isUndefined, omit, min, reduce, isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/Base'
import { ResourceLimit } from 'components/Inputs'
import QuotaStore from 'stores/quota'
import WorkspaceQuotaStore from 'stores/workspace.quota'
import { memoryFormat, resourceLimitKey, cpuFormat } from 'utils'

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
      availableQuota: {},
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

  availableQuota_memory = (data = {}) => {
    const newData = { ...data }
    Object.keys(data)
      .filter(key => key.endsWith('memory'))
      .forEach(key => {
        newData[key] = memoryFormat(data[key])
      })
    return newData
  }

  singleClusterQuota = (workspace, namespace, cluster) => {
    return new Promise(resolve => {
      Promise.all([
        this.quotaStore.fetch({
          cluster,
          namespace,
        }),
        this.workspaceQuotaStore.fetchDetail({
          name: workspace,
          workspace,
          cluster,
        }),
      ]).then(result => {
        const namespaceQuota = get(result[0], 'hard')
        const workspaceQuota = get(result[1], 'status.total.hard')
        resolve({ workspaceQuota, namespaceQuota })
      })
    })
  }

  multiClusterQuota = () => {
    const fetchArr = []
    const { workspace, namespace, clusters } = this.props
    const defaults = {
      'limits.cpu': undefined,
      'limits.memory': undefined,
    }
    clusters.forEach(cluster => {
      fetchArr.push(this.singleClusterQuota(workspace, namespace, cluster))
    })
    Promise.all(fetchArr).then(AllClusterQuota => {
      const workspaceQuotas = AllClusterQuota.map(item =>
        get(item, 'workspaceQuota', defaults)
      )
      const namespaceQuotas = AllClusterQuota.map(item =>
        get(item, 'namespaceQuota', defaults)
      )
      const gpuQuotas = AllClusterQuota.map(item =>
        omit(get(item, 'namespaceQuota', {}), resourceLimitKey)
      )

      this.setState({
        availableQuota: {
          workspace: this.transformQuota(workspaceQuotas),
          namespace: this.transformQuota(namespaceQuotas),
          gpuLimit: this.transformGpu(gpuQuotas)[0],
        },
      })
    })
  }

  transformGpu = data => {
    const gpuQuotas = reduce(
      data,
      (total, current) => {
        const hasKey = get(total, `${Object.keys(current)[0]}`)
        if (hasKey) {
          return Number(hasKey) > Number(Object.values(current)[0])
            ? { ...total, ...current }
            : { ...total }
        }
        return { ...total, ...current }
      },
      {}
    )
    return Object.keys(gpuQuotas).map(key => ({
      type: key
        .split('.')
        .slice(1)
        .join('.'),
      value: gpuQuotas[key],
    }))
  }

  transformQuota = data => {
    return {
      'limits.cpu': this.findCpuOrMemoryMin(data, 'limits.cpu'),
      'limits.memory': this.findCpuOrMemoryMin(data, 'limits.memory'),
      'requests.cpu': this.findCpuOrMemoryMin(data, 'requests.cpu'),
      'requests.memory': this.findCpuOrMemoryMin(data, 'requests.memory'),
    }
  }

  findCpuOrMemoryMin = (dataArr, key) => {
    const toArr = dataArr.map(item => {
      const num = get(item, `${key}`, '')
      if (num !== '' && key.endsWith('cpu')) {
        return cpuFormat(num)
      }
      return num !== '' ? memoryFormat(num) : undefined
    })
    return min(toArr)
  }

  getGpuLimit(namespaceQuota) {
    return !isEmpty(omit(namespaceQuota, resourceLimitKey))
      ? {
          type: Object.keys(omit(namespaceQuota, resourceLimitKey))[0]
            .split('.')
            .slice(1)
            .join('.'),
          value: Number(
            Object.values(omit(namespaceQuota, resourceLimitKey))[0]
          ),
        }
      : {
          type: '',
          value: '',
        }
  }

  fetchQuota = async () => {
    const { workspace, namespace, cluster, isFederated } = this.props

    if (workspace && namespace) {
      if (!isFederated) {
        const {
          workspaceQuota,
          namespaceQuota,
        } = await this.singleClusterQuota(workspace, namespace, cluster)

        this.setState({
          availableQuota: {
            workspace: this.availableQuota_memory(workspaceQuota),
            namespace: this.availableQuota_memory(namespaceQuota),
            gpuLimit: this.getGpuLimit(namespaceQuota),
          },
        })
      } else {
        this.multiClusterQuota()
      }
    }
  }

  get workspaceQuota() {
    const nsQuota = get(this.state.availableQuota, 'namespace', {})
    const wsQuota = get(this.state.availableQuota, 'workspace', {})
    return mergeWith(nsQuota, wsQuota, (ns, ws) => {
      if (!ns && !ws) {
        return undefined
      }
      if (!isUndefined(ns)) {
        return ns < ws ? ns : ws
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
      gpuLimit: get(this.state.availableQuota, 'gpuLimit'),
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
