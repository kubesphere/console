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
import { get } from 'lodash'

import { getHpaFormattedData } from 'utils/workload'

import Base from '../base'

export default class HpaStore extends Base {
  constructor() {
    super()
    this.module = 'horizontalpodautoscalers'
  }

  get apiVersion() {
    return 'apis/autoscaling/v2beta2'
  }

  getDetailUrl = ({ name, namespace }) =>
    `${
      this.apiVersion
    }/namespaces/${namespace}/horizontalpodautoscalers/${name}`

  @action
  async fetchDetail({ name, namespace }) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl({ name, namespace }))
    const detail = this.mapper(result)

    this.detail = detail
    this.originDetail = result
    this.isLoading = false
  }

  @action
  create(data) {
    const namespace = get(data, 'metadata.namespace')

    if (!namespace) {
      return
    }

    const params = getHpaFormattedData(data)

    return this.submitting(request.post(this.getListUrl({ namespace }), params))
  }

  @action
  async patch({ name, namespace }, newObject) {
    const params = getHpaFormattedData(newObject)

    await this.submitting(
      request.patch(this.getDetailUrl({ name, namespace }), params)
    )
  }

  @action
  reset() {
    this.detail = {}
    this.originDetail = {}
  }
}
