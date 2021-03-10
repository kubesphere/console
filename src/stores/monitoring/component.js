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

import { observable, action } from 'mobx'
import { isEmpty, get, set, groupBy } from 'lodash'

import { to } from 'utils'
import { getComponentStatus } from 'utils/status'

import Base from './base'

export default class ComponentMonitoring extends Base {
  @observable
  health = {
    data: {},
    counts: {},
    supportKsScheduler: false,
    supportControllerManager: false,
    isLoading: false,
  }

  @observable
  etcd = {}

  getApi = () => {
    const componentPath = this.module ? `/${this.module}` : ''
    return `${this.apiVersion}/components${componentPath}`
  }

  getNewRefreshedResult = (currentResult = [], originResult = []) => {
    const newResult = [...originResult]

    currentResult.forEach((record, index) => {
      const name = get(record, 'metric.__name__')
      let recordData = null

      if (name) {
        const quantile = get(record, 'metric.quantile')
        const verb = get(record, 'metric.verb')
        const result = get(record, 'metric.result')
        const originRecord = newResult.find(_record => {
          if (quantile) {
            return get(_record, 'metric.quantile') === quantile
          }

          if (verb) {
            return get(_record, 'metric.verb') === verb
          }

          if (result) {
            return get(_record, 'metric.result') === result
          }

          return get(_record, 'metric.__name__') === name
        })

        if (isEmpty(originRecord)) {
          newResult.push(record)
        } else {
          recordData = originRecord
        }
      } else {
        recordData = newResult[index]
      }

      if (!isEmpty(recordData)) {
        const newValues = this.getNewValues(recordData.values, record.value)
        set(recordData, 'values', newValues)
      }
    })

    return newResult
  }

  @action
  async fetchHealthMetrics() {
    this.health.isLoading = true

    await this.requestHealthMetrics()

    this.health.isLoading = false
  }

  /**
   * send request and update store without loading status
   */
  @action
  async requestHealthMetrics() {
    const path =
      this.cluster && globals.app.isMultiCluster
        ? `kapis/clusters/${this.cluster}/resources.kubesphere.io/v1alpha2/componenthealth`
        : 'kapis/resources.kubesphere.io/v1alpha2/componenthealth'
    const result = await to(request.get(path))

    const kubesphereStatus = result.kubesphereStatus || []
    const ksComponents = groupBy(kubesphereStatus, 'namespace')

    const isSupportScheduler = kubesphereStatus.some(
      status =>
        get(status, 'label.component') === 'kube-scheduler' &&
        get(status, 'healthyBackends', 0)
    )

    const isSupportControllerManager = kubesphereStatus.some(
      status =>
        get(status, 'label.component') === 'kube-controller-manager' &&
        get(status, 'healthyBackends', 0)
    )

    const data = {
      kubernetes: get(result, 'kubernetesStatus', []),
      node: get(result, 'nodeStatus', {}),

      kubesphere: get(ksComponents, 'kubesphere-system', []),
      openpitrix: get(ksComponents, 'openpitrix-system', []),
      istio: get(ksComponents, 'istio-system', []),
      monitoring: get(ksComponents, 'kubesphere-monitoring-system', []),
      logging: get(ksComponents, 'kubesphere-logging-system', []),
      devops: get(ksComponents, 'kubesphere-devops-system', []),
      kubeSystem: get(ksComponents, 'kube-system', []),
    }

    // components replicas count
    const counts = {}
    // components count
    const componentCounts = {}

    // calculate components count
    Object.entries(data).forEach(([key, components]) => {
      const count = {
        total: 0,
        health: 0,
      }

      const componentCount = { total: 0, health: 0 }

      if (key === 'node') {
        count.total = get(components, 'totalNodes', 0)
        count.health = get(components, 'healthyNodes', 0)
      } else if (key === 'kubernetes') {
        count.total = components.length
        count.health = components.filter(
          component => getComponentStatus(component) === 'Healthy'
        ).length
      } else {
        components.forEach(component => {
          count.total += component.totalBackends
          count.health += component.healthyBackends

          const status = getComponentStatus(component)
          componentCount.health += status === 'Healthy' ? 1 : 0
          componentCount.total += status === 'Stopped' ? 0 : 1
        })
      }

      counts[key] = count
      componentCounts[key] = componentCount
    })

    this.health = {
      ...(this.health || {}),
      ...{
        data,
        counts,
        componentCounts,
        supportKsScheduler: isSupportScheduler,
        supportControllerManager: isSupportControllerManager,
      },
    }
  }
}
