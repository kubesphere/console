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

import { get, set, has, isString, isEmpty } from 'lodash'
import { action, observable, extendObservable } from 'mobx'

import { withDryRun } from 'utils'
import { getWorkloadVolumes } from 'utils/workload'
import { MODULE_KIND_MAP } from 'utils/constants'

import ObjectMapper from 'utils/object.mapper'

import Base from 'stores/base'

import HpaStore from './hpa'
import ServiceStore from '../service'

export default class WorkloadStore extends Base {
  @observable
  counts = {
    deployments: 0,
    statefulsets: 0,
    daemonsets: 0,
  }

  constructor(module) {
    super()
    this.module = module

    this.hpaStore = new HpaStore()
    this.serviceStore = new ServiceStore()
  }

  get apiVersion() {
    if (this.module === 'jobs') {
      return 'apis/batch/v1'
    }

    if (this.module === 'cronjobs') {
      return 'apis/batch/v1beta1'
    }

    return 'apis/apps/v1'
  }

  getResourceUrl = ({ namespace }) =>
    `kapis/resources.kubesphere.io/v1alpha2/namespaces/${namespace}/${
      this.module
    }`

  @action
  async fetchListByK8s(
    { namespace, labelSelector, ...rest },
    module = this.module
  ) {
    this.list.isLoading = true

    if (!namespace) {
      this.list.isLoading = false
      return
    }

    const params = rest

    if (!isEmpty(labelSelector)) {
      params.labelSelector = labelSelector
    }

    const result = await request.get(
      `${this.apiVersion}/namespaces/${namespace}/${module}`,
      params
    )
    const data = result.items.map(this.mapper)

    this.list.update({
      data,
      total: result.items.length,
      isLoading: false,
    })

    return data
  }

  @action
  async fetchByK8s({ namespace, ...params }, module) {
    const result = await request.get(
      `${this.apiVersion}/namespaces/${namespace}/${module}`,
      params
    )

    return result.items.map(ObjectMapper[module])
  }

  @action
  async fetchDetail({ name, namespace, silent }, isFetchVolumes = true) {
    if (!silent) {
      this.isLoading = true
    }

    const result = await request.get(this.getDetailUrl({ name, namespace }))
    const detail = this.mapper(result)

    if (isFetchVolumes) {
      detail.volumes = await getWorkloadVolumes(detail)
    }

    this.detail = detail

    if (!silent) {
      this.isLoading = false
    }

    return detail
  }

  @action
  async fetchCounts({ namespace }, modules = []) {
    if (isString(modules)) {
      modules = [modules]
    }

    if (!isEmpty(modules)) {
      const results = await Promise.all(
        modules.map(module =>
          request.get(
            `kapis/resources.kubesphere.io/v1alpha2/namespaces/${namespace}/${module}`
          )
        )
      )

      const counts = {}
      modules.forEach((module, index) => {
        counts[module] = results[index].total_count
      })

      extendObservable(this.counts, counts)
    }
  }

  @action
  create(data, { namespace }) {
    const requests = []

    if (has(data, 'metadata')) {
      requests.push(this.getWorkloadRequest(data))
    } else {
      const kind = MODULE_KIND_MAP[this.module]

      if (has(data, kind)) {
        requests.push(this.getWorkloadRequest(data[kind]))
      }

      if (has(data, 'Service')) {
        requests.push({
          url: this.serviceStore.getListUrl({ namespace }),
          data: data['Service'],
        })
      }
    }

    return this.submitting(withDryRun(requests))
  }

  getWorkloadRequest = data => {
    const namespace = get(data, 'metadata.namespace')

    if (['deployments', 'daemonsets'].includes(this.module)) {
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

    return { url: this.getListUrl({ namespace }), data }
  }

  @action
  delete({ name, namespace, annotations = {} }) {
    const promises = []
    promises.push(
      request.delete(this.getDetailUrl({ name, namespace }), {
        kind: 'DeleteOptions',
        apiVersion: 'v1',
        propagationPolicy: 'Background',
      })
    )

    const relateHPA = annotations['kubesphere.io/relatedHPA']

    if (relateHPA) {
      promises.push(this.hpaStore.delete({ name: relateHPA, namespace }))
    }

    return this.submitting(Promise.all(promises))
  }

  @action
  batchDelete(rowKeys) {
    const promises = []
    rowKeys.forEach(name => {
      const item = this.list.data.find(_item => _item.name === name)

      promises.push(
        request.delete(this.getDetailUrl(item), {
          kind: 'DeleteOptions',
          apiVersion: 'v1',
          propagationPolicy: 'Background',
        })
      )

      const relateHPA = get(item, "annotations['kubesphere.io/relatedHPA']")

      if (relateHPA) {
        promises.push(
          this.hpaStore.delete({ name: relateHPA, namespace: item.namespace })
        )
      }
    })

    return this.submitting(Promise.all(promises))
  }

  @action
  scale({ name, namespace }, newReplicas) {
    const data = { spec: { replicas: newReplicas } }
    return this.submitting(
      request.patch(this.getDetailUrl({ name, namespace }), data)
    )
  }

  @action
  rerun({ name, namespace, resourceVersion }) {
    return this.submitting(
      request.post(
        `kapis/resources.kubesphere.io/v1alpha2/namespaces/${namespace}/jobs/${name}?action=rerun&resourceVersion=${resourceVersion}`
      )
    )
  }

  @action
  switch({ name, namespace }, on = false) {
    const data = { spec: { suspend: !on } }
    return this.submitting(
      request.patch(this.getDetailUrl({ name, namespace }), data)
    )
  }
}
