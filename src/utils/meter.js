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
  UNIT_CONFIG,
} from 'components/Modals/Bill/constats'

import { getNodeStatus } from 'utils/node'
import { getWorkloadStatus } from 'utils/status'
import { getLocalTime } from 'utils'

import { getValueByUnit } from 'utils/monitoring'
import { getMinuteValue } from 'stores/monitoring/base'
import moment from 'moment-mini'

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

export const getRetentionDay = (retentionDay = '7d') => {
  return moment()
    .endOf('day')
    .add(1, 'second')
    .subtract(1, 'day')
    .subtract(retentionDay.slice(0, -1), 'day')
}

export const getTimeRange = ({ step = '600s', times = 20 } = {}) => {
  const interval = parseFloat(step) * times
  const end = Math.floor(
    moment()
      .endOf('day')
      .add(1, 'second')
      .subtract(1, 'day') / 1000
  )

  const start = Math.floor(end - interval)

  return { start, end }
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
  return params
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
      case 'openpitrixs':
        data = { openpitrixs_ids: resourcesString }
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

  const unit = UNIT_CONFIG[unitType]

  Object.keys(data).forEach(key => {
    if (key.indexOf('_value') > -1) {
      data[key] = getValueByUnit(data[key], unit.value, 3)
      data.unit = unit
    }
  })
  return data
}

export const handleWorkloadToKind = ({
  deployments,
  statefulsets,
  daemonsets,
}) => {
  const params = {}
  if (deployments) {
    params.kind = 'deployments'
  }

  if (statefulsets) {
    params.kind = 'statefulsets'
  }

  if (daemonsets) {
    params.kind = 'daemonsets'
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
  const nameSpaceType = [
    'services',
    'deployments',
    'statefulsets',
    'daemonsets',
    'pods',
  ]
  return nameSpaceType.indexOf(type) > -1
}

export const filterListByType = ({ type, ...params }) => {
  if (
    (params.services ||
      params.deployments ||
      params.statefulsets ||
      params.daemonsets) &&
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
    ['services', 'deployments', 'statefulsets', 'daemonsets'].includes(type)
  ) {
    if (rest.applications || rest.openpitrixs) {
      const _rest = cloneDeep(rest)
      const name = rest.applications || rest.openpitrixs
      const __type = rest.applications ? 'apps' : 'openpitrixs'

      _levelKey = `${_levelKey}.${__type}.${name}`

      delete _rest.openpitrixs
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
  } else if (type === 'applications' || type === 'openpitrixs') {
    keysArr = _levelMeterData[_type] ? Object.keys(_levelMeterData[_type]) : []
    _data = data.map(item => {
      const hasItem = keysArr.find(
        key => key === item.name || key === item.cluster_id
      )
      return !isUndefined(hasItem) && !isEmpty(hasItem) ? item : undefined
    })
  } else {
    return data
  }
  _data = _data.filter(item => !isUndefined(item))
  return _data
}

const handleAppMeter = (levelMeterData, params, meters, type) => {
  const customItemChartData = []
  const _key = type === 'applications' ? 'apps' : 'openpitrixs'
  const _levelMeterData = levelMeterData[params.namespaces][`${_key}`]

  !isEmpty(_levelMeterData) &&
    Object.keys(_levelMeterData).forEach(key => {
      if (_levelMeterData[key]) {
        const value = _levelMeterData[key][METER_RESOURCE_USAGE[meters]] || 0
        const unit = UNIT_CONFIG[meters]

        customItemChartData.push({
          name: key,
          value: getValueByUnit(value, unit.value, 3),
          unit: unit.label,
          type,
        })
      }
    })
  return customItemChartData
}

const handleWorkloadMeter = (levelMeterData, type, params, meters) => {
  const customItemChartData = []
  let _levelMeterData = ''

  if (params.applications || params.openpitrixs) {
    const _type = params.applications ? 'apps' : 'openpitrixs'
    _levelMeterData = levelMeterData[params.namespaces][_type]
    const name = params.applications || params.openpitrixs
    const _name = Object.keys(_levelMeterData).find(
      key => key.indexOf(name) > -1
    )

    _levelMeterData = _levelMeterData[_name][type]
  } else {
    _levelMeterData = levelMeterData[params.namespaces][type]
  }

  !isEmpty(_levelMeterData) &&
    Object.keys(_levelMeterData).forEach(key => {
      const value = get(
        _levelMeterData,
        `${key}.${METER_RESOURCE_USAGE[meters]}`,
        0
      )

      const unit = UNIT_CONFIG[meters]

      customItemChartData.push({
        name: key,
        value: getValueByUnit(value, unit.value, 3),
        unit: unit.label,
        type,
      })
    })
  return customItemChartData
}

const handleWSPodsMeter = (levelMeterData, type, params, meters) => {
  const customItemChartData = []
  let _levelMeterData = ''

  if (params.applications || params.openpitrixs) {
    const _type = params.applications ? 'apps' : 'openpitrixs'
    _levelMeterData = levelMeterData[params.namespaces][_type]
    const name = params.applications || params.openpitrixs
    const _name = Object.keys(_levelMeterData).find(
      key => key.indexOf(name) > -1
    )
    _levelMeterData = _levelMeterData[_name]
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
  if (params.daemonsets) {
    _levelMeterData = _levelMeterData['daemonsets'][params.daemonsets][type]
  }

  !isEmpty(_levelMeterData) &&
    Object.keys(_levelMeterData).forEach(key => {
      const value = get(
        _levelMeterData,
        `${key}.${METER_RESOURCE_USAGE[meters]}`,
        0
      )

      const unit = UNIT_CONFIG[meters]

      customItemChartData.push({
        name: key,
        value: getValueByUnit(value, unit.value, 3),
        unit: unit.label,
        type,
      })
    })
  return customItemChartData
}

export const handleWSChartData = ({ levelMeterData, meters, type, params }) => {
  let data

  switch (type) {
    case 'applications':
    case 'openpitrixs':
      data = handleAppMeter(levelMeterData, params, meters, type)
      break
    case 'services':
    case 'deployments':
    case 'statefulsets':
    case 'daemonsets':
      data = handleWorkloadMeter(levelMeterData, type, params, meters)
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
  openpitrixs,
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
    openpitrixs: [
      {
        page: 1,
        limit: -1,
        workspace: workspaces,
        cluster,
        namespace: namespaces,
        openpitrix: openpitrixs,
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
        labelSelector: handleLabelSelector(params.labelSelector),
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
    daemonsets: [
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
            desc: '',
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
    openpitrixs: [
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
    daemonsets: [
      {
        status: item => {
          const { status } = getWorkloadStatus(item, type)
          return status
        },
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
  return moment(strTime).format('X') * 1000
}
