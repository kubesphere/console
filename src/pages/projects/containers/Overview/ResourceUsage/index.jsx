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
import { inject, observer } from 'mobx-react'
import isEqual from 'react-fast-compare'
import { get } from 'lodash'
import { toJS } from 'mobx'

import { ICON_TYPES } from 'utils/constants'
import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'
import OverviewStore from 'stores/overview'
import ProjectMonitorStore from 'stores/monitoring/project'

import {
  Select,
  Loading,
  RadioGroup,
  RadioButton,
} from '@kube-design/components'
import { Panel } from 'components/Base'

import AppResourceItem from './AppResourceItem'
import PhysicalResourceItem from './PhysicalResourceItem'

import styles from './index.scss'

const APP_RESOURCE_METRIC_TYPES = [
  'namespace_pod_count',
  'namespace_deployment_count',
  'namespace_statefulset_count',
  'namespace_daemonset_count',
  'namespace_job_count',
  'namespace_cronjob_count',
  'namespace_pvc_count',
  'namespace_service_count',
  'namespace_secret_count',
  'namespace_configmap_count',
  'namespace_ingresses_extensions_count',
]

const PHYSICAL_RESOURCE_METRIC_TYPES = [
  'namespace_cpu_usage',
  'namespace_memory_usage_wo_cache',
]

@inject('rootStore')
@observer
class ResourceUsage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      resourceType: 'application',
      range: 43200,
    }

    this.overviewStore = new OverviewStore()
    this.appResourceMonitorStore = new ProjectMonitorStore()
    this.physicalResourceMonitorStore = new ProjectMonitorStore()

    this.fetchData(this.props.match.params)
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.match.params, this.props.match.params)) {
      this.fetchData(this.props.match.params)
    }
  }

  componentDidMount() {
    startAutoRefresh(this, {
      method: 'fetchMetrics',
      interval: 10000,
      leading: false,
    })
  }

  componentWillUnmount() {
    stopAutoRefresh(this)
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get namespace() {
    return get(this.props.match, 'params.namespace')
  }

  get cluster() {
    return get(this.props.match, 'params.cluster')
  }

  get timeOptions() {
    return [
      { label: `${t('Last')} ${t('TIME_H', { num: 1 })}`, value: 3600 },
      { label: `${t('Last')} ${t('TIME_H', { num: 2 })}`, value: 7200 },
      { label: `${t('Last')} ${t('TIME_H', { num: 5 })}`, value: 18000 },
      { label: `${t('Last')} ${t('TIME_H', { num: 12 })}`, value: 43200 },
      { label: `${t('Last')} ${t('TIME_D', { num: 1 })}`, value: 86400 },
      { label: `${t('Last')} ${t('TIME_D', { num: 2 })}`, value: 172800 },
      { label: `${t('Last')} ${t('TIME_D', { num: 3 })}`, value: 259200 },
      { label: `${t('Last')} ${t('TIME_D', { num: 7 })}`, value: 604800 },
    ]
  }

  fetchData = params => {
    this.fetchMetrics()
    this.overviewStore.fetchResourceStatus(params)
  }

  fetchMetrics = params => {
    const { resourceType, range } = this.state
    if (resourceType === 'application') {
      this.appResourceMonitorStore.fetchMetrics({
        ...this.props.match.params,
        metrics: APP_RESOURCE_METRIC_TYPES,
        step: `${Math.floor(range / 10)}s`,
        times: 10,
        fillZero: true,
        ...params,
        autoRefresh: false,
      })
    } else {
      this.physicalResourceMonitorStore.fetchMetrics({
        ...this.props.match.params,
        metrics: PHYSICAL_RESOURCE_METRIC_TYPES,
        step: `${Math.floor(range / 40)}s`,
        times: 40,
        fillZero: true,
        ...params,
        autoRefresh: false,
      })
    }
  }

  getResourceData = () => {
    const { quota = {}, status = {} } = toJS(this.overviewStore.resource)
    const used = quota.used || {}

    return [
      {
        key: 'pods',
        icon: ICON_TYPES['pods'],
        name: 'Pods',
        routeName: 'pods',
        num: used['count/pods'],
        warnNum: status.pods,
        metric: 'namespace_pod_count',
      },
      {
        key: 'deployments',
        icon: ICON_TYPES['deployments'],
        name: 'Deployments',
        routeName: 'deployments',
        num: used['count/deployments.apps'],
        warnNum: status.deployments,
        metric: 'namespace_deployment_count',
      },
      {
        key: 'statefulsets',
        icon: ICON_TYPES['statefulsets'],
        name: 'StatefulSets',
        routeName: 'statefulsets',
        num: used['count/statefulsets.apps'],
        warnNum: status.statefulsets,
        metric: 'namespace_statefulset_count',
      },
      {
        key: 'daemonsets',
        icon: ICON_TYPES['daemonsets'],
        name: 'DaemonSets',
        routeName: 'daemonsets',
        num: used['count/daemonsets.apps'],
        warnNum: status.daemonsets,
        metric: 'namespace_daemonset_count',
      },
      {
        key: 'jobs',
        icon: ICON_TYPES['jobs'],
        name: 'Jobs',
        routeName: 'jobs',
        num: used['count/jobs.batch'],
        metric: 'namespace_job_count',
      },
      {
        key: 'cronjobs',
        icon: ICON_TYPES['cronjobs'],
        name: 'CronJobs',
        routeName: 'cronjobs',
        num: used['count/cronjobs.batch'],
        metric: 'namespace_cronjob_count',
      },
      {
        key: 'volumes',
        icon: ICON_TYPES['volumes'],
        name: 'Volumes',
        routeName: 'volumes',
        num:
          used.persistentvolumeclaims || used['count/persistentvolumeclaims'],
        warnNum: status['persistent-volume-claims'],
        metric: 'namespace_pvc_count',
      },
      {
        key: 'services',
        icon: ICON_TYPES['services'],
        name: 'Services',
        routeName: 'services',
        num: used['count/services'],
        metric: 'namespace_service_count',
      },
      {
        key: 'routes',
        icon: ICON_TYPES['ingresses'],
        name: 'Routes',
        routeName: 'ingresses',
        num: used['count/ingresses.extensions'],
        metric: 'namespace_ingresses_extensions_count',
      },
    ]
  }

  handleResouceTypeChange = resourceType => {
    this.setState({ resourceType }, () => {
      this.fetchMetrics()
    })
  }

  handleRangeChange = range => {
    this.setState({ range }, () => {
      this.fetchMetrics()
    })
  }

  renderApplicationResource() {
    const { isLoading } = toJS(this.overviewStore.resource)
    const {
      data: metrics,
      isLoading: isMetricsLoading,
      isRefreshing,
    } = this.appResourceMonitorStore
    const resources = this.getResourceData()

    return (
      <Loading spinning={isLoading}>
        <div className={styles.resources}>
          {resources
            .filter(item => !item.disabled)
            .map(item => (
              <AppResourceItem
                {...this.props.match.params}
                {...item}
                metrics={get(metrics, `${item.metric}.data.result`)}
                isMetricsLoading={isMetricsLoading || isRefreshing}
              />
            ))}
        </div>
      </Loading>
    )
  }

  renderPhysicalResource() {
    const {
      data: metrics,
      isLoading: isMetricsLoading,
      isRefreshing,
    } = this.physicalResourceMonitorStore
    const range =
      this.timeOptions.find(item => item.value === this.state.range) || {}

    return (
      <div>
        <PhysicalResourceItem
          type="cpu"
          title={`${t('CPU Usage')} (${range.label})`}
          metrics={get(metrics, `namespace_cpu_usage.data.result`)}
          isLoading={isMetricsLoading || isRefreshing}
          showDay={range.value >= 172800}
        />
        <PhysicalResourceItem
          type="memory"
          title={`${t('Memory Usage')} (${range.label})`}
          metrics={get(metrics, `namespace_memory_usage_wo_cache.data.result`)}
          isLoading={isMetricsLoading || isRefreshing}
          showDay={range.value >= 172800}
        />
      </div>
    )
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <RadioGroup
          mode="button"
          value={this.state.resourceType}
          onChange={this.handleResouceTypeChange}
          size="small"
        >
          <RadioButton value="application">
            {t('Application Resources')}
          </RadioButton>
          <RadioButton value="physical">{t('Physical Resources')}</RadioButton>
        </RadioGroup>
        <Select
          className={styles.timeSelect}
          value={this.state.range}
          options={this.timeOptions}
          onChange={this.handleRangeChange}
        />
      </div>
    )
  }

  render() {
    const { resourceType } = this.state
    return (
      <Panel className={styles.wrapper} title={t('Resource Status')}>
        {this.renderHeader()}
        {resourceType === 'application'
          ? this.renderApplicationResource()
          : this.renderPhysicalResource()}
      </Panel>
    )
  }
}

export default ResourceUsage
