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

import Base from './base'

export default class RouterStore extends Base {
  @observable
  gateway = {
    data: {},
    isLoading: true,
  }

  constructor() {
    super()
    this.module = 'ingresses'
  }

  get apiVersion() {
    return 'apis/extensions/v1beta1'
  }

  getGatewayUrl = namespace =>
    `kapis/resources.kubesphere.io/v1alpha2/namespaces/${namespace}/router`

  @action
  async getGateway({ namespace }) {
    this.gateway.isLoading = true

    const url = this.getGatewayUrl(namespace)
    let data = {}

    try {
      const result = await request.get(url, null, null, () => {})
      if (result) {
        data = ObjectMapper.gateway(result)
      }
    } catch (error) {}

    this.gateway.data = data
    this.gateway.isLoading = false
  }

  @action
  addGateway({ namespace }, router) {
    return this.submitting(request.post(this.getGatewayUrl(namespace), router))
  }

  @action
  updateGateway({ namespace }, router) {
    return this.submitting(request.put(this.getGatewayUrl(namespace), router))
  }

  @action
  deleteGateway({ namespace }) {
    return this.submitting(request.delete(this.getGatewayUrl(namespace)))
  }
}
