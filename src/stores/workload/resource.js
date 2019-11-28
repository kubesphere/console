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

  getServiceUrl = ({ name, namespace }) =>
    `api/v1/namespaces/${namespace}/services/${name}`

  @action
  async checkService({ name, namespace }) {
    const result = await request.get(
      this.getServiceUrl({ name, namespace }),
      {},
      {
        headers: { 'x-check-exist': true },
      }
    )

    this.isExistService = result.exist

    return Promise.resolve(result)
  }

  @action
  async fetchService({ name, namespace }) {
    this.isLoading = true

    const result = await to(
      request.get(this.getServiceUrl({ name, namespace }))
    )

    this.service = ObjectMapper.services(result)
    this.isLoading = false
  }
}
