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

import Base from './base'

export default class TypesStore extends Base {
  @observable
  resourceTypes = {}

  @observable
  metricTypes = {}

  @action
  async fetchResourceTypes(params = {}) {
    const result = await request.get(
      `${this.apiVersion}${this.getPath(params)}/resource_type`
    )
    const data = get(result, 'resource_type_set') || []
    const types = {}

    data.forEach(item => {
      types[item.rs_type_name] = {
        ...item,
      }
    })

    this.resourceTypes = types

    return types
  }

  @action
  async fetchMetricTypes({ cluster, rs_type_id, limit = 50 }) {
    const result = await request.get(
      `${this.apiVersion}${this.getPath({ cluster })}/metric`,
      {
        rs_type_ids: rs_type_id,
        limit,
      }
    )
    const data = get(result, 'metric_set') || []
    const types = {}

    data.forEach(item => {
      types[item.metric_name] = {
        ...item,
      }
    })

    this.metricTypes = types

    return types
  }
}
