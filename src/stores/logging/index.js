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

export default class LoggingStore {
  @observable
  isLoading = false

  @observable
  pathParams = {}

  @observable
  data = []

  constructor(state = {}) {
    Object.getOwnPropertyNames(state).forEach(prop => {
      this[prop] = state[prop]
    })
  }

  get apiVersion() {
    return 'kapis/logging.kubesphere.io/v1alpha2'
  }

  getApiPath(cluster) {
    return cluster
      ? `kapis/clusters/${cluster}/tenant.kubesphere.io/v1alpha2/logs`
      : 'kapis/tenant.kubesphere.io/v1alpha2/logs'
  }

  @action
  async request(params = {}, method = 'get') {
    this.isLoading = true

    const { start_time, end_time, cluster, ...rest } = params

    const res = await request[method](this.getApiPath(cluster), {
      ...rest,
      start_time: start_time ? Math.floor(start_time / 1000) : undefined,
      end_time: end_time ? Math.floor(end_time / 1000) : undefined,
    })

    this.isLoading = false

    return res
  }
}
