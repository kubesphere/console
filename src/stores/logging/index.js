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
import { stringify } from 'qs'
import { setLocalStorageItem, getLocalStorageItem } from 'utils/localStorage'

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

  get encodedPathParams() {
    const pathParams = Object.entries(this.pathParams)
      .reduce((path, param) => {
        const [key, value] = param
        return path.concat(value ? [key, value] : [])
      }, [])
      .join('/')

    return pathParams
  }

  get apiPath() {
    const encodedPathParams = this.encodedPathParams

    return encodedPathParams
      ? `${this.apiVersion}/${encodedPathParams}`
      : this.clusterLogAPI
  }

  get clusterLogAPI() {
    return 'kapis/tenant.kubesphere.io/v1alpha2/logs'
  }

  @action
  async request(params = {}, method = 'get', cacheMaxAge) {
    this.isLoading = true

    const localStorageKey = `${method}:${this.apiPath}?${stringify(params)}`

    const cache = cacheMaxAge && getLocalStorageItem(localStorageKey)

    const res = cache || (await request[method](this.apiPath, params))

    this.isLoading = false

    cacheMaxAge && setLocalStorageItem(localStorageKey, res, cacheMaxAge)

    return res
  }
}
