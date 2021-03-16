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
import { get, groupBy } from 'lodash'

import { getComponentStatus } from 'utils/status'

export default class ComponentStore {
  @observable
  list = {
    data: {},
    isLoading: true,
  }

  @observable
  count = {}

  @observable
  exceptionCount = {}

  @observable
  healthyCount = {}

  @observable
  detail = {}

  @observable
  isLoading = true

  get apiVersion() {
    return 'kapis/resources.kubesphere.io/v1alpha2'
  }

  getListUrl = ({ cluster }) =>
    `${this.apiVersion}/klusters/${cluster}/components`

  getDetailUrl = ({ cluster, name }) =>
    `${this.getListUrl({ cluster })}/${name}`

  get totalCount() {
    const { kubesphere, kubernetes, openpitrix } = this.count
    const total = kubesphere + kubernetes + openpitrix
    return isNaN(total) ? 0 : total
  }

  @action
  async fetchList(params) {
    this.isLoading = true

    const result = await request.get(this.getListUrl(params))
    const components = groupBy(result, 'namespace')

    const data = {
      kubernetes: get(components, 'kube-system', []),
      kubesphere: get(components, 'kubesphere-system', []),
      istio: get(components, 'istio-system', []),
      monitoring: get(components, 'kubesphere-monitoring-system', []),
      logging: get(components, 'kubesphere-logging-system', []),
      devops: get(components, 'kubesphere-devops-system', []),
    }

    this.list = {
      data,
      isLoading: false,
    }

    const exceptionCount = {}
    const healthyCount = {}
    Object.entries(data).forEach(([key, values]) => {
      values.forEach(item => {
        const status = getComponentStatus(item)

        if (status === 'Warning') {
          exceptionCount[key] = exceptionCount[key] || 0
          exceptionCount[key] += 1
        }

        if (status === 'Healthy') {
          healthyCount[key] = healthyCount[key] || 0
          healthyCount[key] += 1
        }
      })
    })
    this.exceptionCount = exceptionCount
    this.healthyCount = healthyCount
  }

  @action
  async fetchDetail({ cluster, name }) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl({ cluster, name }))

    this.detail = result
    this.isLoading = false
  }
}
