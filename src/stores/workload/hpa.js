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

import { action } from 'mobx'

import { compareVersion } from 'utils'
import { API_VERSIONS } from 'utils/constants'
import { getHpaFormattedData } from 'utils/workload'

import Base from '../base'

const VERSION = 'v1.23.0'

export default class HpaStore extends Base {
  module = 'horizontalpodautoscalers'

  get apiVersion() {
    const k8sVersion = globals?.ksConfig?.k8sVersion
    const result = compareVersion(VERSION, k8sVersion)
    let module = ''

    if (result > 0) {
      module = 'horizontalpodautoscalers_outdated'
    } else {
      module = this.module
    }

    return API_VERSIONS[module] || ''
  }

  @action
  create(data, params) {
    return this.submitting(
      request.post(this.getListUrl(params), getHpaFormattedData(data))
    )
  }

  @action
  async patch(params, newObject) {
    await this.submitting(
      request.patch(this.getDetailUrl(params), getHpaFormattedData(newObject))
    )
  }

  @action
  reset() {
    this.detail = {}
  }
}
