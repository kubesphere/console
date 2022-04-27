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
import { get } from 'lodash'

import { Select } from '@kube-design/components'

import WorkspaceMonitorStore from 'stores/monitoring/workspace'

import { Component as Base } from 'clusters/containers/Monitor/Resource/Usage/Virtual'

const MetricTypes = {
  deployment_count: 'workspace_deployment_count',
  statefulset_count: 'workspace_statefulset_count',
  daemonset_count: 'workspace_daemonset_count',
  job_count: 'workspace_job_count',
  cronjob_count: 'workspace_cronjob_count',
  pvc_count: 'workspace_pvc_count',
  service_count: 'workspace_service_count',
  route_count: 'workspace_ingresses_extensions_count',
  pod_running_count: 'workspace_pod_running_count',
}

@inject('rootStore')
@observer
export default class VirtualResource extends Base {
  componentDidUpdate(prevProps) {
    if (prevProps.cluster !== this.props.cluster) {
      this.fetchData()
    }
  }

  get workspace() {
    return this.props.workspace
  }

  get createTime() {
    return get(this.props.rootStore, 'workspace.detail.createTime')
  }

  init() {
    this.monitorStore = new WorkspaceMonitorStore()
  }

  getMonitoringCfgs = () => [
    {
      type: 'deployment',
      title: 'DEPLOYMENT',
      legend: ['DEPLOYMENT_PL'],
      metricType: MetricTypes.deployment_count,
    },
    {
      type: 'statefulset',
      title: 'STATEFULSET',
      legend: ['STATEFULSET_PL'],
      metricType: MetricTypes.statefulset_count,
    },
    {
      type: 'daemonset',
      title: 'DAEMONSET',
      legend: ['DAEMONSET_PL'],
      metricType: MetricTypes.daemonset_count,
    },
    {
      type: 'job',
      title: 'JOB',
      legend: ['JOB_PL'],
      metricType: MetricTypes.job_count,
    },
    {
      type: 'cronjob',
      title: 'CRONJOB',
      legend: ['CRONJOB_PL'],
      metricType: MetricTypes.cronjob_count,
    },
    {
      type: 'pvc',
      title: 'PERSISTENT_VOLUME_CLAIM',
      legend: ['PERSISTENT_VOLUME_CLAIM_PL'],
      metricType: MetricTypes.pvc_count,
    },
    {
      type: 'service',
      title: 'SERVICE',
      legend: ['SERVICE_PL'],
      metricType: MetricTypes.service_count,
    },
    {
      type: 'routes',
      title: 'ROUTE',
      legend: ['ROUTE_PL'],
      metricType: MetricTypes.route_count,
    },
    {
      type: 'pod',
      title: 'POD',
      legend: ['RUNNING_PODS'],
      metricType: MetricTypes.pod_running_count,
    },
  ]

  getControllerProps = () => ({
    title: t('APPLICATION_RESOURCE_PL'),
    createTime: this.createTime,
    customAction: this.renderClusters(),
  })

  renderClusters() {
    const { workspace, cluster, ...clusterProps } = this.props
    if (clusterProps.options.length) {
      return <Select value={cluster} {...clusterProps} />
    }
  }

  fetchData = params => {
    this.monitorStore.cluster = this.props.cluster

    this.monitorStore.fetchMetrics({
      workspace: this.workspace,
      metrics: Object.values(MetricTypes),
      ...params,
    })
  }
}
