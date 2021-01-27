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

import { get } from 'lodash'
import { action, observable } from 'mobx'
import Base from 'stores/base'

export default class AlertRuleStore extends Base {
  get apiVersion() {
    return 'kapis/alerting.kubesphere.io/v2alpha1/'
  }

  module = 'rules'

  getResourceUrl = this.getListUrl

  @observable
  ruleCount = 0

  @observable
  builtinRuleCount = 0

  @observable
  targetsMetadata = []

  getPath({ cluster, namespace, type } = {}) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    if (type === 'builtin') {
      path += `/${type}`
    }
    return path
  }

  getFilterParams = params => {
    const result = { ...params }
    if (result['labels.severity']) {
      result.label_filters = `severity=${result['labels.severity']}`
      delete result['labels.severity']
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
    const result = await request.get(
      this.getResourceUrl({ cluster, namespace, type }),
      this.getFilterParams(params)
    )
    const data = (get(result, 'items') || []).map(item => ({
      cluster,
      namespace,
      ...this.mapper(item),
    }))

    const total = Number(result.total)

    if (type === 'builtin') {
      this.builtinRuleCount = total
    } else {
      this.ruleCount = total
    }

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
        limit: 1,
      }),
      request.get(
        this.getResourceUrl({ cluster, namespace, type: 'builtin' }),
        { page: 1, limit: 1 }
      ),
    ])
    this.ruleCount = get(result, '0.total', 0)
    this.builtinRuleCount = get(result, '1.total', 0)
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
}
