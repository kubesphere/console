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

import { to } from 'utils'
import ObjectMapper from 'utils/object.mapper'

export default class ResourceStore {
  @observable
  isExistService = false

  @observable
  service = {}

  @observable
  isLoading = true

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

  getServiceUrl = ({ name, cluster, namespace }) =>
    `api/v${this.getPath({ cluster, namespace })}/services/${name}`

  @action
  async checkService({ name, cluster, namespace }) {
    if (!name || !namespace) {
      return
    }

    const result = await request.get(
      this.getServiceUrl({ name, cluster, namespace }),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )

    this.isExistService = result.exist
  }

  @action
  async fetchService({ name, cluster, namespace }) {
    this.isLoading = true

    const result = await to(
      request.get(this.getServiceUrl({ name, cluster, namespace }))
    )

    this.service = ObjectMapper.services(result)
    this.isLoading = false
  }
}
