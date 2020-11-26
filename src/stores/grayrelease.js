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

import { get, set, has, isEmpty, groupBy, findKey } from 'lodash'
import { action, observable } from 'mobx'
import { joinSelector } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import ObjectMapper from 'utils/object.mapper'

import Base from './base'

export default class GrayReleaseStore extends Base {
  @observable
  isComponentsLoading = true

  @observable
  components = {
    data: {},
  }

  module = 'strategies'

  @action
  async fetchList({ cluster, namespace, selector, ...rest }) {
    this.list.isLoading = true

    if (!namespace) {
      this.list.isLoading = false
      return
    }

    const params = rest

    if (!isEmpty(selector)) {
      params.labelSelector = joinSelector(selector)
    }

    const result = await request.get(
      this.getListUrl({ cluster, namespace }),
      params
    )
    this.list.update({
      data: result.items.map(item => ({ ...this.mapper(item), cluster })),
      total: result.items.length,
      isLoading: false,
    })
  }

  @action
  fetchMetrics(
    { cluster, namespace, newWorkloadName, oldWorkloadName, protocol },
    options = {}
  ) {
    const queryTime = Math.floor(new Date().getTime() / 1000)
    const metricsParams = {
      queryTime,
      duration: 300,
      step: 30,
      rateInterval: '30s',
      'filters[]': [
        'request_count',
        'request_duration',
        'request_error_count',
        'tcp_sent',
        'tcp_received',
      ],
      direction: 'inbound',
      reporter: 'destination',
      ...options,
    }

    if (protocol === 'http') {
      metricsParams.requestProtocol = 'http'
    }

    return Promise.all([
      request.get(
        `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
          cluster,
          namespace,
        })}/workloads/${newWorkloadName}/metrics`,
        metricsParams
      ),
      request.get(
        `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
          cluster,
          namespace,
        })}/workloads/${oldWorkloadName}/metrics`,
        metricsParams
      ),
    ])
  }

  @action
  fetchHealth(
    { cluster, namespace, newWorkloadName, oldWorkloadName },
    options = {}
  ) {
    const healthParams = {
      rateInterval: '30s',
      ...options,
    }

    return Promise.all([
      request.get(
        `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
          cluster,
          namespace,
        })}/workloads/${newWorkloadName}/health`,
        healthParams
      ),
      request.get(
        `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
          cluster,
          namespace,
        })}/workloads/${oldWorkloadName}/health`,
        healthParams
      ),
    ])
  }

  @action
  async fetchComponents({
    cluster,
    namespace,
    labelSelector,
    newVersion,
    oldVersion,
    service,
    silent,
    ...rest
  }) {
    !silent && (this.isComponentsLoading = true)

    if (!namespace) {
      this.isComponentsLoading = false
      return
    }

    const params = rest

    if (!isEmpty(labelSelector)) {
      params.labelSelector = labelSelector
    }

    const result = await request.get(
      `api/v1${this.getPath({ cluster, namespace })}/pods`,
      params
    )

    const pods = result.items.map(ObjectMapper.pods)
    const groupedPods = groupBy(pods, 'labels.version')

    const newPods = groupedPods[newVersion] || []
    const oldPods = groupedPods[oldVersion] || []

    this.components.data = {
      [newVersion]: {
        name: service,
        version: newVersion,
        pods: newPods,
        desire: newPods.length,
        available: newPods.filter(item => item.status.phase === 'Running')
          .length,
      },
      [oldVersion]: {
        name: service,
        version: oldVersion,
        pods: oldPods,
        desire: oldPods.length,
        available: oldPods.filter(item => item.status.phase === 'Running')
          .length,
      },
    }
    this.isComponentsLoading = false
  }

  @action
  create(data, { cluster, namespace }) {
    let req

    if (has(data, 'strategy')) {
      req = request.post(this.getListUrl({ cluster, namespace }), data.strategy)
    }

    if (has(data, 'workload')) {
      const kind = get(data, 'workload.kind', 'Deployment')
      const module = findKey(MODULE_KIND_MAP, o => o === kind) || 'deployments'

      req.then(
        request.post(
          `apis/apps/v1${this.getPath({ cluster, namespace })}/${module}`,
          data.workload
        )
      )
    }

    return this.submitting(req)
  }

  @action
  update(
    { name, cluster, namespace, newWorkloadName, newVersion, resourceVersion },
    data
  ) {
    const promises = []
    let updateVersion = ''

    if (has(data, 'workload')) {
      const kind = get(data, 'workload.kind', 'Deployment')
      const module = findKey(MODULE_KIND_MAP, o => o === kind) || 'deployments'
      updateVersion = get(data.workload, 'metadata.labels.version')

      if (updateVersion === newVersion) {
        const workloadName = get(data.workload, 'metadata.name')
        promises.push(
          request.put(
            `apis/apps/v1${this.getPath({
              cluster,
              namespace,
            })}/${module}/${workloadName}`,
            data.workload
          )
        )
      } else {
        promises.push(
          request.delete(
            `apis/apps/v1${this.getPath({
              cluster,
              namespace,
            })}/${module}/${newWorkloadName}`
          ),
          request.post(
            `apis/apps/v1${this.getPath({ cluster, namespace })}/${module}`,
            data.workload
          )
        )
      }
    }

    if (has(data, 'strategy')) {
      set(data.strategy, 'metadata.resourceVersion', resourceVersion)
      // if version changed, update strategy spec
      if (updateVersion && updateVersion !== newVersion) {
        if (get(data.strategy, 'spec.governor') === newVersion) {
          set(data.strategy, 'spec.governor', updateVersion)
        }

        const httpData =
          get(data.strategy, 'spec.template.spec.http') ||
          get(data.strategy, 'spec.template.spec.tcp', [])
        httpData.forEach(item => {
          if (item.route && item.route.length > 0) {
            item.route.forEach(route => {
              if (get(route, 'destination.subset') === newVersion) {
                set(route, 'destination.subset', updateVersion)
              }
            })
          }

          if (item.mirror && item.mirror.subset === newVersion) {
            item.mirror.subset = updateVersion
          }
        })
      }

      promises.push(
        request.put(
          this.getDetailUrl({ name, cluster, namespace }),
          data.strategy
        )
      )
    }

    return this.submitting(Promise.all(promises))
  }
}
