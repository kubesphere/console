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

import { get, set } from 'lodash'
import { action, observable } from 'mobx'
import Base from 'stores/base'

export default class AlertRuleStore extends Base {
  get yamlApiVersion() {
    return 'alerting.kubesphere.io/v2beta1'
  }

  get apiVersion() {
    return 'apis/alerting.kubesphere.io/v2beta1/'
  }

  get ksApiVersion() {
    return 'kapis/alerting.kubesphere.io/v2beta1/'
  }

  module = 'rules'

  getRulePath = ({ namespace, type = '' }) => {
    if (namespace) {
      return 'rulegroups'
    }

    if (type === 'builtin') {
      return 'globalrulegroups'
    }

    return 'clusterrulegroups'
  }

  getListUrl = (params = {}) =>
    `${params.k8sOpt ? this.apiVersion : this.ksApiVersion}${this.getPath(
      params
    )}/${this.getRulePath(params)}${params.dryRun ? '?dryRun=All' : ''}`

  getResourceUrl = this.getListUrl

  @observable
  ruleCount = 0

  @observable
  builtinRuleCount = 0

  @observable
  targetsMetadata = []

  getPath({ cluster, namespace } = {}) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }

    return path
  }

  getFilterParams = params => {
    const result = { ...params }
    if (result['enable']) {
      result.labelSelector = `alerting.kubesphere.io/enable=${result['enable']}`
      delete result['enable']
    }
    return result
  }

  @action
  async fetchList({
    cluster,
    workspace,
    namespace,
    more,
    type,
    ...params
  } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = 'createTime'
    }

    if (params.limit === Infinity || params.limit === -1) {
      params.limit = -1
      params.page = 1
    }

    params.limit = params.limit || 10

    if (type === 'builtin') {
      params.builtin = true
    }

    const result = await request.get(
      this.getResourceUrl({ cluster, namespace, type }),
      this.getFilterParams(params)
    )
    const data = (get(result, 'items') || []).map(item => ({
      cluster,
      namespace,
      ...this.mapper(item),
    }))

    const total = result.totalItems

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }

  @action
  async fetchCount({ cluster, namespace }) {
    const result = await Promise.all([
      request.get(this.getResourceUrl({ cluster, namespace }), {
        page: 1,
        limit: -1,
      }),
      request.get(
        this.getResourceUrl({ cluster, namespace, type: 'builtin' }),
        { page: 1, limit: -1, builtin: true }
      ),
    ])
    this.ruleCount = get(result, '0.items', []).length
    this.builtinRuleCount = get(result, '1.items', []).length
  }

  @action
  async fetchMetadata(params) {
    const { data: targetsMetadata } = (await request.get(
      `kapis/monitoring.kubesphere.io/v1alpha3${this.getPath(
        params
      )}/targets/metadata`
    )) || { data: [] }

    this.targetsMetadata = targetsMetadata || []
  }

  fetchMetric = async ({ expr, step, start, end, cluster, namespace }) => {
    if (!expr) {
      return []
    }

    const response = await request.get(
      `kapis/monitoring.kubesphere.io/v1alpha3${this.getPath({
        cluster,
        namespace,
      })}/targets/query`,
      {
        expr,
        step,
        start,
        end,
      },
      null,
      () => {}
    )

    return get(response, 'data.result', [])
  }

  @action
  create(data, params = {}) {
    return this.submitting(
      request.post(this.getListUrl({ ...params, k8sOpt: true }), data)
    )
  }

  @action
  async update(params, newObject) {
    const result = await request.get(
      this.getDetailUrl({ ...params, k8sOpt: true })
    )
    const resourceVersion = get(result, 'metadata.resourceVersion')
    if (resourceVersion) {
      set(newObject, 'metadata.resourceVersion', resourceVersion)
    }
    return this.submitting(
      request.put(this.getDetailUrl({ ...params, k8sOpt: true }), newObject)
    )
  }

  @action
  patch(params, newObject) {
    return this.submitting(
      request.patch(this.getDetailUrl({ ...params, k8sOpt: true }), newObject)
    )
  }

  @action
  batchPatch(rowKeys, params, newObject) {
    return this.submitting(
      Promise.all(
        rowKeys.map(name => {
          return request.patch(
            this.getDetailUrl({ ...params, name, k8sOpt: true }),
            newObject
          )
        })
      )
    )
  }

  @action
  delete(params) {
    return this.submitting(
      request.delete(this.getDetailUrl({ ...params, k8sOpt: true }))
    )
  }

  @action
  batchDelete(rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(name => {
          const item = this.list.data.find(_item => _item.name === name)
          return request.delete(this.getDetailUrl({ ...item, k8sOpt: true }))
        })
      )
    )
  }

  @action
  checkName(params, query) {
    return request.get(
      this.getDetailUrl({ ...params, k8sOpt: true }),
      { ...query },
      {
        headers: { 'x-check-exist': true },
      }
    )
  }
}
