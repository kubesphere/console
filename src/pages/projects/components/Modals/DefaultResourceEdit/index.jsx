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

import {
  get,
  mergeWith,
  isUndefined,
  omit,
  min,
  reduce,
  pickBy,
  endsWith,
} from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/Base'
import { ResourceLimit } from 'components/Inputs'
import QuotaStore from 'stores/quota'
import WorkspaceQuotaStore from 'stores/workspace.quota'
import { cpuFormat, memoryFormat, resourceLimitKey, gpuLimitsArr } from 'utils'

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
    }
  }

  handleChange = data => {
    this.setState({
      data: {
        default: data.limits,
        defaultRequest: data.requests,
      },
    })
  }

  handleOk = () => {
    const { onOk } = this.props
    onOk(this.state.data)
  }

  handleError = error => this.setState({ error })

  availableQuota_memory = (data = {}) => {
    const newData = { ...data }
    Object.keys(data).forEach(key => {
      if (key.endsWith('memory')) {
        newData[key] = memoryFormat(data[key])
      }
      if (key.endsWith('cpu')) {
        newData[key] = cpuFormat(data[key])
      }
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
      ]).then(dataArr => {
        const workspaceQuota = get(dataArr[1], 'hard')
        const namespaceQuota = get(dataArr[0], 'data.hard')
        resolve({
          workspaceQuota: this.availableQuota_memory(workspaceQuota),
          namespaceQuota: this.availableQuota_memory(namespaceQuota),
        })
      })
    })
  }

  multiClusterQuota = (workspace, namespace) => {
    const fetchArr = []
    const defaults = {
      'limits.cpu': undefined,
      'limits.memory': undefined,
    }
    this.props.clusters.forEach(cluster =>
      fetchArr.push(this.singleClusterQuota(workspace, namespace, cluster))
    )
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
          namespace: {
            ...this.transformQuota(namespaceQuotas),
            ...this.transformGpu(gpuQuotas),
          },
        },
      })
    })
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
    const toArr = dataArr.map(item => item[key])
    return min(toArr)
  }

  transformGpu = data => {
    // filter other keys,just need gpu field
    // every namespace has one gpu type
    const supportGpu = globals.config.supportGpuType
    const gpuArr = data.map(item =>
      pickBy(item, (_, key) => supportGpu.some(type => endsWith(key, type)))
    )
    return reduce(
      gpuArr,
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
  }

  fetchQuota = async () => {
    const { workspace, cluster, namespace, isFederated } = this.props

    if (!isFederated) {
      const leftQuota = await this.singleClusterQuota(
        workspace,
        namespace,
        cluster
      )
      this.setState({
        availableQuota: {
          workspace: get(leftQuota, 'workspaceQuota'),
          namespace: get(leftQuota, 'namespaceQuota'),
        },
      })
    } else {
      this.multiClusterQuota(workspace, namespace)
    }
  }

  getQuotaInfo = path => get(this.workspaceQuota, path, undefined)

  get workspaceQuota() {
    const nsQuota = get(this.state, 'availableQuota.namespace', {})
    const wsQuota = get(this.state, 'availableQuota.workspace', {})
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

  getGpuLimit() {
    // workspaceQuota in multi cluster,
    // it include more than one type of gpu limit, is an object
    return gpuLimitsArr(this.workspaceQuota)
  }

  get workspaceLimitProps() {
    return {
      limits: {
        cpu: this.getQuotaInfo('limits.cpu'),
        memory: this.getQuotaInfo('limits.memory'),
      },
      requests: {
        cpu: this.getQuotaInfo('requests.cpu'),
        memory: this.getQuotaInfo('requests.memory'),
      },
      gpuLimit: this.getGpuLimit(),
    }
  }

  render() {
    const { visible, onCancel, isSubmitting } = this.props
    const { error } = this.state

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
          workspaceLimitProps={this.workspaceLimitProps}
        />
      </Modal>
    )
  }
}
