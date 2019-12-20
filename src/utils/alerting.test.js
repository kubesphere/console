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

import {
  getMonitoringRuleInfo,
  compareByCondition,
  getAlertMessageDesc,
} from './alerting'

it('getMonitoringRuleInfo', () => {
  const metrics = ['node_pod_abnormal_ratio', 'node_pod_utilisation', 'xxx']
  expect(getMonitoringRuleInfo(metrics)).toStrictEqual({
    pod: ['pod abnormal ratio', 'pod utilization rate'],
  })
  expect(getMonitoringRuleInfo()).toStrictEqual({})
})

it('getAlertMessageDesc', () => {
  expect(
    getAlertMessageDesc({
      resourceName: 'i-xxxaxx',
      metricName: 'node_pod_abnormal_ratio',
      condition_type: 'aaa',
      thresholds: 300,
      unit: 'ms',
    })
  ).toBe('i-xxxaxx pod abnormal ratio aaa 300ms')
  expect(
    getAlertMessageDesc({
      resourceName: '',
      metricName: 'node_pod_abnormal_ratio',
      condition_type: 'aaa',
      thresholds: 300,
      unit: 'ms',
    })
  ).toBe('-')
  expect(
    getAlertMessageDesc({
      resourceName: 'i-xxxaxx',
      metricName: 'xxx',
      condition_type: 'aaa',
      thresholds: 300,
      unit: 'ms',
    })
  ).toBe('i-xxxaxx  aaa 300ms')
  expect(getAlertMessageDesc()).toBe('-')
})

it('compareByCondition', () => {
  expect(compareByCondition(10, 20)).toBe(false)
  expect(compareByCondition(20, 20, '>=')).toBe(true)
  expect(compareByCondition(30, 20, '>=')).toBe(true)
  expect(compareByCondition(30, 20, '<')).toBe(false)
  expect(compareByCondition(30, undefined, '<=')).toBe(false)
  expect(compareByCondition(undefined, 20, '<=')).toBe(true)
  expect(compareByCondition(30, 20, '$')).toBe(false)
})
