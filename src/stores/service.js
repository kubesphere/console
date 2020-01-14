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

import { get, set, has, isEmpty } from 'lodash'
import { action, observable } from 'mobx'
import { withDryRun } from 'utils'
import ObjectMapper from 'utils/object.mapper'
import Base from './base'
import S2iBuilderStore from './s2i/builder'

const processDeployment = data => {
  const hasPVC = get(data, 'spec.template.spec.volumes', []).some(
    volume => !isEmpty(volume.persistentVolumeClaim)
  )
  const maxUnavailable = get(
    data,
    'spec.strategy.rollingUpdate.maxUnavailable',
    null
  )
  if (hasPVC && !maxUnavailable) {
    set(data, 'spec.strategy.rollingUpdate.maxUnavailable', 1)
  }
}

const updateS2iServiceParams = data => {
  const s2iType = get(
    data.S2i,
    'metadata.labels.["s2i-type.kubesphere.io"]',
    ''
  )
  const serviceName = get(data.Service, 'metadata.name', '')
  const builderName = `${serviceName}-${s2iType}-${Math.random()
    .toString(36)
    .slice(-4)}`
  const kind = data.Deployment ? 'Deployment' : 'StatefulSet'
  const serviceData = data.Deployment || data.StatefulSet
  const name = get(serviceData, 'metadata.name', '')
  const replicas = get(serviceData, 'spec.replicas', 0)
  const containerName = get(
    serviceData,
    'spec.template.spec.containers[0].name',
    ''
  )

  let repoUrl = get(
    data,
    `S2i.metadata.annotations["kubesphere.io/repoUrl"]`,
    ''
  )
  if (repoUrl && !repoUrl.endsWith('/')) {
    repoUrl += '/'
  }
  const imageName = `${repoUrl}${get(data.S2i, 'spec.config.imageName')}:${get(
    data.S2i,
    'spec.config.tag'
  )}`
  // set private image repo secret to deployment
  const pullSecret = get(
    data.S2i,
    'spec.config.pushAuthentication.secretRef.name',
    ''
  )
  set(serviceData, 'spec.template.spec.imagePullSecrets[0].name', pullSecret)
  set(
    serviceData,
    'spec.template.metadata.annotations["kubesphere.io/containerSecrets"]',
    `{"${containerName}": "${pullSecret}"}`
  )
  set(data, 'S2i.metadata.annotations.serviceName', serviceName)
  data.S2i.metadata.name = builderName
  set(serviceData, 'metadata.labels.s2ibuilder', builderName)
  set(
    data.S2i,
    'metadata.annotations.["devops.kubesphere.io/autoscale"]',
    `[{ "Kind": "${kind}", "Name": "${name}", "initReplicas": ${replicas}, "container": "${containerName}" }]`
  )
  set(serviceData, 'spec.template.spec.containers[0].image', imageName)
}

export default class ServiceStore extends Base {
  @observable
  endpoints = {
    data: [],
    isLoading: true,
  }

  @observable
  workloads = {
    data: [],
    isLoading: false,
  }

  @observable
  pods = {
    data: [],
    isLoading: false,
  }

  @observable
  serviceQuota = {}

  constructor() {
    super()
    this.module = 'services'
    this.S2iBuilderStore = new S2iBuilderStore()
  }

  get apiVersion() {
    return 'api/v1'
  }

  getWorkloadUrl({ namespace, module }) {
    return `apis/apps/v1/namespaces/${namespace}/${module}`
  }

  @action
  async fetchEndpoints({ name, namespace }) {
    this.endpoints.isLoading = true
    this.endpoints.data.clear()

    let endpoints = []
    try {
      const result = await request.get(
        `api/v1/namespaces/${namespace}/endpoints/${name}`,
        null,
        null,
        () => {
          this.isSubmitting = false
        }
      )
      endpoints = result.subsets || []
    } catch (err) {}

    this.endpoints.data = endpoints.map(ObjectMapper.endpoints)
    this.endpoints.isLoading = false
  }

  @action
  async fetchPods({ namespace, ...params }) {
    this.pods.isLoading = true

    const result = await request.get(
      `api/v1/namespaces/${namespace}/pods`,
      params
    )

    this.pods = {
      data: result.items.map(ObjectMapper.pods),
      isLoading: false,
    }
  }

  @action
  async fetchWorkloads({ namespace, ...params }) {
    this.workloads.isLoading = true
    this.workloads.data.clear()

    const workloadTypes = ['deployments', 'daemonsets', 'statefulsets']

    const [deployments, daemonsets, statefulsets] = await Promise.all(
      workloadTypes.map(type =>
        request.get(`apis/apps/v1/namespaces/${namespace}/${type}`, params)
      )
    )

    const workloads = { deployments, daemonsets, statefulsets }

    workloadTypes.forEach(type => {
      if (workloads[type] && !isEmpty(workloads[type].items)) {
        const items = workloads[type].items.map(item => ({
          ...ObjectMapper[type](item),
          type,
        }))
        this.workloads.data = [...this.workloads.data, ...items]
      }
    })

    this.workloads.isLoading = false
  }

  @action
  create(data, { namespace }) {
    const requests = []

    if (has(data, 'metadata')) {
      requests.push({ url: this.getListUrl({ namespace }), data })
    } else {
      if (data.S2i) {
        updateS2iServiceParams(data)
        this.S2iBuilderStore.create(data.S2i, { namespace })
      }

      if (data.Service) {
        requests.push({
          url: this.getListUrl({ namespace }),
          data: data.Service,
        })
      }

      if (data.Deployment) {
        processDeployment(data.Deployment)
        requests.push({
          url: this.getWorkloadUrl({ namespace, module: 'deployments' }),
          data: data.Deployment,
        })
      }

      if (data.StatefulSet) {
        requests.push({
          url: this.getWorkloadUrl({ namespace, module: 'statefulsets' }),
          data: data.StatefulSet,
        })
      }
    }

    return this.submitting(withDryRun(requests))
  }

  @action
  update({ name, namespace, resourceVersion }, newObject) {
    if (!has(newObject, 'metadata.resourceVersion')) {
      set(newObject, 'metadata.resourceVersion', resourceVersion)
    }

    return this.submitting(
      request.put(this.getDetailUrl({ name, namespace }), newObject)
    )
  }
}
