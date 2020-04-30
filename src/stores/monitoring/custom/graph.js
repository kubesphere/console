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

import { computed } from 'mobx'
import { unitTransformMap, avgs } from 'utils/monitoring'
import { get } from 'lodash'

import Base from './monitor'

const NAME_VALUE_HANDLE_MAP = {
  avg: avgs,
  last(values) {
    return values[values.length - 1]
  },
  first(values) {
    return values[0]
  },
  max(values) {
    return Math.max.apply(null, values)
  },
  min(values) {
    return Math.min.apply(null, values)
  },
}

export default class GraphMonitor extends Base {
  @computed
  get graphData() {
    const dataTimeGroup = this.metrics.reduce((dataGroupByTime, metric) => {
      const { values, id } = metric

      values.forEach(([time, value]) => {
        const timestamp = time * 1000
        const dataInTime = dataGroupByTime[timestamp] || {}
        dataInTime[id] = Number(value)
        dataGroupByTime[timestamp] = dataInTime
      })

      return dataGroupByTime
    }, {})

    const data = Object.entries(dataTimeGroup).map(([time, message]) => ({
      time: Number(time),
      ...message,
    }))

    return data
  }

  @computed
  get legends() {
    const { colors = [] } = this.config
    return this.formattedMetrics.map((metric, index) => {
      const { id, name } = metric
      return {
        name,
        ID: id,
        color: colors[index % colors.length],
      }
    })
  }

  @computed
  get valueFormatter() {
    const format = get(this.config, 'yaxes[0].format', 'none')
    const decimals = get(this.config, 'yaxes[0].decimals', 2)
    const formatter = unitTransformMap[format] || function() {}
    return number => formatter(number, decimals)
  }

  @computed
  get stats() {
    return this.formattedMetrics.map((metric, index) => {
      const values = (metric.values || []).map(([, value]) => Number(value))
      const { colors = [] } = this.config
      const { id, name } = metric

      return {
        id,
        name,
        color: colors[index % colors.length],
        stat: {
          max: this.valueFormatter(NAME_VALUE_HANDLE_MAP.max(values)),
          min: this.valueFormatter(NAME_VALUE_HANDLE_MAP.min(values)),
          avg: this.valueFormatter(NAME_VALUE_HANDLE_MAP.avg(values)),
          last: this.valueFormatter(NAME_VALUE_HANDLE_MAP.last(values)),
        },
      }
    })
  }
}
