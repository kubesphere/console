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

import { action, observable } from 'mobx'
import ObjectMapper from 'utils/object.mapper'

import Base from 'stores/base'

export default class FederatedStore extends Base {
  @observable
  detail = {}

  @observable
  syncEvent = {
    id: 0,
    params: {},
  }

  getPath({ namespace }) {
    let path = ''
    if (namespace) {
      path += `/namespaces/${namespace}`
    }
    return path
  }

  getListUrl = params =>
    `apis/types.kubefed.io/v1beta1${this.getPath(params)}/federated${
      this.module
    }${params.dryRun ? '?dryRun=All' : ''}`

  getDetailUrl = params => `${this.getListUrl(params)}/${params.name}`

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl(params))
    const detail = ObjectMapper.federated(result)

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action sync(params) {
    this.syncEvent = {
      id: new Date().getTime(),
      params,
    }
  }
}
