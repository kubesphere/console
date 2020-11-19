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

export default class LabelSets {
  apiVersion = `kapis/monitoring.kubesphere.io/v1alpha3`

  @observable
  labelsets = {}

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

  @action
  async fetchLabelSets({ cluster, namespace, ...params } = {}) {
    const result = await request.get(
      `${this.apiVersion}${this.getPath({
        cluster,
        namespace,
      })}/targets/labelsets`,
      params
    )

    const data = get(result, 'data') || []

    const labelsets = {}

    data.forEach(item => {
      Object.keys(item).forEach(key => {
        labelsets[key] = labelsets[key] || []
        if (!labelsets[key].includes(item[key])) {
          labelsets[key].push(item[key])
        }
      })
    })

    this.labelsets = labelsets
  }
}
