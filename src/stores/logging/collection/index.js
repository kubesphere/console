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
import { get } from 'lodash'

export default class fluentBitStore {
  @observable
  isLoading = false

  get apiVersion() {
    return 'kapis/logging.kubesphere.io/v1alpha2/fluentbit'
  }

  @action
  async request(params, path = '', method = 'get') {
    this.isLoading = true
    const requestMethod = get(request, method, request.get)
    const response = await requestMethod(`${this.apiVersion}/${path}`, params)
    const { status } = response
    status !== 200 &&
      window.onunhandledrejection({
        status,
        reason: status,
      })
    this.isLoading = false
    return response
  }
}
