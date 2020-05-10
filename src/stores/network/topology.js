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

import { processTopology } from './utils'

export default class BaseStore {
  topologies = {}

  @observable
  detail = {}

  @observable
  isLoading = true

  @observable
  isSubmitting = false

  constructor(module) {
    this.module = module
  }

  getPath({ cluster, namespace }) {
    let path = ''
    if (cluster) {
      path += `/klusters/${cluster}`
    }
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getListUrl = params =>
    `kapis/network.kubesphere.io/v1alpha2${this.getPath(params)}/topology`

  getDetailUrl = params => `${this.getListUrl(params)}/${params.name}`

  @action
  async fetchList(params) {
    this.isLoading = true

    const result = await request.get(this.getListUrl(params), params)

    this.topologies = processTopology(get(result, 'nodes', {}))

    this.isLoading = false
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl(params))

    this.detail = result
    this.isLoading = false
  }
}
