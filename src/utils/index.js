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

import React from 'react'
import {
  get,
  set,
  isObject,
  isString,
  trimEnd,
  isFunction,
  isUndefined,
  trimStart,
  isNumber,
} from 'lodash'
import generate from 'nanoid/generate'
import moment from 'moment-mini'
import qs from 'qs'

import cookie from 'utils/cookie'

import { PATTERN_LABEL, LANG_MAP, MODULE_KIND_MAP } from './constants'

export const formatSize = size => {
  const divisor = 1024
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
  let index = 0
  if (!isNumber(size)) {
    return units[index]
  }
  while (size >= divisor && index < units.length) {
    size = parseFloat(size / divisor).toFixed(2)
    index += 1
  }
  if (index === 0) {
    size = parseInt(size, 10)
  }
  return `${size} ${units[index]}`
}

export const formatUsedTime = ms => {
  if (ms < 1000) {
    return `${ms} ms`
  }
  if (ms <= 60000) {
    return `${parseFloat(ms / 1000).toFixed(2)} s`
  }
  if (ms <= 3600000) {
    return `${parseFloat(ms / 60000).toFixed(2)} min`
  }
  return `${parseFloat(ms / 3600000).toFixed(2)} h`
}

export function getScrollTop() {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop
}

export function flattenObject(obj) {
  const result = {}

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
      return
    }
    if (Array.isArray(cur)) {
      if (cur.length > 0) {
        cur.forEach((item, index) => recurse(item, `${prop}[${index}]`))
      } else {
        result[prop] = []
      }
    } else if (isObject(cur)) {
      if (Object.keys(cur).length > 0) {
        Object.entries(cur).forEach(([key, value]) => {
          const _key = /\./g.test(key) ? `['${key}']` : `.${key}`
          recurse(value, prop ? `${prop}${_key}` : key)
        })
      } else {
        result[prop] = {}
      }
    }
  }

  recurse(obj, '')
  return result
}

export function unflattenObject(data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data
  }

  const result = {}
  Object.entries(data).forEach(([key, value]) => set(result, key, value))
  return result
}

export const generateId = length =>
  generate('0123456789abcdefghijklmnopqrstuvwxyz', length || 6)

export const joinSelector = (selector = {}) =>
  Object.entries(selector)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')

export const safeParseJSON = (json, defaultValue) => {
  let result
  try {
    result = JSON.parse(json)
  } catch (e) {}

  if (!result && defaultValue !== undefined) {
    return defaultValue
  }
  return result
}

export const isSystemRole = role => /^system:/.test(role)

export const to = promise =>
  promise
    .then(data => data)
    .catch(err => {
      console.warn(err)
      return []
    })

export const getLocalTime = time => {
  let formatTime = time

  if (time && isString(time) && time.indexOf(' +0000 UTC') !== -1) {
    formatTime = time.replace(' +0000 UTC', 'Z').replace(' ', 'T')
  }

  return moment.utc(formatTime).local()
}

export const getDateDiff = (dateTime, onlyReturnTime = false) => {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const now = Date.now()
  const diffValue = now - (isString(dateTime) ? Date.parse(dateTime) : dateTime)

  if (diffValue < 0) return ''

  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute

  let result = ''
  if (monthC >= 1) {
    result = t(onlyReturnTime ? 'MONTH_TIME' : 'MONTH_AGO', {
      count: parseInt(monthC, 10),
    })
  } else if (weekC >= 1) {
    result = t(onlyReturnTime ? 'WEEK_TIME' : 'WEEK_AGO', {
      count: parseInt(weekC, 10),
    })
  } else if (dayC >= 1) {
    result = t(onlyReturnTime ? 'DAY_TIME' : 'DAY_AGO', {
      count: parseInt(dayC, 10),
    })
  } else if (hourC >= 1) {
    result = t(onlyReturnTime ? 'HOUR_TIME' : 'HOUR_AGO', {
      count: parseInt(hourC, 10),
    })
  } else if (minC >= 1) {
    result = t(onlyReturnTime ? 'MINUTE_TIME' : 'MINUTE_AGO', {
      count: parseInt(minC, 10),
    })
  }
  return result
}

export const getMinutes = timeStr => {
  const unit = timeStr.slice(-1)
  const value = parseFloat(timeStr)

  switch (unit) {
    default:
    case 'm':
      return value
    case 'h':
      return value * 60
    case 'd':
      return value * 24 * 60
  }
}

export const getDateStr = time =>
  `${moment(time).format(t('MMMM Do YYYY'))},${moment(time).format('HH:mm:ss')}`

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

export const getQueryString = params =>
  Object.keys(params)
    .filter(key => params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&')

export const getFilterString = (
  params,
  fuzzyMatchKeys = ['name', 'app', 'label', 'annotation']
) =>
  Object.keys(params)
    .filter(key => !isUndefined(params[key]) && params[key] !== '')
    .map(key =>
      fuzzyMatchKeys.includes(key) && !/\|/g.test(params[key])
        ? `${key}~${trimStart(params[key])}`
        : `${key}=${trimStart(params[key])}`
    )
    .join(',')

export const isValidLabel = label =>
  Object.entries(label).every(
    ([key, value]) =>
      value.length <= 63 &&
      key.length <= (key.indexOf('/') !== -1 ? 253 : 63) &&
      key.replace(/\//g, '').replace(PATTERN_LABEL, '') === '' &&
      value.replace(PATTERN_LABEL, '') === ''
  )

export const updateLabels = (template, module, value) => {
  const formTemplate = template[MODULE_KIND_MAP[module]]

  set(formTemplate, 'metadata.labels', value)

  if (['deployments', 'daemonsets', 'statefulsets'].indexOf(module) !== -1) {
    set(formTemplate, 'spec.selector.matchLabels', value)
  }

  if (module === 'cronjob') {
    set(formTemplate, 'spec.jobTemplate.metadata.labels', value)
  }

  if (['ingresses'].indexOf(module) === -1) {
    set(formTemplate, 'spec.template.metadata.labels', value)
  }
}

const merge = (origin, path, newObj) => {
  const data = get(origin, path, {})
  Object.assign(data, newObj)
}

export const mergeLabels = (formData, labels) => {
  const type = formData.kind

  if (['Deployment', 'DaemonSet', 'StatefulSet'].includes(type)) {
    merge(formData, 'metadata.labels', labels)
    merge(formData, 'spec.selector.matchLabels', labels)
    merge(formData, 'spec.template.metadata.labels', labels)
  } else if (type === 'Service') {
    merge(formData, 'metadata.labels', labels)
    merge(formData, 'spec.selector', labels)
  }
}

export const withProps = (Component, props) => newProps => (
  <Component {...props} {...newProps} />
)

export const composeComponent = (...Components) => props => (
  <>
    {Components.map(Component => (
      <Component {...props} key={Component.name} />
    ))}
  </>
)

export const cpuFormat = (cpu, unit = 'Core') => {
  if (isUndefined(cpu) || cpu === null) {
    return cpu
  }

  const units = ['m', 'Core', 'k', 'M', 'G']
  const currentUnit = cpu.slice(-1)
  // if no unit, unit = 'Core'
  const currentUnitIndex =
    units.indexOf(currentUnit) > -1 ? units.indexOf(currentUnit) : 1
  const targetUnitIndex = units.indexOf(unit)

  let value =
    currentUnitIndex === 1 ? Number(cpu) : Number(trimEnd(cpu, currentUnit))

  value *= 1000 ** (currentUnitIndex - targetUnitIndex)

  return Number(value.toFixed(3))
}

export const memoryFormat = (memory, unit = 'Mi') => {
  if (isUndefined(memory) || memory === null) {
    return memory
  }

  const units = ['ki', 'mi', 'gi', 'ti']
  const currentUnit = memory.toLowerCase().slice(-2)

  let currentUnitIndex =
    units.indexOf(currentUnit) > -1 ? units.indexOf(currentUnit) : 1
  const targetUnitIndex = units.indexOf(unit.toLowerCase())

  let value = Number(trimEnd(memory.toLowerCase(), currentUnit))

  if (/m$/g.test(memory)) {
    // transfer to ki
    value = Number(trimEnd(memory, 'm')) / (1000 * 1024)
    currentUnitIndex = 0
  }

  value *= 1000 ** (currentUnitIndex - targetUnitIndex)

  if (String(value).indexOf('.') > -1) {
    value = Number(value.toFixed(3))
  }

  return value
}

export const addFullScreenChangeEvents = callBack => {
  if (!isFunction(callBack)) {
    return
  }
  document.addEventListener('fullscreenchange', callBack)
  document.addEventListener('mozfullscreenchange', callBack)
  document.addEventListener('webkitfullscreenchange', callBack)
  document.addEventListener('msfullscreenchange', callBack)
}

export const removeFullScreenChangeEvents = callBack => {
  if (!isFunction(callBack)) {
    return
  }
  document.removeEventListener('fullscreenchange', callBack)
  document.removeEventListener('mozfullscreenchange', callBack)
  document.removeEventListener('webkitfullscreenchange', callBack)
  document.removeEventListener('msfullscreenchange', callBack)
}

export const exitFullScreen = () => {
  const eFS =
    document.exitFullscreen ||
    document.msExitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen
  eFS.call(document)
}

export const enterFullScreen = container => {
  const rFS =
    container.requestFullscreen ||
    container.webkitRequestFullscreen ||
    container.mozRequestFullScreen
  rFS.call(container)
}

export const cacheFunc = (key, func, context) => {
  context._funcCaches = context._funcCaches || {}

  if (!context._funcCaches[key]) {
    context._funcCaches[key] = func
  }

  return context._funcCaches[key]
}

export const getResourceCreator = item =>
  get(item, 'metadata.annotations["kubesphere.io/creator"]') ||
  get(item, 'metadata.annotations.creator') ||
  ''

export const getDescription = item =>
  get(item, 'metadata.annotations["kubesphere.io/description"]') ||
  get(item, 'metadata.annotations.desc') ||
  ''

export const getAliasName = item =>
  get(item, 'metadata.annotations["kubesphere.io/alias-name"]') ||
  get(item, 'metadata.annotations.displayName') ||
  ''

export const getDisplayName = item => {
  if (!item) {
    return ''
  }

  if (item.display_name) {
    return item.display_name
  }

  return `${item.name}${item.aliasName ? `(${item.aliasName})` : ''}`
}

export const formatRules = rules =>
  (rules || []).reduce(
    (prev, cur) => ({
      ...prev,
      [cur.name]: cur.actions,
    }),
    {}
  )

export const getWebSocketProtocol = () => {
  if (location.protocol.startsWith('https')) {
    return 'wss'
  }
  return 'ws'
}

export const getDocsUrl = module => {
  const lang = LANG_MAP[cookie('lang') || getBrowserLang()]

  const { url: prefix, version } = globals.config.documents
  let docUrl = get(globals.config, `resourceDocs[${module}]`, '')

  if (!docUrl) {
    return ''
  }

  if (!docUrl.startsWith('http')) {
    docUrl = `${prefix}/${version}/${lang}${docUrl}`
  }

  return docUrl
}

export const hasChinese = str => /.*[\u4E00-\u9FA5]+.*/.test(str)

export const getBrowserLang = () => {
  const lang = (navigator.language || navigator.browserLanguage).toLowerCase()

  if (lang.indexOf('zh') !== -1) {
    return 'zh'
  } else if (lang.indexOf('en') !== -1) {
    return 'en'
  }

  return 'zh'
}

export const toPromise = func =>
  new Promise(resolve => {
    func(() => {
      resolve()
    })
  })

export const getLanguageName = name => {
  const languageList = [
    'nodejs',
    'python',
    'java',
    'ruby',
    'php',
    'go',
    'nginx',
    'binary',
    'jar',
    'war',
  ]

  if (!name) return ''
  return languageList.find(language => name.indexOf(language) !== -1)
}

export const formatRelativeDate = (value, fullMonthName) => {
  const m = moment.isMoment(value) ? value : moment(value)
  const monthFormat = fullMonthName ? 'MMMM' : 'MMM'
  const dt = new Date()
  if (dt.getFullYear() !== m.year()) {
    return m.format(`${monthFormat} D, YYYY`)
  }
  const mMonth = m.month()
  const mDate = m.date()
  const date = dt.getDate()
  if (mMonth === dt.getMonth() && mDate === date) {
    return 'Today'
  }
  dt.setDate(date - 1)
  if (mMonth === dt.getMonth() && mDate === dt.getDate()) {
    return 'Yesterday'
  }
  return m.format(`${monthFormat} D`)
}

export const parseUrl = url => {
  const result = {}
  const keys = [
    'href',
    'origin',
    'protocol',
    'host',
    'hostname',
    'port',
    'pathname',
    'search',
    'hash',
  ]
  const regexp = /(([^:]+:)\/\/(([^:/?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/

  const match = regexp.exec(url)

  if (match) {
    for (let i = keys.length - 1; i >= 0; --i) {
      result[keys[i]] = match[i] ? match[i] : ''
    }
  }
  return result
}

export const replaceToLocalOrigin = url => {
  const path = get(parseUrl(url), 'pathname', `/${url}`)
  return `${window.location.protocol}//${window.location.host}${path}`
}

export const withDryRun = async requests => {
  const dryRunPromises = requests.map(item =>
    request.post(`${item.url}?dryRun=All`, item.data)
  )

  await Promise.all(dryRunPromises)

  const promises = requests.map(item => request.post(item.url, item.data))

  return Promise.all(promises)
}

export const getQueryParam = key => {
  const params = qs.parse(location.search.slice(1))
  return key ? params[key] : params
}

export const isAppsPage = (path = location.pathname) =>
  path === '/apps' || path.startsWith('/apps/')
