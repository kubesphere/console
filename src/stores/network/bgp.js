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

import ObjectMapper from 'utils/object.mapper'

import Base from 'stores/base'

export default class BGP extends Base {
  module = 'bgppeers'

  @observable
  bgpConf = {}

  getBGPConfURL(params) {
    return `kapis/resources.kubesphere.io/v1alpha3/${this.getPath(
      params
    )}/bgpconfs/default`
  }

  getBGPConfDetailURL(params) {
    return `${this.apiVersion}${this.getPath(params)}/bgpconfs/default`
  }

  @action
  async fetchBGPConf(params) {
    const result = await request.get(this.getBGPConfURL(params))
    this.bgpConf = { ...params, ...ObjectMapper['bgpConf'](result) }
  }

  @action
  updateBGPConf(params, newObject) {
    return this.submitting(
      request.patch(this.getBGPConfDetailURL(params), newObject)
    )
  }
}
