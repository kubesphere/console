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
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { get, set, isEmpty, mergeWith, add, omitBy, endsWith } from 'lodash'
import { Form, Input } from '@kube-design/components'
import { Modal } from 'components/Base'
import { ResourceLimit } from 'components/Inputs'

import QuotaStore from 'stores/quota'
import WorkSpaceStore from 'stores/workspace.quota'
import { getLeftQuota, getUsedQuota } from 'utils/workload'

import Quotas from './Quotas'

import styles from './index.scss'

export default class QuotaEditModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.store = new QuotaStore()

    this.workspaceQuotaStore = new WorkSpaceStore()

    this.state = {
      formTemplate: {},
      error: '',
      leftQuota: {},
    }
  }

  componentDidMount() {
    if (this.props.detail && this.props.detail.name) {
      this.fetchQuota()
      this.fetchData(this.props.detail)
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, detail } = this.props
    if (visible && visible !== prevProps.visible && detail && detail.name) {
      this.fetchData(detail)
    }
  }

  async fetchData(detail = {}) {
    const ret = await this.store.checkName({
      name: detail.name,
      namespace: detail.name,
      cluster: detail.cluster,
    })

    if (ret.exist) {
      await this.store.fetchDetail({
        name: detail.name,
        namespace: detail.name,
        cluster: detail.cluster,
      })
    }

    const storeDetail = toJS(this.store.detail)

    this.setState({
      formTemplate: storeDetail,
    })
  }

  fetchQuota() {
    const { detail } = this.props
    const { workspace, name, cluster } = detail || {}

    if (workspace && name) {
      Promise.all([
        this.store.fetch({
          cluster,
          namespace: name,
        }),
        this.workspaceQuotaStore.fetchDetail({
          workspace,
          name: workspace,
          cluster,
        }),
      ]).then(dataArr => {
        const statusTotal = get(
          this.workspaceQuotaStore.detail,
          'status.total',
          {}
        )
        const specQuota = get(this.workspaceQuotaStore.detail, 'spec.quota', {})
        const { workspace: wsQuota } = getLeftQuota(
          !isEmpty(statusTotal) ? statusTotal : specQuota,
          get(dataArr[0], 'data')
        )
        const nsUsed = getUsedQuota(get(dataArr[0], 'data'))
        this.setState({
          leftQuota: mergeWith(nsUsed, wsQuota, (ns, ws) => {
            if (!ws) {
              return ns
            }
            return add(ns, ws)
          }),
        })
      })
    }
  }

  get resourceLimitProps() {
    const { formTemplate } = this.state
    const workspaceStore = this.state.leftQuota

    const memoryFormatter = value => {
      if (value > 0 && value < 1) {
        return value.toFixed(2)
      }
      if (value > 1 && value !== Infinity) {
        return value.toFixed(1)
      }
      return value
    }

    const workspaceLimitProps = !isEmpty(workspaceStore)
      ? {
          limits: {
            cpu: get(workspaceStore, 'limits.cpu'),
            memory: get(workspaceStore, 'limits.memory'),
          },
          requests: {
            cpu: get(workspaceStore, 'requests.cpu'),
            memory: get(workspaceStore, 'requests.memory'),
          },
        }
      : {}

    // get gpu config form spec.hard field and
    // pass it to resourceLimit component
    const supportGpu = globals.config.supportGpuType
    const hard = get(formTemplate, 'spec.hard', {})
    const whatTypeGpu = supportGpu.filter(type =>
      Object.keys(hard).some(key => endsWith(key, type))
    )
    const gpuSetting = !isEmpty(whatTypeGpu)
      ? {
          [`${whatTypeGpu[0]}`]: hard[`requests.${whatTypeGpu[0]}`],
        }
      : {}
    return {
      cpuProps: {
        marks: [
          { value: 0, label: t('NO_REQUEST'), weight: 4 },
          { value: 1, label: 1, weight: 4 },
          { value: 2, label: 2, weight: 2 },
          { value: 3, label: 3, weight: 2 },
          { value: 4, label: 4 },
          { value: 5, label: 5 },
          { value: 6, label: 6 },
          { value: 7, label: 7 },
          { value: 8, label: 8 },
          { value: Infinity, label: t('NO_LIMIT') },
        ],
      },
      memoryProps: {
        marks: [
          { value: 0, label: t('NO_REQUEST'), weight: 4 },
          { value: 2, label: 2, weight: 4 },
          { value: 4, label: 4, weight: 2 },
          { value: 6, label: 6, weight: 2 },
          { value: 8, label: 8 },
          { value: 10, label: 10 },
          { value: 12, label: 12 },
          { value: 14, label: 14 },
          { value: 16, label: 16 },
          { value: Infinity, label: t('NO_LIMIT') },
        ],
        unit: 'Gi',
        valueFormatter: memoryFormatter,
      },
      defaultValue: {
        limits: {
          cpu: get(formTemplate, 'spec.hard["limits.cpu"]'),
          memory: get(formTemplate, 'spec.hard["limits.memory"]'),
        },
        requests: {
          cpu: get(formTemplate, 'spec.hard["requests.cpu"]'),
          memory: get(formTemplate, 'spec.hard["requests.memory"]'),
          ...gpuSetting,
        },
      },
      workspaceLimitProps,
      onChange: value => {
        set(
          formTemplate,
          'spec.hard["limits.cpu"]',
          get(value, 'limits.cpu', null)
        )
        set(
          formTemplate,
          'spec.hard["limits.memory"]',
          get(value, 'limits.memory', null)
        )
        set(
          formTemplate,
          'spec.hard["requests.cpu"]',
          get(value, 'requests.cpu', null)
        )
        set(
          formTemplate,
          'spec.hard["requests.memory"]',
          get(value, 'requests.memory', null)
        )
        const supportGpuArr = globals.config.supportGpuType
        // exclude Gpu fields
        const oldHard = get(formTemplate, 'spec.hard', {})
        const noGpuHard = omitBy(oldHard, (_, key) =>
          supportGpuArr.some(type => key.endsWith(type))
        )
        set(formTemplate, 'spec.hard', noGpuHard)

        // set gpu config into hard field
        const incomeGpu = Object.keys(get(value, 'requests', {})).filter(key =>
          supportGpuArr.some(type => key.endsWith(type))
        )
        if (!isEmpty(incomeGpu)) {
          const type = incomeGpu[0]
          set(
            formTemplate,
            `spec.hard["requests.${type}"]`,
            value.requests[`${type}`]
          )
        }
      },
      onError: error => {
        this.setState({ error })
      },
      supportGpuSelect: this.props.supportGpuSelect,
      omitQuotaCheck: true,
    }
  }

  render() {
    const {
      detail,
      visible,
      onOk,
      onCancel,
      isFederated,
      isSubmitting,
    } = this.props

    const { error } = this.state

    return (
      <Modal.Form
        width={960}
        title={t('EDIT_PROJECT_QUOTAS')}
        icon="pen"
        data={this.state.formTemplate}
        onOk={onOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
        disableOk={!!error}
      >
        <div className={styles.body}>
          <Form.Item label={t('NAME')}>
            <Input name="name" defaultValue={detail.name} disabled />
          </Form.Item>
          <Form.Item>
            <ResourceLimit {...this.resourceLimitProps} />
          </Form.Item>
          <div className={styles.label}>{t('APPLICATION_RESOURCE_COUNT')}</div>
          <Quotas data={this.state.formTemplate} isFederated={isFederated} />
        </div>
      </Modal.Form>
    )
  }
}
