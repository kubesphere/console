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
  isEmpty,
  isArray,
  isNaN,
  isUndefined,
  isNumber,
  isString,
  get,
  set,
  last,
  flatten,
  min,
  max,
} from 'lodash'
import { getLocalTime } from 'utils'
import { COLORS_MAP, MILLISECOND_IN_TIME_UNIT } from 'utils/constants'
import moment from 'moment-mini'

const UnitTypes = {
  second: {
    conditions: [0.01, 0],
    units: ['s', 'ms'],
  },
  cpu: {
    conditions: [0.1, 0],
    units: ['core', 'm'],
  },
  memory: {
    conditions: [1024 ** 4, 1024 ** 3, 1024 ** 2, 1024, 0],
    units: ['Ti', 'Gi', 'Mi', 'Ki', 'Bytes'],
  },
  disk: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['TB', 'GB', 'MB', 'KB', 'Bytes'],
  },
  throughput: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['TB/s', 'GB/s', 'MB/s', 'KB/s', 'B/s'],
  },
  traffic: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['TB/s', 'GB/s', 'MB/s', 'KB/s', 'B/s'],
  },
  bandwidth: {
    conditions: [1024 ** 2 / 8, 1024 / 8, 0],
    units: ['Mbps', 'Kbps', 'bps'],
  },
  number: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['T', 'G', 'M', 'K', ''],
  },
}

export const getSuitableUnit = (value, unitType) => {
  const config = UnitTypes[unitType]

  if (isEmpty(config)) return ''

  // value can be an array or a single value
  const values = isArray(value) ? value : [[0, Number(value)]]
  let result = last(config.units)
  config.conditions.some((condition, index) => {
    const triggered = values.some(
      _value =>
        ((isArray(_value) ? get(_value, '[1]') : Number(_value)) || 0) >=
        condition
    )

    if (triggered) {
      result = config.units[index]
    }
    return triggered
  })
  return result
}

export const getSuitableValue = (
  value,
  unitType = 'default',
  defaultValue = 0
) => {
  if ((!isNumber(value) && !isString(value)) || isNaN(Number(value))) {
    return defaultValue
  }

  const unit = getSuitableUnit(value, unitType)
  const unitText = unit ? ` ${t(unit)}` : ''
  const count = getValueByUnit(value, unit || unitType)
  return `${count}${unitText}`
}

export const getValueByUnit = (num, unit, precision = 2) => {
  let value = parseFloat(num)

  switch (unit) {
    default:
      break
    case '':
    case 'default':
      return value
    case 'iops':
      return Math.round(value)
    case '%':
      value *= 100
      break
    case 'm':
      value *= 1000
      if (value < 1) return 0
      break
    case 'Ki':
      value /= 1024
      break
    case 'Mi':
      value /= 1024 ** 2
      break
    case 'Gi':
      value /= 1024 ** 3
      break
    case 'Ti':
      value /= 1024 ** 4
      break
    case 'Bytes':
    case 'B':
    case 'B/s':
      break
    case 'K':
    case 'KB':
    case 'KB/s':
      value /= 1000
      break
    case 'M':
    case 'MB':
    case 'MB/s':
      value /= 1000 ** 2
      break
    case 'G':
    case 'GB':
    case 'GB/s':
      value /= 1000 ** 3
      break
    case 'T':
    case 'TB':
    case 'TB/s':
      value /= 1000 ** 4
      break
    case 'bps':
      value *= 8
      break
    case 'Kbps':
      value = (value * 8) / 1024
      break
    case 'Mbps':
      value = (value * 8) / 1024 / 1024
      break
    case 'ms':
      value *= 1000
      break
  }

  return Number(value) === 0 ? 0 : Number(value.toFixed(precision))
}

export const getFormatTime = (ms, showDay) =>
  getLocalTime(Number(ms))
    .format(showDay ? 'MM-DD HH:mm' : 'HH:mm:ss')
    .replace(/(\d+:\d+)(:00)$/g, '$1')

export const getChartData = ({
  type,
  unit,
  xKey = 'time',
  legend = [],
  valuesData = [],
  dot = 2,
}) => {
  /*
    build a value map => { 1566289260: {...} }
    e.g. { 1566289260: { 'utilisation': 30.2 } }
  */
  let minX = 0
  let maxX = 0
  const valueMap = {}
  valuesData.forEach((values, index) => {
    values.forEach(item => {
      const time = parseInt(get(item, [0], 0), 10)
      const value = get(item, [1])
      const key = get(legend, [index])

      if (time && !valueMap[time]) {
        valueMap[time] = legend.reduce((obj, xAxisKey) => {
          if (!obj[xAxisKey]) obj[xAxisKey] = null
          return obj
        }, {})
      }

      if (key !== undefined && key !== null && valueMap[time]) {
        valueMap[time][key] =
          value === '-1'
            ? null
            : getValueByUnit(value, isUndefined(unit) ? type : unit, dot)
      }

      if (!minX || minX > time) minX = time
      if (!maxX || maxX < time) maxX = time
    })
  })

  const showDay = maxX - minX > 3600 * 24
  const formatter = key =>
    xKey === 'time' ? getFormatTime(key * 1000, showDay) : key

  // generate the chart data
  const chartData = Object.entries(valueMap).map(([key, value]) => ({
    [xKey]: formatter(key),
    ...value,
  }))

  return chartData
}

export const getAreaChartOps = ({
  type,
  title,
  unitType,
  xKey = 'time',
  legend = [],
  data = [],
  ...rest
}) => {
  const seriesData = isArray(data) ? data : []
  const valuesData = seriesData.map(result => get(result, 'values') || [])
  const unit = unitType
    ? getSuitableUnit(flatten(valuesData), unitType)
    : rest.unit

  const chartData = getChartData({
    type,
    unit,
    xKey,
    legend,
    valuesData,
    dot: rest.dot,
  })

  return {
    ...rest,
    title,
    unit,
    data: chartData,
  }
}

export const getXAxisTickFormatter = (chartValus = []) => {
  const timeList = chartValus.map(({ time }) => +new Date(time))
  const minTime = min(timeList)
  const maxTime = max(timeList)

  if (maxTime - minTime > 8640000) {
    return time => moment(time).format(t('Do HH:mm'))
  }

  return time => moment(time).format('HH:mm:ss')
}

export const getLastMonitoringData = data => {
  const result = {}

  Object.entries(data).forEach(([key, value]) => {
    const values = get(value, 'data.result[0].values', []) || []
    const _value = isEmpty(values)
      ? get(value, 'data.result[0].value', []) || []
      : last(values)
    set(result, `[${key}].value`, _value)
  })

  return result
}

export const getTimesData = data => {
  const result = []

  data.forEach(record => {
    const values = get(record, 'values') || []

    values.forEach(value => {
      const time = get(value, '[0]', 0)
      if (!result.includes(time)) {
        result.push(time)
      }
    })
  })
  return result.sort()
}

export const getZeroValues = () => {
  const values = []
  let time = parseInt(Date.now() / 1000, 10) - 6000
  for (let i = 0; i < 10; i++) {
    values[i] = [time, 0]
    time += 600
  }
  return values
}

export const getColorByName = (colorName = '#fff') =>
  COLORS_MAP[colorName] || colorName

export const startAutoRefresh = (context, options = {}) => {
  const params = {
    method: 'fetchData',
    interval: 5000, // milliseconds
    leading: true,
    ...options,
  }

  if (context && context[params.method]) {
    const fetch = context[params.method]

    if (params.leading) {
      fetch({ autoRefresh: true })
    }

    context.timer = setInterval(() => {
      fetch({ autoRefresh: true })
    }, params.interval)
  }
}

export const stopAutoRefresh = context => {
  if (context && context.timer) {
    clearInterval(context.timer)
    context.timer = null
  }
}

export const isSameDay = (preTime, nextTime) =>
  Math.floor(preTime / 86400000) === Math.floor(nextTime / 86400000)

export const timeAliasReg = /(\d+)(\w+)/

export const timestampify = timeAlias => {
  const [, count = 0, unit] = timeAlias.match(timeAliasReg) || []
  return Number(count) * (MILLISECOND_IN_TIME_UNIT[unit] || 0)
}

export const fillEmptyMetrics = (params, result) => {
  if (!params.times || !params.start || !params.end) {
    return result
  }

  const format = num => String(num).replace(/\..*$/, '')
  const step = Math.floor((params.end - params.start) / params.times)
  const correctCount = params.times + 1

  Object.values(result).forEach(item => {
    const _result = get(item, 'data.result')
    if (!isEmpty(_result)) {
      _result.forEach(resultItem => {
        const curValues = resultItem.values || []
        const curValuesMap = curValues.reduce(
          (prev, cur) => ({
            ...prev,
            [format(cur[0])]: cur[1],
          }),
          {}
        )

        if (curValues.length < correctCount) {
          const newValues = []
          for (let index = 0; index < correctCount; index++) {
            const time = format(params.start + index * step)
            newValues.push([time, curValuesMap[time] || '0'])
          }
          resultItem.values = newValues
        }
      })
    }
  })

  return result
}

/**
 * @param number:[] IDList
 */
export function CreateUidFactory(IDList = []) {
  const IDStore = {
    IDList,
    maxID: IDList.length ? Math.max.apply(null, IDList) : 0,
  }

  return {
    generateUID() {
      const ID = ++IDStore.maxID
      IDStore.IDList.push(ID)
      return ID
    },
    clear() {
      IDStore.IDList = []
      IDStore.maxID = 0
    },
  }
}

/**
 *
 * @param number[] values
 */
export function avgs(values = []) {
  const count = values.length
  const sum = values.reduce((previous, current) => previous + current, 0)
  return sum / count
}

export const unitTransformMap = {
  none: unitTransformFactory([['', 0]]),
  ...unitTransformGroupFactory([
    ['bit', 0],
    ['Byte', 8],
    ['KB', 8 * 1024],
    ['MB', 8 * 1024 ** 2],
    ['GB', 8 * 1024 ** 3],
    ['TB', 8 * 1024 ** 4],
  ]),
  ...unitTransformGroupFactory([
    ['bit/s', 0],
    ['Byte/s', 8],
    ['KB/s', 8 * 1024],
    ['MB/s', 8 * 1024 ** 2],
    ['GB/s', 8 * 1024 ** 3],
    ['TB/s', 8 * 1024 ** 4],
  ]),
  ...unitTransformGroupFactory([
    ['bps', 0],
    ['Bps', 8],
    ['KBps', 8 * 1024],
    ['Mbps', 1024 ** 2],
    ['Gbps', 1024 ** 3],
    ['Tbps', 1024 ** 4],
  ]),
  ...unitTransformGroupFactory([
    ['ms', 0],
    ['seconds', 1000],
    ['minutes', 1000 * 60],
    ['hours', 1000 * 60 * 60],
    ['days', 1000 * 60 * 60 * 24],
    ['weeks', 10000 * 60 * 60 * 24 * 7],
    ['months', 10000 * 60 * 60 * 24 * 30],
  ]),
  'percent (0-100)': unitTransformFactory([['%', 0]]),
  'percent (0.0-1.0)': function(number, decimals) {
    const format = unitTransformFactory([['%', 0]])
    return format(number * 100, decimals)
  },
}

export function unitTransformGroupFactory(config) {
  const basicUnitTransform = unitTransformFactory(config)
  const clone = [...config]
  const [basicUnit] = clone.shift()

  return clone.reduce(
    (group, [unit, rate]) => ({
      ...group,
      [unit](number, decimals) {
        return basicUnitTransform(number * rate, decimals)
      },
    }),
    { [basicUnit]: basicUnitTransform }
  )
}

export function unitTransformFactory(config) {
  return function(number, decimals = 0) {
    const isNegative = number < 0
    const abs = Math.abs(number)

    let rightConfigIndex = 0
    for (let index = 0; index < config.length; index++) {
      const [, minNumber] = config[index]
      if (abs >= minNumber) {
        rightConfigIndex = index
      } else {
        break
      }
    }

    const [unit, rate] = config[rightConfigIndex]

    const count = rate === 0 ? abs : abs / rate
    const fixedCount = count.toFixed(decimals)

    return Number(fixedCount) === 0
      ? '0'
      : `${isNegative ? '-' : ''}${fixedCount} ${unit}`
  }
}
