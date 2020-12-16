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
  get,
  isArray,
  isEmpty,
  cloneDeep,
  isUndefined,
  upperFirst,
  forOwn,
} from 'lodash'
import {
  METER_RESOURCE_USAGE,
  RESOURCE_TITLE,
  RESOURCES_METER_TYPE,
  MERTER_TYPE,
} from 'components/Modals/Bill/constats'

import { getNodeStatus } from 'utils/node'
import { getWorkloadStatus } from 'utils/status'
import { getLocalTime } from 'utils'

import { getValueByUnit } from 'utils/monitoring'
import { getTimeRange, getMinuteValue } from 'stores/monitoring/base'

export const getMeterFilter = type => {
  const _type = RESOURCES_METER_TYPE[type]
  const METER_FILTER = {
    cpu: `meter_${_type}_cpu_usage`,
    memory:
      _type === 'cluster' || _type === 'workspace'
        ? `meter_${_type}_memory_usage`
        : `meter_${_type}_memory_usage_wo_cache`,
    net_transmitted: `meter_${_type}_net_bytes_transmitted`,
    net_received: `meter_${_type}_net_bytes_received`,
  }

  switch (_type) {
    case 'cluster':
    case 'node':
    case 'workspace':
    case 'application':
    case 'namespace':
      METER_FILTER.disk = `meter_${_type}_pvc_bytes_total`
      break
    default:
      break
  }

  return filter => {
    if (filter === 'all') {
      return METER_FILTER
    }
    const meters = {}
    filter.forEach(_item => {
      meters[_item] = METER_FILTER[_item]
    })
    return meters
  }
}

export const getMeterFilterByDic = type => {
  const _type = RESOURCES_METER_TYPE[type]
  return {
    [`meter_${_type}_cpu_usage`]: 'cpu',
    [`meter_${_type}_memory_usage`]: 'memory',
    [`meter_${_type}_memory_usage_wo_cache`]: 'memory',
    [`meter_${_type}_pvc_bytes_total`]: 'disk',
    [`meter_${_type}_net_bytes_transmitted`]: 'net_transmitted',
    [`meter_${_type}_net_bytes_received`]: 'net_received',
  }
}

export const getFormatTime = (ms, showDay) =>
  getLocalTime(Number(ms))
    .format(showDay ? 'YYYY-MM-DD HH:mm' : 'HH:mm:ss')
    .replace(/:00$/g, '')

export const handleSortBySourceType = list => {
  if (isEmpty(list)) {
    return []
  }

  let data = cloneDeep(list)

  if (data.length < 2) {
    return data
  }

  MERTER_TYPE.forEach((item, index) => {
    const tempIndex = data.findIndex(_item => {
      if (!isEmpty(_item)) {
        return _item.type === item
      }
      return false
    })

    if (index !== tempIndex && tempIndex >= 0) {
      const temp = data[tempIndex]
      data[tempIndex] = data[index]
      data[index] = temp
    }
  })

  data = data.filter(item => !!item)
  return data
}

export const handleLevelParams = ({ module }) => {
  const _module = RESOURCES_METER_TYPE[module]
  const level = `Level${upperFirst(_module)}`
  return { level }
}

export const getTimeParams = ({ isTime, start, end, step = '1h' }) => {
  const params = {}

  if (isTime) {
    let _step = step

    if (!end || !start) {
      const timeRange = getTimeRange({ step: getMinuteValue(step) })
      params.start = timeRange.start
      params.end = timeRange.end
    }

    if (start) {
      params.start = Math.floor(start / 1000)
    }

    if (end) {
      params.end = Math.floor(end / 1000)
    }

    const day = Math.floor((params.end - params.start) / 3600 / 24)

    if (day >= 30) {
      _step = '1d'
    }
    params.step = getMinuteValue(_step)
  }
  return { ...params }
}

export const getMetricsFilters = ({ meters, module }) => {
  const meterList = []

  if (!isEmpty(meters)) {
    forOwn(getMeterFilter(module)(meters), value => {
      meterList.push(value)
    })
  }

  if (!isEmpty(meterList)) {
    return { metrics_filter: meterList.join('|') }
  }
}

export const getResourceFilters = ({ resources, module }) => {
  if (!isEmpty(resources)) {
    const resourcesString = resources.join('|')
    let data = {}
    switch (module) {
      case 'applications':
        data = { applications: resourcesString }
        break
      case 'services':
        data = { services: resourcesString }
        break
      default:
        data = { resources_filter: resources.join('|') }
        break
    }
    return data
  }
}

export const fillEmptyMeterValue = (params, values) => {
  if (!params.step || !params.start || !params.end) {
    return values
  }

  const format = num => String(num).replace(/\..*$/, '')
  const step = params.step
  const times = Math.floor((params.end - params.start) / step) + 1
  const length = isUndefined(values) || !isArray(values) ? 0 : values.length

  if (length < times) {
    const newValues = []
    for (let index = 0; index < times - values.length; index++) {
      const time = format(params.start + index * step)
      newValues.push([time, '0'])
    }

    return [...newValues, ...values]
  }
  return values
}

export const handleValueByUnit = (item, module) => {
  const data = cloneDeep(item)
  data.type = getMeterFilterByDic(module)[data.type]
  const unitType =
    data.type === 'net_received' || data.type === 'net_transmitted'
      ? 'number'
      : data.type

  const UNIT_CONFIG = {
    cpu: 'core',
    memory: 'Gi',
    number: 'M',
    disk: 'GB',
  }

  const unit = UNIT_CONFIG[unitType]

  Object.keys(data).forEach(key => {
    if (key.indexOf('_') > -1) {
      data[key] = getValueByUnit(data[key], unit)
      data.unit = unit
    }
  })
  return data
}

export const handleWorkloadToKind = ({ deployments, statefulsets }) => {
  const params = {}
  if (deployments) {
    params.kind = 'deployments'
  }

  if (statefulsets) {
    params.kind = 'statefulsets'
  }
  return params
}

export const handleNodeParams = ({ nodes, pods, resources }) => {
  if (nodes && pods && resources.length > 1) {
    return { resources_filter: undefined }
  }
}

export const handleLabelSelector = params => {
  let labelSelector = ''
  if (!params || isEmpty(params)) return labelSelector
  Object.keys(params).forEach(key => {
    labelSelector += `${key}=${params[key]},`
  })

  labelSelector = labelSelector.slice(0, -1)
  return labelSelector
}

export const hasNameSpacesType = type => {
  const nameSpaceType = ['services', 'deployments', 'statefulsets', 'pods']
  return nameSpaceType.indexOf(type) > -1
}

export const filterListByType = ({ type, ...params }) => {
  if (
    (params.services || params.deployments || params.statefulsets) &&
    type === 'pods' &&
    isEmpty(params.labelSelector)
  ) {
    return () => false
  }

  return () => true
}

export const filterResourceLevel = async ({
  levelMeterData,
  type,
  data,
  levelKey,
  ...rest
}) => {
  let _levelKey = levelKey || rest.namespaces
  const _levelMeterData = get(levelMeterData, _levelKey)
  let keysArr = []
  let _data = []

  const _type = type === 'applications' ? 'apps' : type
  if (
    type === 'services' ||
    type === 'deployments' ||
    type === 'statefulsets'
  ) {
    if (rest.applications) {
      const _rest = cloneDeep(rest)
      const appName = `${rest.applications}:${rest.labelSelector['app.kubernetes.io/version']}`
      _levelKey = `${_levelKey}.apps.${appName}`
      delete _rest.applications

      _data = await filterResourceLevel({
        levelMeterData,
        type,
        data,
        levelKey: _levelKey,
        ..._rest,
      })
    } else {
      keysArr =
        _levelMeterData && _levelMeterData[_type]
          ? Object.keys(_levelMeterData[_type])
          : []
      _data = data.map(item => {
        const hasItem = keysArr.find(key => key === item.name)
        return !isUndefined(hasItem) && !isEmpty(hasItem) ? item : undefined
      })
    }
  } else if (type === 'applications') {
    keysArr = _levelMeterData[_type] ? Object.keys(_levelMeterData[_type]) : []
    _data = data.map(item => {
      const itemName = `${item.name}:${get(item, '_origin.version')}`
      const hasItem = keysArr.find(key => key === itemName)
      return !isUndefined(hasItem) && !isEmpty(hasItem) ? item : undefined
    })
  } else {
    return data
  }
  _data = _data.filter(item => !isUndefined(item))
  return _data
}

const handleNsMeter = (lists, levelMeterData, meters) => {
  const customItemChartData = []
  lists.forEach(_item => {
    const parentName = { name: _item.name }
    const _levelMeterData = levelMeterData[_item.name]

    Object.keys(_levelMeterData).forEach(key => {
      if (key !== 'daemonsets' && _levelMeterData[key]) {
        parentName.children = []
        Object.keys(_levelMeterData[key]).forEach(itemMeter => {
          if (_levelMeterData[key][itemMeter]) {
            const value = get(
              _levelMeterData,
              `${key}.${itemMeter}.${METER_RESOURCE_USAGE[meters]}`,
              0
            )
            parentName.children.push({
              name: itemMeter,
              size: value,
            })
          }
        })
      }
    })
    if (!isEmpty(parentName.children)) {
      customItemChartData.push(parentName)
    }
  })
  return customItemChartData
}

const handleAppMeter = (levelMeterData, params, meters) => {
  const customItemChartData = []
  const _levelMeterData = levelMeterData[params.namespaces].apps
  Object.keys(_levelMeterData).forEach(key => {
    if (_levelMeterData[key]) {
      const parentName = { name: key }
      parentName.children = []

      const __levelMeterData = _levelMeterData[key].services
      Object.keys(__levelMeterData).forEach(itemMeter => {
        const value = get(
          __levelMeterData,
          `${itemMeter}.${METER_RESOURCE_USAGE[meters]}`,
          0
        )
        parentName.children.push({
          name: itemMeter,
          size: value,
        })
      })
      if (!isEmpty(parentName.children)) {
        customItemChartData.push(parentName)
      }
    }
  })
  return customItemChartData
}

const handleWorkloadMeter = (levelMeterData, type, params, meters) => {
  const customItemChartData = []
  let _levelMeterData = ''

  if (params.applications) {
    _levelMeterData = levelMeterData[params.namespaces]['apps']
    const appName = params.applications
    const _appName = Object.keys(_levelMeterData).find(
      key => key.indexOf(appName) > -1
    )
    _levelMeterData = _levelMeterData[_appName][type]
  } else {
    _levelMeterData = levelMeterData[params.namespaces][type]
  }

  Object.keys(_levelMeterData).forEach(key => {
    const parentName = { name: key }
    parentName.children = []

    if (_levelMeterData[key]) {
      const __levelMeterData = _levelMeterData[key].pods
      Object.keys(__levelMeterData).forEach(itemMeter => {
        const value = get(
          __levelMeterData,
          `${itemMeter}.${METER_RESOURCE_USAGE[meters]}`,
          0
        )
        parentName.children.push({
          name: itemMeter,
          size: value,
        })
      })
      if (!isEmpty(parentName.children)) {
        customItemChartData.push(parentName)
      }
    }
  })
  return customItemChartData
}

const handleWSPodsMeter = (levelMeterData, type, params, meters) => {
  const customItemChartData = []
  let _levelMeterData = ''
  if (params.applications) {
    _levelMeterData = levelMeterData[params.namespaces]['apps']
    const appName = params.applications
    const _appName = Object.keys(_levelMeterData).find(
      key => key.indexOf(appName) > -1
    )
    _levelMeterData = _levelMeterData[_appName]
  } else {
    _levelMeterData = levelMeterData[params.namespaces]
  }

  if (params.deployments) {
    _levelMeterData = _levelMeterData['deployments'][params.deployments][type]
  }
  if (params.services) {
    _levelMeterData = _levelMeterData['services'][params.services][type]
  }
  if (params.statefulsets) {
    _levelMeterData = _levelMeterData['statefulsets'][params.statefulsets][type]
  }

  Object.keys(_levelMeterData).forEach(key => {
    const value = get(
      _levelMeterData,
      `${key}.${METER_RESOURCE_USAGE[meters]}`,
      0
    )
    customItemChartData.push({ name: key, size: value })
  })
  return customItemChartData
}

export const handleWSChartData = ({
  lists,
  levelMeterData,
  meters,
  type,
  params,
}) => {
  let data

  switch (type) {
    case 'namespaces':
      data = handleNsMeter(lists, levelMeterData, meters)
      break
    case 'applications':
      data = handleAppMeter(levelMeterData, params, meters)
      break
    case 'services':
    case 'deployments':
    case 'statefulsets':
      data = handleWorkloadMeter(levelMeterData, type, params, meters, lists)
      break
    default:
      data = handleWSPodsMeter(levelMeterData, type, params, meters)
      break
  }
  return data
}

export const getFetchParams = ({
  isMultiCluster,
  type,
  cluster,
  namespaces,
  workspaces,
  applications,
  ...params
}) => {
  const PARAMS_CONFIG = {
    cluster: isMultiCluster
      ? [{ page: 1, limit: -1 }]
      : [
          {
            page: 1,
            limit: -1,
            labelSelector: `cluster-role.kubesphere.io/host`,
          },
          {
            page: 1,
            limit: -1,
            labelSelector: `!cluster-role.kubesphere.io/host`,
          },
        ],
    nodes: [{ limit: -1, page: 1, cluster }],
    workspaces: [
      {
        limit: -1,
        page: 1,
        namespace: namespaces,
        workspace: workspaces,
      },
    ],
    namespaces: [
      {
        page: 1,
        limit: -1,
        cluster,
        namespace: namespaces,
        workspace: workspaces,
      },
    ],
    applications: [
      {
        page: 1,
        limit: -1,
        workspace: workspaces,
        cluster,
        namespace: namespaces,
        application: applications,
      },
    ],
    services: [
      {
        page: 1,
        limit: -1,
        cluster,
        namespace: namespaces,
      },
    ],
    deployments: [
      {
        page: 1,
        limit: -1,
        cluster,
        namespace: namespaces,
        labelSelector: handleLabelSelector(params.labelSelector),
      },
    ],
    statefulsets: [
      {
        page: 1,
        limit: -1,
        cluster,
        namespace: namespaces,
        labelSelector: handleLabelSelector(params.labelSelector),
      },
    ],
    pods: [
      {
        page: 1,
        limit: -1,
        cluster,
        namespace: namespaces,
        labelSelector: handleLabelSelector(params.labelSelector),
        nodeName: params.nodes,
        ownerKind: params.statefulsets
          ? 'StatefulSet'
          : params.deployments
          ? 'ReplicaSet'
          : undefined,
      },
    ],
  }
  return PARAMS_CONFIG[type]
}

export const getListConfig = ({ type, isMultiCluster }) => {
  const LIST_CONFIG = {
    cluster: isMultiCluster
      ? [
          {
            status: item => (item.isReady ? 'ready' : 'stop'),
            desc: 'Host Cluster',
          },
        ]
      : [
          {
            status: item => (item.isReady ? 'ready' : 'stop'),
            desc: 'Host Cluster',
          },
          {
            status: item => (item.isReady ? 'ready' : 'stop'),
            desc: 'Member Cluster',
          },
        ],
    nodes: [
      {
        status: item => getNodeStatus(item),
        desc: RESOURCE_TITLE[type],
      },
    ],
    workspaces: [
      {
        desc: RESOURCE_TITLE[type],
      },
    ],
    namespaces: [
      {
        status: item => item.status,
        desc: RESOURCE_TITLE[type],
      },
    ],
    applications: [
      {
        status: item => item.status || '',
        desc: RESOURCE_TITLE[type],
      },
    ],

    services: [
      {
        desc: RESOURCE_TITLE[type],
      },
    ],
    deployments: [
      {
        status: item => {
          const { status } = getWorkloadStatus(item, type)
          return status
        },
        desc: RESOURCE_TITLE[type],
      },
    ],
    statefulsets: [
      {
        status: item => {
          const { status } = getWorkloadStatus(item, type)
          return status
        },
        desc: RESOURCE_TITLE[type],
      },
    ],
    pods: [
      {
        status: item => get(item, 'podStatus.status', ''),
        desc: RESOURCE_TITLE[type],
      },
    ],
  }
  return LIST_CONFIG[type]
}

export const handleStrTimeToX = strTime => {
  return !isUndefined(strTime) && typeof strTime === 'string'
    ? getLocalTime(strTime).format('X') * 1000
    : undefined
}
