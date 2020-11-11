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

import { get } from 'lodash'
import { computed } from 'mobx'
import { avgs, unitTransformMap } from 'utils/monitoring'

import Base from './monitor'

const NAME_VALUE_HANDLE_MAP = {
  avg: avgs,
  last(values) {
    return values[values.length - 1]
  },
  first(values) {
    return values[0]
  },
}

export default class SinglestatMonitor extends Base {
  /**
   * value that user wanne
   *
   * @return stinrg
   */
  @computed
  get stat() {
    const { valueName, decimals = 0, format: unitFormat } = this.config
    const { metrics } = this
    const metricsLength = this.metrics.length

    if (metricsLength > 1) {
      return 'Only queries that return single series/table is supported'
    }

    if (metricsLength === 0) {
      return 'No Data'
    }

    /**
     * values: number[]
     */
    const values = get(metrics, '0.values', []).map(([, value]) =>
      Number(value)
    )

    const handler = NAME_VALUE_HANDLE_MAP[valueName] || avgs
    const number = handler(values) || 0
    const format = unitTransformMap[unitFormat] || unitTransformMap.none
    return format(number, decimals)
  }
}
