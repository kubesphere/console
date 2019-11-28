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

import { ALL_METRICS_CONFIG } from 'configs/alerting/metrics'

/**
 * Get monitoring rule info from metrics
 * @param {Array} metrics
 */
export const getMonitoringRuleInfo = (metrics = []) => {
  const result = {}

  metrics.forEach(metric => {
    const config = ALL_METRICS_CONFIG[metric]

    if (config) {
      const icon = config.prefixIcon
      const item = result[icon]
      if (item) {
        item.push(config.label)
      } else {
        result[icon] = [config.label]
      }
    }
  })

  return result
}

export const getAlertMessageDesc = ({
  resourceName,
  metricName,
  condition_type,
  thresholds,
  unit,
} = {}) => {
  const metricLabel = get(ALL_METRICS_CONFIG[metricName], 'label') || ''

  return resourceName
    ? `${resourceName} ${t(metricLabel)} ${condition_type} ${thresholds}${unit}`
    : '-'
}

export const compareByCondition = (first = 0, second = 0, condition = '>') => {
  const _first = Number(first) || 0
  const _second = Number(second) || 0

  switch (condition) {
    case '>':
      return _first > _second
    case '>=':
      return _first >= _second
    case '<':
      return _first < _second
    case '<=':
      return _first <= _second
    default:
      return false
  }
}
