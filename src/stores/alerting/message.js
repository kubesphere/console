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

import { LIST_DEFAULT_ORDER } from 'utils/constants'

import Base from 'stores/base'

export default class AlertStore extends Base {
  @observable
  ruleCount = 0

  @observable
  builtinRuleCount = 0

  get apiVersion() {
    return 'kapis/alerting.kubesphere.io/v2beta1'
  }

  module = 'alerts'

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

  getAlertPath = ({ namespace, type }) => {
    if (namespace) {
      return 'alerts'
    }

    if (type === 'builtin') {
      return 'globalalerts'
    }

    return 'clusteralerts'
  }

  getListUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/${this.getAlertPath(params)}${
      params.dryRun ? '?dryRun=All' : ''
    }`

  getResourceUrl = this.getListUrl

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
    ruleName,
    type,
    ...params
  } = {}) {
    this.list.isLoading = true

    if (!params.sortBy && params.ascending === undefined) {
      params.sortBy = LIST_DEFAULT_ORDER[this.module] || 'createTime'
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
      this.getResourceUrl({ cluster, workspace, namespace, ruleName, type }),
      this.getFilterParams(params)
    )
    const data = (get(result, 'items') || []).map((item, index) => ({
      cluster,
      namespace,
      id: index,
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
        limit: 1,
      }),
      request.get(
        this.getResourceUrl({ cluster, namespace, type: 'builtin' }),
        { page: 1, limit: 1, builtin: true }
      ),
    ])
    this.ruleCount = get(result, '0.totalItems', 0)
    this.builtinRuleCount = get(result, '1.totalItems', 0)
  }
}
