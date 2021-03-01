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

import { get, set, has, findKey } from 'lodash'
import { observable, action } from 'mobx'

import { generateId, withDryRun } from 'utils'
import { TIME_MICROSECOND_MAP, MODULE_KIND_MAP } from 'utils/constants'
import { transformTraces } from 'utils/tracing'

import Base from 'stores/base'

const healthProcess = health => {
  if (has(health, 'requests.errorRatio')) {
    return health
  }

  let totalRPS = 0
  let errorRPS = 0
  const inboundData = get(health, 'requests.inbound.http', {})
  Object.keys(inboundData).forEach(key => {
    const value = Number(inboundData[key])
    totalRPS += value
    if (Number(key) >= 400) {
      errorRPS += value
    }
  })

  set(health, 'requests.errorRatio', Math.max((errorRPS * 100) / totalRPS, 0))

  return health
}

export default class ApplicationStore extends Base {
  constructor(module = 'applications') {
    super(module)
  }

  @observable
  isTracingLoading = true

  tracing = {
    data: [],
    total: 0,
  }

  graph = {
    data: {},
    health: {},
  }

  @observable
  env = {
    data: {},
    isLoading: false,
  }

  getGraphUrl = ({ cluster, namespace }) =>
    `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
      cluster,
      namespace,
    })}/graph?duration=60s&graphType=versionedApp&injectServiceNodes=true&groupBy=app&appenders=deadNode,sidecarsCheck,serviceEntry,istio,responseTime`

  getHealthUrl = ({ cluster, namespace, type }) =>
    `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
      cluster,
      namespace,
    })}/health?rateInterval=60s&type=${type}`

  @action
  async fetchGraph({ cluster, namespace, app } = {}) {
    const [
      result,
      appHealth,
      serviceHealth,
      workloadHealth,
    ] = await Promise.all([
      request.get(this.getGraphUrl({ cluster, namespace, app })),
      request.get(this.getHealthUrl({ cluster, namespace, type: 'app' })),
      request.get(this.getHealthUrl({ cluster, namespace, type: 'service' })),
      request.get(this.getHealthUrl({ cluster, namespace, type: 'workload' })),
    ])

    const serviceNames = this.detail.services || []
    const workloadNames = this.detail.workloads || []

    const workloadServiceMap = {}

    if (appHealth && serviceHealth && workloadHealth) {
      this.graph.health = serviceNames.reduce((prev, cur) => {
        if (!appHealth[cur]) {
          return prev
        }

        const { requests, workloadStatuses } = appHealth[cur]
        const workloads = workloadStatuses.reduce(
          (_prev, workload) => ({
            ..._prev,
            [workload.name]: healthProcess(workloadHealth[workload.name]),
          }),
          {}
        )

        Object.keys(workloads).forEach(key => {
          workloadServiceMap[key] = cur
        })

        return {
          ...prev,
          [cur]: {
            requests,
            workloadStatuses,
            workloads,
            service: healthProcess(serviceHealth[cur]),
          },
        }
      }, {})
    }

    if (result && result.elements) {
      const nodes = []
      result.elements.nodes.forEach(node => {
        if (
          node.data.nodeType === 'service' &&
          serviceNames.includes(node.data.service)
        ) {
          nodes.push(node)
        } else if (
          node.data.nodeType === 'app' &&
          node.data.workload &&
          workloadNames.includes(node.data.workload)
        ) {
          node.data.app = workloadServiceMap[node.data.workload]
          nodes.push(node)
        }

        if (node.data.isRoot && node.data.namespace !== namespace) {
          node.data.targetNamespace = namespace
          nodes.push(node)
        }
      })

      this.graph.data = { nodes, edges: result.elements.edges }
    }
  }

  @action
  fetchAppMetrics({ name, cluster, namespace }, options = {}) {
    const queryTime = Math.floor(new Date().getTime() / 1000)
    const metricsParams = {
      queryTime,
      duration: 60,
      step: 20,
      rateInterval: '20s',
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
    return request.get(
      `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
        cluster,
        namespace,
      })}/apps/${name}/metrics`,
      metricsParams
    )
  }

  @action
  fetchServiceMetrics({ name, cluster, namespace }, options = {}) {
    const queryTime = Math.floor(new Date().getTime() / 1000)
    const metricsParams = {
      queryTime,
      duration: 60,
      step: 20,
      rateInterval: '20s',
      'filters[]': ['request_count', 'request_duration', 'request_error_count'],
      direction: 'inbound',
      reporter: 'destination',
      requestProtocol: 'http',
      ...options,
    }
    return request.get(
      `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
        cluster,
        namespace,
      })}/services/${name}/metrics`,
      metricsParams
    )
  }

  @action
  fetchWorkloadMetrics({ name, cluster, namespace }, options = {}) {
    const metricsParams = {
      duration: 60,
      step: 20,
      rateInterval: '20s',
      direction: 'inbound',
      reporter: 'source',
      requestProtocol: 'http',
      ...options,
    }
    return request.get(
      `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
        cluster,
        namespace,
      })}/workloads/${name}/metrics`,
      metricsParams
    )
  }

  @action
  async fetchTracing({ service, cluster, namespace, ...rest }) {
    this.isTracingLoading = true

    const params = {
      limit: 5,
      lookback: '2d',
      ...rest,
    }

    const currentTime = new Date().getTime()
    params.start =
      params.start ||
      `${currentTime - TIME_MICROSECOND_MAP[params.lookback]}000`
    params.end = params.end || `${currentTime}000`

    try {
      const result = await request.get(
        `kapis/servicemesh.kubesphere.io/v1alpha2${this.getPath({
          cluster,
          namespace,
        })}/services/${service}/traces`,
        params
      )

      if (result && result.data) {
        this.tracing.data = transformTraces(result.data)
      }
    } catch (error) {}

    this.isTracingLoading = false
  }

  @action
  setSelectRowKeys(keys) {
    this.list.selectedRowKeys.replace(keys)
  }

  @action
  create(data, params) {
    const { application, ingress, ...components } = data

    const isServiceMeshEnable =
      get(
        application,
        'metadata.annotations["servicemesh.kubesphere.io/enabled"]'
      ) === 'true'

    const requests = [{ url: this.getListUrl(params), data: application }]

    const rules = get(ingress, 'spec.rules', [])
    if (rules.length > 0) {
      const applicationName = get(application, 'metadata.name')
      if (!get(ingress, 'metadata.name')) {
        set(
          ingress,
          'metadata.name',
          `${applicationName}-ingress-${generateId()}`
        )
      }

      if (isServiceMeshEnable) {
        const serviceName = get(
          ingress,
          'spec.rules[0].http.paths[0].backend.serviceName'
        )
        if (serviceName) {
          set(
            ingress,
            'metadata.annotations["nginx.ingress.kubernetes.io/upstream-vhost"]',
            `${serviceName}.${params.namespace}.svc.cluster.local`
          )
        }
      }

      requests.push({
        url: `apis/extensions/v1beta1${this.getPath(params)}/ingresses`,
        data: ingress,
      })
    }

    Object.values(components).forEach(component => {
      if (component.workload && component.service) {
        const module =
          findKey(MODULE_KIND_MAP, o => o === component.workload.kind) ||
          'deployments'

        requests.push(
          {
            url: `apis/apps/v1${this.getPath(params)}/${module}`,
            data: component.workload,
          },
          {
            url: `api/v1${this.getPath(params)}/services`,
            data: component.service,
          }
        )
      }
    })

    return this.submitting(withDryRun(requests))
  }

  @action
  addComponent(component, params) {
    const requests = []

    if (!params.namespace) {
      return
    }

    if (component.workload && component.service) {
      const module =
        findKey(MODULE_KIND_MAP, o => o === component.workload.kind) ||
        'deployments'

      requests.push(
        {
          url: `apis/apps/v1${this.getPath(params)}/${module}`,
          data: component.workload,
        },
        {
          url: `api/v1${this.getPath(params)}/services`,
          data: component.service,
        }
      )
    }

    return this.submitting(withDryRun(requests))
  }

  @action
  patch({ namespace, cluster, name }, data) {
    return this.submitting(
      request.patch(this.getDetailUrl({ name, cluster, namespace }), data)
    )
  }

  @action
  delete({ name, cluster, namespace }) {
    return this.submitting(
      request.delete(this.getDetailUrl({ name, cluster, namespace }))
    )
  }

  @action
  checkName({ name, cluster, namespace }) {
    return request.get(
      this.getDetailUrl({ name, cluster, namespace }),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )
  }

  @action
  fetchSampleData(app) {
    return request.get(`sample/${app}`)
  }
}
