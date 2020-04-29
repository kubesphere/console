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
import { action } from 'mobx'

import { withDryRun } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import FED_TEMPLATES from 'utils/fed.templates'

import Base from 'stores/base'
import FederatedStore from 'stores/federated'

import HpaStore from './hpa'
import ServiceStore from '../service'

export default class WorkloadStore extends Base {
  constructor(module) {
    super(module)

    this.hpaStore = new HpaStore()
  }

  @action
  async create(data, params) {
    const requests = []

    if (has(data, 'metadata')) {
      requests.push(this.getWorkloadRequest(data, params))
    } else {
      const kind = MODULE_KIND_MAP[this.module]

      if (has(data, kind)) {
        requests.push(this.getWorkloadRequest(data[kind], params))
      }

      if (has(data, 'Service')) {
        requests.push(this.getWorkloadRequest(data['Service'], params))
      }
    }

    return this.submitting(withDryRun(requests))
  }

  getServiceRequest = (data, params) => {
    const isFedManaged = !!get(data, 'spec.placement')
    const serviceStore = new ServiceStore()
    const fedStore = new FederatedStore('services')

    if (isFedManaged) {
      return {
        url: fedStore.getListUrl(params),
        data: FED_TEMPLATES.services({
          data,
          kind: 'Service',
        }),
      }
    }

    return { url: serviceStore.getListUrl(params), data }
  }

  getWorkloadRequest = (data, params) => {
    const isFedManaged = !!get(data, 'spec.placement')

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

    if (isFedManaged) {
      const fedStore = new FederatedStore(this.module)
      return {
        url: fedStore.getListUrl(params),
        data: FED_TEMPLATES.workloads({
          data,
          kind: MODULE_KIND_MAP[this.module],
        }),
      }
    }

    return { url: this.getListUrl(params), data }
  }

  @action
  delete({ name, cluster, namespace, annotations = {} }) {
    const promises = []
    promises.push(
      request.delete(this.getDetailUrl({ name, cluster, namespace }), {
        kind: 'DeleteOptions',
        apiVersion: 'v1',
        propagationPolicy: 'Background',
      })
    )

    const relateHPA = annotations['kubesphere.io/relatedHPA']

    if (relateHPA) {
      promises.push(
        this.hpaStore.delete({ name: relateHPA, cluster, namespace })
      )
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
  scale(params, newReplicas) {
    const data = { spec: { replicas: newReplicas } }
    return this.submitting(request.patch(this.getDetailUrl(params), data))
  }

  @action
  rerun({ name, cluster, namespace, resourceVersion }) {
    return this.submitting(
      request.post(
        `kapis/resources.kubesphere.io/v1alpha2${this.getPath({
          cluster,
          namespace,
        })}/jobs/${name}?action=rerun&resourceVersion=${resourceVersion}`
      )
    )
  }

  @action
  switch(params, on = false) {
    const data = { spec: { suspend: !on } }
    return this.submitting(request.patch(this.getDetailUrl(params), data))
  }
}
