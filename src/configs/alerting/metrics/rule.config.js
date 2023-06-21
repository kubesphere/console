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

import Big from 'big.js'

Big.DP = 10

const COMPARATOR_OPTIONS = [
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
    label: 'CRITICAL_ALERT',
    value: 'critical',
  },
  {
    type: 'warning',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#f5a623',
    },
    label: 'ERROR_ALERT',
    value: 'error',
  },
  {
    type: 'secondary',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#79879c',
    },
    label: 'WARNING_ALERT',
    value: 'warning',
  },
]

export const getBaseRuleConfig = ({
  comparator = {},
  thresholds = {},
} = {}) => [
  {
    name: 'comparator',
    placeholder: 'CONDITION_OPERATOR',
    options: COMPARATOR_OPTIONS,
    ...comparator,
  },
  {
    type: 'number',
    name: 'thresholds',
    placeholder: 'THRESHOLD',
    ...thresholds,
  },
]

export const BASE_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    min: 0,
    converter: value => Number(value),
    reverser: value => Number(value),
  },
})

export const PERCENT_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    min: 0,
    max: 100,
    unit: '%',
    converter: value => {
      const _value = new Big(value)
      return Number(_value.div(100).toString())
    },
    reverser: value => {
      const _value = new Big(value)
      return Number(_value.times(100).toString())
    },
  },
})

export const CORE_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'core',
    min: 0,
    converter: value => Number(value),
    reverser: value => Number(value),
  },
})

export const GIB_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'GiB',
    min: 0,
    converter: value => {
      const _value = new Big(value)
      const unit = new Big(1024).pow(3)
      return Number(_value.times(unit).toString())
    },
    reverser: value => {
      const _value = new Big(value)
      const unit = new Big(1024).pow(3)
      return Number(_value.div(unit).toString())
    },
  },
})

export const MIB_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'MiB',
    min: 0,
    converter: value => {
      const _value = new Big(value)
      const unit = new Big(1024).pow(2)
      return Number(_value.times(unit).toString())
    },
    reverser: value => {
      const _value = new Big(value)
      const unit = new Big(1024).pow(2)
      return Number(_value.div(unit).toString())
    },
  },
})

export const GB_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'GB',
    min: 0,
    converter: value => {
      const _value = new Big(value)
      const unit = new Big(1000).pow(3)
      return Number(_value.times(unit).toString())
    },
    reverser: value => {
      const _value = new Big(value)
      const unit = new Big(1000).pow(3)
      return Number(_value.div(unit).toString())
    },
  },
})

export const KBS_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'KB/s',
    min: 0,
    converter: value => {
      const _value = new Big(value)
      const unit = new Big(1000)
      return Number(_value.times(unit).toString())
    },
    reverser: value => {
      const _value = new Big(value)
      const unit = new Big(1000)
      return Number(_value.div(unit).toString())
    },
  },
})

export const MBPS_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'Mbps',
    min: 0,
    converter: value => {
      const _value = new Big(value)
      const unit = new Big(1000).pow(2)
      return Number(_value.times(unit).toString())
    },
    reverser: value => {
      const _value = new Big(value)
      const unit = new Big(1000).pow(2)
      return Number(_value.div(unit).toString())
    },
  },
})

export const CPU_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'core',
    min: 0,
  },
})

export const MEMORY_RULE_CONFIG = getBaseRuleConfig({
  thresholds: {
    unit: 'Mi',
    min: 0,
    converter: value => value * 1024 ** 2,
  },
})
