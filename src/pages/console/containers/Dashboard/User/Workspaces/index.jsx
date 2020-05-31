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
import classNames from 'classnames'
import { isEmpty, get, last } from 'lodash'

import FORM_TEMPLATES from 'utils/form.templates'
import {
  getAreaChartOps,
  getZeroValues,
  getLastMonitoringData,
} from 'utils/monitoring'
import WorkspaceStore from 'stores/workspace'
import WorkspaceMonitorStore from 'stores/monitoring/workspace'

import { ReactComponent as MidLine } from 'src/assets/chart-equal.svg'
import { ReactComponent as ArrowUp } from 'src/assets/chart-up.svg'
import { ReactComponent as ArrowDown } from 'src/assets/chart-down.svg'

import { Icon, Loading } from '@pitrix/lego-ui'
import { TinyArea } from 'components/Charts'
import CreateModal from 'workspaces/components/Modals/WorkspaceCreate'
import SelectModal from 'workspaces/components/Modals/WorkspaceSelect'

import styles from './index.scss'

const MetricTypes = {
  service_count: 'workspace_service_count',
  pod_abnormal_count: 'workspace_pod_abnormal_count',
}

const getDifference = (values = []) => {
  const len = values.length
  if (len === 0) return '0'

  let result = values[0]

  if (len > 1) {
    result = get(last(values), [1], 0) - get(values[len - 2], [1], 0)
  }
  return result > 0 ? `+${result}` : result
}

@inject('rootStore')
@observer
export default class Workspaces extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showSelect: false,
      showCreate: false,
    }

    this.store = new WorkspaceStore()
    this.monitorStore = new WorkspaceMonitorStore()
  }

  get enabledActions() {
    return globals.app.getActions({ module: 'workspaces' })
  }

  get enabledWorkspaceActions() {
    return globals.app.getActions({
      module: 'workspaces',
      workspace: this.props.workspace,
    })
  }

  get formTemplate() {
    return FORM_TEMPLATES['workspaces']()
  }

  get metrics() {
    return this.monitorStore.data
  }

  componentDidMount() {
    const { workspace } = this.props

    this.fetchDetail(workspace)
    this.fetchMetrics({ workspace })
  }

  componentDidUpdate(prevProps) {
    const { workspace } = this.props
    if (workspace !== prevProps.workspace) {
      this.fetchDetail(workspace)
      this.fetchMetrics({ workspace })
    }
  }

  fetchDetail(workspace) {
    if (workspace) {
      this.store.fetchDetail({ workspace })
    }
  }

  fetchMetrics(params) {
    this.monitorStore.fetchMetrics({
      step: '30m',
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }

  getWorkspaces() {
    const { data } = this.props.rootStore.workspace.list
    return data.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  getMonitoringCfgs = () => [
    {
      title: 'Service',
      unit: '',
      legend: ['Service'],
      metricType: MetricTypes.service_count,
    },
    {
      title: 'Abnormal Pods',
      unit: '',
      areaColors: ['yellow'],
      legend: ['Abnormal Pods'],
      metricType: MetricTypes.pod_abnormal_count,
    },
  ]

  showSelect = () => {
    this.setState({ showSelect: true })
  }

  hideSelect = () => {
    this.setState({ showSelect: false })
  }

  handleSelect = workspace => {
    const { onChange } = this.props
    this.hideSelect()
    onChange(workspace)
  }

  showCreate = () => {
    this.setState({ showCreate: true, showSelect: false })
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

  enterWorkspace = () => {
    this.props.rootStore.routing.push(`/workspaces/${this.props.workspace}`)
  }

  renderSelector() {
    const { workspace } = this.props
    const detail = this.store.detail

    const isMulti = globals.app.workspaces.length > 1

    const isWorkspaceAdmin = this.enabledWorkspaceActions.includes('edit')

    return (
      <div
        className={classNames(styles.selector, { pointer: isMulti })}
        onClick={this.showSelect}
      >
        <div className={styles.icon}>
          <img src={detail.icon || '/assets/default-workspace.svg'} alt="" />
        </div>
        <div className={styles.title}>
          <p>{t('Workspace')}</p>
          <div className="h4">
            {workspace}
            {isWorkspaceAdmin && (
              <span className={styles.admin}>{t('Manager')}</span>
            )}
          </div>
        </div>
        {isMulti && (
          <div className={styles.arrow}>
            <Icon name="caret-down" type="light" />
          </div>
        )}
      </div>
    )
  }

  renderMonitoring() {
    const { isLoading } = this.monitorStore
    const lastMetrics = getLastMonitoringData(this.metrics)
    const configs = this.getMonitoringCfgs()

    return (
      <Loading spinning={isLoading}>
        <div className={styles.monitoring}>
          {configs.map(cfg => {
            const metricData =
              get(this.metrics, `${cfg.metricType}.data.result`) || []
            const data = isEmpty(metricData)
              ? [{ values: getZeroValues() }]
              : metricData
            const chartConfig = getAreaChartOps({
              ...cfg,
              title: '',
              data,
              bgColor: 'transparent',
              renderTitle: () => {
                const diff = getDifference(get(data, '[0].values') || [])
                const icon =
                  value === 0 ? (
                    <MidLine />
                  ) : value > 0 ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )

                return (
                  <div className={styles.chartTitle}>
                    {icon} {diff}
                  </div>
                )
              },
            })
            const value = get(lastMetrics, `${cfg.metricType}.value[1]`) || 0

            return (
              <div key={cfg.title} className={styles.item}>
                <div className={styles.info}>
                  <p>{t(cfg.title)}</p>
                  <strong>{value}</strong>
                </div>
                <div className={styles.chart}>
                  <TinyArea width="100%" height="100%" {...chartConfig} />
                </div>
              </div>
            )
          })}
        </div>
      </Loading>
    )
  }

  render() {
    const { showSelect, showCreate } = this.state

    const canCreate = this.enabledActions.includes('manage')
    const isWorkspaceAdmin = this.enabledWorkspaceActions.includes('edit')
    const canViewWorkspace = this.enabledWorkspaceActions.includes('view')

    return (
      <div className={styles.wrapper}>
        {this.renderSelector()}
        {(isWorkspaceAdmin || canViewWorkspace) && (
          <div className={styles.manage} onClick={this.enterWorkspace}>
            <Icon name="cogwheel" />
            {t('View Workspace')}
          </div>
        )}
        <div className={styles.divider} />
        {canViewWorkspace && this.renderMonitoring()}
        <SelectModal
          visible={showSelect}
          onChange={this.handleSelect}
          onShowCreate={canCreate ? this.showCreate : null}
          onCancel={this.hideSelect}
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
}
