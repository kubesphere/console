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

import { API_VERSIONS } from 'utils/constants'
import NodeStore from './node'

export default class EdgeNodeStore extends NodeStore {
  module = 'edgenodes'

  get apiVersion() {
    return API_VERSIONS['nodes'] || ''
  }

  getListUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/nodes${
      params.dryRun ? '?dryRun=All' : ''
    }`

  getResourceUrl = (params = {}) =>
    `kapis/resources.kubesphere.io/v1alpha3${this.getPath(params)}/nodes`

  createEdgeNode = async ({ cluster, name, ip, defaultTaint }) => {
    const url = `kapis/kubeedge.kubesphere.io/v1alpha1/${this.getPath({
      cluster,
    })}/nodes/join`

    const result = await request.get(
      url,
      { node_name: name, node_ip: ip, add_default_taint: defaultTaint },
      {},
      resp => {
        return resp
      }
    )
    return result
  }
}
