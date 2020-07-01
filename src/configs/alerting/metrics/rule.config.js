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

const PERIOD_OPTIONS = [
  {
    label: 'PERIOD_OPTIONS',
    value: 1,
  },
  {
    label: 'PERIOD_OPTIONS',
    value: 5,
  },
  {
    label: 'PERIOD_OPTIONS',
    value: 15,
  },
  {
    label: 'PERIOD_OPTIONS',
    value: 30,
  },
  {
    label: 'PERIOD_OPTIONS',
    value: 60,
  },
]

const CONSECUTIVE_OPTIONS = [
  {
    label: 'CONSECUTIVE_OPTIONS',
    value: 1,
  },
  {
    label: 'CONSECUTIVE_OPTIONS',
    value: 2,
  },
  {
    label: 'CONSECUTIVE_OPTIONS',
    value: 3,
  },
  {
    label: 'CONSECUTIVE_OPTIONS',
    value: 4,
  },
  {
    label: 'CONSECUTIVE_OPTIONS',
    value: 5,
  },
  {
    label: 'CONSECUTIVE_OPTIONS',
    value: 10,
  },
]

const CONDITION_OPTIONS = [
  {
    label: '>',
    value: '>',
  },
  {
    label: '>=',
    value: '>=',
  },
  {
    label: '<',
    value: '<',
  },
  {
    label: '<=',
    value: '<=',
  },
]

export const SEVERITY_LEVEL = [
  {
    type: 'critical',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#ca2621',
    },
    label: 'Critical Alert',
    value: 'critical',
  },
  {
    type: 'major',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#f5a623',
    },
    label: 'Major Alert',
    value: 'major',
  },
  {
    type: 'minor',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#79879c',
    },
    label: 'Minor Alert',
    value: 'minor',
  },
]

export const getBaseRuleConfig = ({
  periods = {},
  consecutive = {},
  condition = {},
  thresholds = {},
  severity = {},
} = {}) => [
  {
    name: 'monitor_periods',
    options: PERIOD_OPTIONS,
    ...periods,
  },
  {
    name: 'consecutive_count',
    options: CONSECUTIVE_OPTIONS,
    ...consecutive,
  },
  {
    name: 'condition_type',
    options: CONDITION_OPTIONS,
    ...condition,
  },
  {
    type: 'number',
    name: 'thresholds',
    placeholder: 'Threshold',
    ...thresholds,
  },
  {
    name: 'severity',
    options: SEVERITY_LEVEL,
    ...severity,
  },
]

export const BASE_RULE_CONFIG = getBaseRuleConfig()

export const PERCENT_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    min: 1,
    max: 100,
    unit: '%',
  },
})

export const CPU_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'core',
  },
})

export const MEMORY_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'Mi',
  },
})

export const DISK_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'GB',
  },
})

export const THROUGHPUT_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'KB/s',
  },
})

export const BANDWIDTH_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'Mbps',
  },
})
