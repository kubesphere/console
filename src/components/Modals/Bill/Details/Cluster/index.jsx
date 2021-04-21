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
import { observer } from 'mobx-react'
import classnames from 'classnames'
import {
  get,
  isArray,
  isEmpty,
  last,
  cloneDeep,
  set,
  flatten,
  isUndefined,
  sortBy,
} from 'lodash'
import { action, observable, toJS } from 'mobx'
import { Loading, Tooltip, Icon } from '@kube-design/components'
import MeterStore from 'stores/meter/base'

import ClusterMeterStore from 'stores/meter/cluster'
import EmptyList from 'components/Cards/EmptyList'
import { handleWSChartData, getTimeParams, getRetentionDay } from 'utils/meter'
import { getTimeStr } from 'components/Cards/Monitoring/Controller/TimeSelector/utils'
import { COLORS_MAP, DEFAULT_CLUSTER, ICON_TYPES } from 'utils/constants'
import Button from '@kube-design/components/lib/components/Button'
import { RESOURCES_TYPE, RESOURCE_TITLE, AREA_COLORS } from '../../constats'

import Crumb from '../../components/Crumb'
import Title from '../../components/Title'
import SideCard from '../../components/SideCard'
import MeterDetailCard from '../../components/MeterDetailCard'
import TimeSelect from '../../components/TimeSelect'
import LineChart from '../../components/LineChart'
import MeterTable from '../../components/Tables'
import ResourceSelect from '../../components/ResourceSelect'
import PieChart from '../../components/ConstomPieChart'

import styles from './index.scss'

@observer
export default class ClusterDetails extends React.Component {
  clusterMeterStore = new ClusterMeterStore()

  store = new MeterStore()

  @observable
  crumbData = []

  @observable
  cacheCrumbData = []

  @observable
  tableData = []

  @observable
  active = {}

  @observable
  list = []

  @observable
  timeRange = {}

  @observable
  currentMeterData = {}

  @observable
  parentMeterData = {}

  @observable
  sideLoading = false

  @observable
  loading = false

  @observable
  chartData = {}

  @observable
  priceConfig = {}

  @observable
  priceConfigList = []

  childrenResourceList = []

  @observable
  pieChartData = []

  @observable
  resourceLoading = false

  componentDidMount() {
    this.initData()
  }

  initData = async () => {
    this.loading = true
    this.sideLoading = true

    if (this.props.meterType === 'workspaces') {
      this.clusterList = await this.clusterMeterStore.fetchList({
        type: 'cluster',
      })

      if (globals.app.isMultiCluster) {
        this.clusterList = this.clusterList.map(item => {
          const disabled = !get(item, '_origin.configz.metering')
          return { disabled, ...item }
        })
      } else {
        this.clusterList = this.clusterList.map(item => {
          const disabled = !globals.ksConfig.metering
          return { disabled, ...item }
        })
      }

      if (isEmpty(this.clusterList)) {
        this.sideLoading = false
        this.loading = false
        return
      }

      await this.getPriceConfigListByCluster(this.clusterList)
    }

    const list = await this.clusterMeterStore.fetchList({
      type: this.props.meterType,
    })

    if (this.props.meterType === 'cluster') {
      if (globals.app.isMultiCluster) {
        this.list = list.map(item => {
          const disabled = !get(item, '_origin.configz.metering')
          return { disabled, ...item }
        })
      } else {
        this.list = list.map(item => {
          const disabled = !globals.ksConfig.metering
          return { disabled, ...item }
        })
      }
    } else {
      this.list = this.setWSListDisabledByCluster(list)
    }

    if (isEmpty(toJS(this.list))) {
      this.sideLoading = false
      this.loading = false
      return
    }

    let isNoDisabledIndex

    for (let i = 0; i < this.list.length; i++) {
      if (!this.list[i].disabled) {
        isNoDisabledIndex = i
        break
      }
    }

    if (isNoDisabledIndex === undefined) {
      this.currentMeterData = {}
      this.sideLoading = false
      this.loading = false
      return
    }

    const { name, type, labelSelector } = this.list[isNoDisabledIndex]

    if (type === 'cluster') {
      this.cluster = name
      await this.getPriceConfigListByCluster(this.list)
    }

    this.crumbData.push({
      type,
      name,
      list: this.list,
    })

    await this.handleSelectResource({
      name,
      type,
      isCopy: true,
      labelSelector,
      isTime: true,
    })

    this.sideLoading = false
    this.loading = false
  }

  setWSListDisabledByCluster = list => {
    if (!isArray(list)) {
      return []
    }

    return list.map(item => {
      const clusters = globals.app.isMultiCluster
        ? item.name === 'system-workspace'
          ? this.clusterList
          : get(item, '_origin.clusters', [])
        : this.clusterList

      const clustersLength = clusters.length
      let count = 0

      clusters.forEach(_cluster => {
        const cluster = this.clusterList.find(
          _item => _item.name === _cluster.name
        )
        if (cluster.disabled) {
          count++
        }
      })

      item.disabled = count === clustersLength
      return item
    })
  }

  @action
  getPriceConfigListByCluster = async clusterList => {
    const request = []
    clusterList.forEach(item => {
      if (!item.disabled) {
        request.push(this.store.fetchPrice({ cluster: item.name }))
      }
    })

    if (globals.app.isMultiCluster) {
      request.push(this.store.fetchPrice({ cluster: '' }))
    }

    const priceConfigList = await Promise.all(request)
    this.priceConfigList = priceConfigList
  }

  @action
  getClustersList = name => {
    const workspaceData = this.crumbData[0]
    const currentData = workspaceData.list.find(item => item.name === name)
    const clustersList =
      name === 'system-workspace'
        ? this.clusterList
        : get(currentData, '_origin.clusters', [])

    if (isEmpty(clustersList)) {
      return []
    }

    const _clusterList = clustersList
      .map(item => {
        const cluster = this.clusterList.find(_item => _item.name === item.name)

        if (!isEmpty(cluster)) {
          return {
            label: cluster.name,
            value: cluster.name,
            type: cluster._origin.isHost ? 'host' : 'member',
            disabled: cluster.disabled,
            sortValue: Number(cluster.disabled),
          }
        }
        return null
      })
      .filter(item => !isEmpty(item))

    const isAllDisabled = _clusterList.every(item => item.disabled)
    if (isAllDisabled) {
      return []
    }

    return sortBy(_clusterList, item => {
      return item.sortValue
    })
  }

  @action
  setPriceConfig = cluster => {
    const _cluster = cluster || get(DEFAULT_CLUSTER, 'metadata.name')
    const _priceConfig = this.priceConfigList.find(
      item => item.cluster && item.cluster === _cluster
    )

    const clusterPriceConfig = cloneDeep(_priceConfig)

    delete clusterPriceConfig.cluster

    this.priceConfig = isEmpty(clusterPriceConfig) ? {} : _priceConfig
    this.setStartTime()
  }

  @action
  setStartTime = () => {
    this.startTime = getRetentionDay(
      get(this.priceConfig, 'retention_day', '7d')
    )
  }

  handleSelectResource = async ({ name, type, isCopy, ...params }) => {
    if (name === this.active.name && type === this.active.type) {
      return
    }

    if (type === 'workspaces') {
      this.clusters = this.getClustersList(name)
      this.cluster = get(this.clusters, '[0].value', '')
      this.setPriceConfig(this.cluster)
    }

    if (type === 'cluster') {
      this.setPriceConfig(name)
    }

    await this.getCurrentMeterData({
      name,
      type,
      isTime: true,
      ...params,
      start: this.startTime,
      isCopy: true,
    })
  }

  getSumMeterData = result => {
    const sumData = {}
    const feeData = {}

    if (!isEmpty(result)) {
      result.forEach(item => {
        if (item.type) {
          sumData[item.type] = {
            value: get(item, 'sum_value', ''),
            unit: get(item, 'unit', 'label'),
          }

          const free = isEmpty(get(item, 'fee'))
            ? 0
            : parseFloat(get(item, 'fee', 0))

          feeData[item.type] = {
            value: free.toFixed(2),
            unit: {
              label: this.priceConfig.currency === 'CNY' ? t('￥') : t('$'),
            },
          }
        }
      })
    }

    return { sumData, feeData }
  }

  @action
  setCluster = async cluster => {
    this.cluster = cluster
    this.loading = true

    const { name, type } = this.active
    const currentData = this.list.find(item => item.name === name)

    this.setPriceConfig(cluster)

    await this.getCurrentMeterData({
      name,
      type,
      isCopy: true,
      isTime: true,
      start: this.startTime,
      labelSelector: get(currentData, 'labelSelector', ''),
    })

    this.loading = false
  }

  @action
  setActiveCrumb = ({ name, type, isCopy, start }) => {
    const lastCrumbData = last(this.crumbData)
    lastCrumbData.type = type
    lastCrumbData.name = name
    lastCrumbData.start = start

    if (isCopy) {
      this.cacheCrumbData = cloneDeep(toJS(this.crumbData))
    }
  }

  getMeterParamsByCrumb = () => {
    const params = {}
    const list = cloneDeep(toJS(this.crumbData))
    if (list[0].type === 'workspaces' && list.length > 2) {
      list.shift()
    }

    list.forEach(item => {
      params[item.type] = item.name
    })

    return params
  }

  @action
  getCurrentMeterData = async ({
    name,
    type,
    isCopy,
    labelSelector,
    isTime,
    start,
  }) => {
    this.active = { name, type, start }
    this.tableData = []
    this.pieChartData = []
    this.timeRange = {}
    this.setActiveCrumb({
      name,
      type,
      isCopy: !!isCopy,
      start,
    })

    const params = this.getMeterParamsByCrumb()

    this.loading = true

    const meterData = await this.setMeterData({
      module: type,
      meters: 'all',
      resources: [name],
      start,
      isTime,
      params,
    })

    await this.getCurrentTimeMeterData({
      valueKey: 'currentMeterData',
      module: type,
      resources: [name],
      start,
      params,
    })

    this.tableData = this.setLineChartColor(meterData)

    this.setTimeRange({ isTime, start })

    this.chartData = meterData

    if (type !== 'pods') {
      if (['workspaces', 'cluster', 'nodes'].includes(type)) {
        const childrenList = await this.getChildrenList({
          labelSelector,
          currentType: type,
        })

        this.childrenResourceList = childrenList
      } else if (!this.clusterMeterStore.levelMeterData[params.namespaces]) {
        if (!params.cluster) {
          params.cluster = this.cluster
        }

        await this.clusterMeterStore.fetchLevelMeter({ ...params })
      } else {
        this.childrenResourceList = []
      }

      await this.getResourceMeterData(get(this.tableData, '[0].type', 'cpu'))
    } else {
      this.childrenResourceList = []
    }

    this.loading = false
  }

  @action
  setMeterData = async ({
    params,
    module,
    meters,
    resources,
    list,
    start,
    end,
    isTime,
  }) => {
    if (params.cluster && this.props.meterType === 'cluster') {
      this.cluster = params.cluster
    }

    params.cluster = this.cluster

    if (module === 'applications' && !isEmpty(resources)) {
      const currentlist = list || this.list
      resources = resources.map(resName => {
        const data = currentlist.find(_itemList => _itemList.name === resName)
        const applicationsVersion =
          get(data, '_origin.version.name', '') ||
          get(data, '_origin.version', '')

        return `${resName}${
          applicationsVersion ? `:${applicationsVersion}` : ''
        }`
      })
    }

    if (module === 'openpitrixs' && globals.app.isMultiCluster) {
      const clusterType = get(
        this.clusters.find(cluster => cluster.value === params.cluster),
        'type'
      )

      if (clusterType !== 'host') {
        delete params.cluster
      }
    }

    const result = await this.fetchMeterData({
      module,
      meters,
      resources,
      isTime,
      start,
      end,
      ...params,
    })

    return result
  }

  fetchMeterData = async ({ module, meters, resources, ...params }) => {
    const data = await this.store.fetchMeter({
      module,
      meters,
      resources,
      ...params,
    })
    return data
  }

  @action
  setTimeRange = ({ isTime, ...params }) => {
    const { step, start, end } = getTimeParams({ isTime, ...params })

    if (start >= end) {
      this.timeRange = {}
      return
    }

    this.timeRange = {
      step: getTimeStr(step),
      start: start * 1000,
      end: end * 1000,
    }
  }

  @action
  getChildrenData = async ({ name, type, labelSelector }) => {
    const lastCrumbData = last(this.crumbData)

    this.loading = true
    this.sideLoading = true

    if (type === 'workspaces' && name !== lastCrumbData.name) {
      this.clusters = this.getClustersList(name)
      this.cluster = get(this.clusters, '[0].value', '')
      this.setPriceConfig(this.cluster)
    }

    if (type === 'cluster' && name !== lastCrumbData.name) {
      this.setPriceConfig(name)
    }

    this.setActiveCrumb({
      name,
      type,
      isCopy: true,
      start: this.startTime,
    })

    const childrenList = await this.getChildrenList({
      labelSelector,
      currentType: type,
    })

    if (!isEmpty(childrenList) && isArray(childrenList)) {
      const childrenType = childrenList[0].type
      const parentType = last(this.crumbData)
      const params = this.getMeterParamsByCrumb()

      await this.getCurrentTimeMeterData({
        valueKey: 'parentMeterData',
        params,
        module: parentType.type,
        start: parentType.start,
        resources: [parentType.name],
      })

      this.crumbData.push({
        type: childrenType,
        name: childrenList[0].name,
        list: childrenList,
        start: this.startTime,
      })

      await this.getCurrentMeterData({
        name: childrenList[0].name,
        type: childrenType,
        isCopy: true,
        isTime: true,
        start: this.startTime,
        labelSelector: get(childrenList, '[0].labelSelector'),
      })

      this.list = childrenList
    }

    this.loading = false
    this.sideLoading = false
  }

  getChildrenList = async ({ labelSelector, currentType, childParam }) => {
    const LevelData = this.getChildrenTypeByLevel(currentType)

    const resourceParams = {
      ...this.getChildrenParamsByCrumb(),
      ...childParam,
    }

    if (!resourceParams.cluster) {
      resourceParams.cluster = this.cluster
    }

    labelSelector ? (resourceParams.labelSelector = toJS(labelSelector)) : null

    let childrenList = []

    if (['namespaces', 'services', 'openpitrixs'].includes(currentType)) {
      currentType === 'namespaces' &&
      !this.clusterMeterStore.levelMeterData[resourceParams.namespaces]
        ? await this.clusterMeterStore.fetchLevelMeter({ ...resourceParams })
        : null

      childrenList = await this.getTypesListData(currentType, resourceParams)
      return childrenList
    }

    if (LevelData.children) {
      childrenList = await this.clusterMeterStore.fetchList({
        type: LevelData.children[0],
        ...resourceParams,
      })
      return childrenList
    }
    return childrenList
  }

  getClusterMeterChartData = async (meters, isNameSpaces) => {
    const params = this.getMeterParamsByCrumb()
    const dataList = []

    const nameList = this.childrenResourceList.map(item => {
      return {
        name: item.name,
        type: item.type,
        labelSelector: get(item, 'labelSelector'),
      }
    })

    RESOURCES_TYPE.forEach(itemType => {
      const list = []

      nameList.forEach(item => {
        if (item.type === itemType) {
          list.push(item)
        }
      })

      if (!isEmpty(list)) {
        dataList.push(list)
      }
    })

    const pieChartData = []

    for await (const lists of dataList) {
      const type = lists[0].type

      const customItemChartData = []
      const podList = lists.map(item => item.name)
      const _params = cloneDeep(params)

      if (!isNameSpaces) {
        _params[type] = lists[0].name
      }

      const meterData = await this.setMeterData({
        module: type,
        meters: [meters],
        resources: podList,
        params: _params,
      })

      if (!isEmpty(meterData)) {
        lists.forEach(item => {
          const meter = meterData.find(itemMeterData => {
            const name = get(itemMeterData, `metric.${itemMeterData.module}`)
            return name === item.name
          })
          if (meter) {
            const value = get(meter, 'sum_value')
            const name = get(meter, `metric.${meter.module}`)
            const unit = get(meter, 'unit.label')

            customItemChartData.push({
              name,
              value: value || 0,
              unit,
              type,
            })
          }
        })
      }
      const _customItemChartData = sortBy(
        customItemChartData,
        item => item.value
      ).reverse()

      pieChartData.push(_customItemChartData)
    }

    this.pieChartData = flatten(pieChartData)
  }

  getWorkspacesMeterChartData = async meters => {
    const { type } = this.active

    if (type === 'workspaces') {
      await this.getClusterMeterChartData(meters, true)
    } else {
      const params = this.getMeterParamsByCrumb()
      const pieChartData = []
      const dataList = []

      const nameList = this.childrenResourceList.map(item => {
        return {
          name: item.name,
          type: item.type,
          labelSelector: get(item, 'labelSelector'),
        }
      })

      RESOURCES_TYPE.forEach(itemType => {
        const list = []

        nameList.forEach(item => {
          if (item.type === itemType) {
            list.push(item)
          }
        })

        if (!isEmpty(list)) {
          dataList.push(list)
        }
      })

      const _params = {
        ...params,
        cluster: this.cluster,
        [type]: this.active.name,
      }

      const { levelMeterData } = this.clusterMeterStore
      const LevelData = this.getChildrenTypeByLevel(type)
      const childrenTypeList = LevelData.children

      for await (const _type of childrenTypeList) {
        const customChartItemData = handleWSChartData({
          levelMeterData: toJS(levelMeterData),
          meters,
          type: _type,
          params: _params,
        })
        const _customItemChartData = sortBy(
          customChartItemData,
          item => item.value
        ).reverse()

        pieChartData.push(_customItemChartData)
      }
      this.pieChartData = flatten(pieChartData)
    }
  }

  @action
  getResourceMeterData = async meters => {
    const { level } = this.props
    this.resourceLoading = true

    if (level[0].type === 'workspaces') {
      await this.getWorkspacesMeterChartData(meters)
    } else {
      await this.getClusterMeterChartData(meters)
    }
    this.resourceLoading = false
  }

  getChildrenParamsByCrumb = () => {
    const params = {}
    const list = cloneDeep(toJS(this.crumbData))

    list.forEach(item => {
      params[item.type] = item.name
    })
    return params
  }

  getTypesListData = async (type, params) => {
    const LevelData = this.getChildrenTypeByLevel(type)
    const requestList = []

    LevelData.children.forEach(_type => {
      requestList.push(
        this.clusterMeterStore.fetchList({
          type: _type,
          ...params,
        })
      )
    })

    const list = await Promise.all(requestList)
    const childrenList = flatten(list)

    return childrenList
  }

  getChildrenTypeByLevel = _type => {
    const { level } = this.props
    const LevelData = level.find(itemLevel => {
      if (isArray(itemLevel.type)) {
        return itemLevel.type.indexOf(_type) > -1
      }
      return itemLevel.type === _type
    })
    return LevelData
  }

  setLineChartColor = list => {
    if (isEmpty(list)) {
      return []
    }

    list.map((item, index) => {
      item.key = item.type
      item.color = COLORS_MAP[AREA_COLORS[index]] || AREA_COLORS[index]

      return item
    })
    return list
  }

  renderParentMeterCard = () => {
    if (
      !this.active.type ||
      this.active.type === 'cluster' ||
      this.active.type === 'workspaces' ||
      isEmpty(toJS(this.priceConfig))
    ) {
      return null
    }

    const length = this.crumbData.length
    const data = this.crumbData[length - 2]

    const name =
      this.active.type === 'namespaces' && length === 2 && this.cluster
        ? `${data.name} (${this.cluster})`
        : data.name

    return (
      <div className={styles.usageCard}>
        <MeterDetailCard
          className={styles.meterCard}
          isParent={true}
          priceConfig={this.priceConfig}
          title={
            <>
              <span>{t(RESOURCE_TITLE[get(data, 'type', '-')])}</span>
              <strong>{name}</strong>
            </>
          }
          {...this.parentMeterData}
        />
      </div>
    )
  }

  @action
  handleChartData = async ({ meters, ...params }) => {
    const { name } = this.active
    this.tableData = []

    const data = await this.setMeterData({
      module: this.active.type,
      resources: [name],
      meters,
      isTime: true,
      params,
    })

    this.tableData = this.setLineChartColor(data)
    this.chartData = data
  }

  @action
  getTimeRange = ({ type, value, methord }) => {
    if (methord === 'close') {
      const params = this.getMeterParamsByCrumb()
      set(this.timeRange, `${type}`, value)

      this.handleChartData({
        meters: 'all',
        ...params,
        ...toJS(this.timeRange),
      })
    }

    set(this.timeRange, `${type}`, value)
  }

  @action
  getCurrentTimeMeterData = async ({
    valueKey,
    params,
    module,
    start,
    resources,
  }) => {
    const data = await this.setMeterData({
      params,
      meters: 'all',
      module,
      start,
      end: new Date(),
      resources,
      valueKey: 'parentMeterData',
      isTime: true,
    })

    const { sumData, feeData } = this.getSumMeterData(data)

    this[valueKey] = {
      sumData,
      feeData,
    }
  }

  @action
  handleCrumbOperation = async methord => {
    let step = this.crumbData.length - 1
    this.sideLoading = true

    if (methord === 'back') {
      if (step <= 0) {
        this.props.handleBack()
        this.sideLoading = false
        return
      }
      this.crumbData.pop()
      step -= 1
    } else {
      const cacheStep = this.cacheCrumbData.length - 1

      if (cacheStep <= 0 || cacheStep === step) {
        this.sideLoading = false
        return
      }
      const featureCrumb = this.cacheCrumbData[step + 1]
      this.crumbData.push(featureCrumb)
      step += 1
    }

    const currentActive = last(this.crumbData)

    if (step > 0) {
      const parentData = this.crumbData[step - 1]
      const params = this.getMeterParamsByCrumb()

      if (parentData.type === 'workspaces') {
        params.workspaces = parentData.name
        this.clusters = this.getClustersList(parentData.name)

        Object.keys(params).forEach(key => {
          if (key !== 'workspaces') {
            params[key] = undefined
          }
        })
      } else {
        params[currentActive.type] = undefined
      }

      await this.getCurrentTimeMeterData({
        params,
        valueKey: 'parentMeterData',
        module: parentData.type,
        start: parentData.start,
        resources: [parentData.name],
      })
    }

    const currentItem = currentActive.list.find(
      item => item.name === currentActive.name
    )

    await this.getCurrentMeterData({
      name: currentActive.name,
      type: currentActive.type,
      start: this.startTime,
      labelSelector: get(currentItem, 'labelSelector', ''),
      isTime: true,
    })

    this.list = currentActive.list
    this.sideLoading = false
  }

  renderSubResource = () => {
    const pieChartData = toJS(this.pieChartData)

    if (
      this.active.type === 'pods' ||
      this.props.meterType === 'openpitrix' ||
      isUndefined(this.currentMeterData.sumData) ||
      isEmpty(pieChartData)
    ) {
      return null
    }

    return (
      <>
        <div className={styles.subTitle}>
          {t('Current Resources Included')}
          <Tooltip content={t('METER_RESOURCE_DESC')} placement="top">
            <Icon name="question" size={20} />
          </Tooltip>
        </div>
        <div className={styles.childrenResourceContainer}>
          <Loading spinning={this.resourceLoading}>
            <div className={styles.childrenlistContainer}>
              <ResourceSelect
                selectOptions={toJS(this.currentMeterData.sumData)}
                getResourceMeterData={this.getResourceMeterData}
                activeName={this.active.name}
              />
            </div>
            <div className={styles.constomChartContainer}>
              <PieChart data={pieChartData} />
            </div>
          </Loading>
        </div>
      </>
    )
  }

  renderEmpty = () => {
    return (
      <div className={styles.empty}>
        <EmptyList
          className={styles.emptyCard}
          icon={ICON_TYPES[this.active.type]}
          title={t('No Data')}
          desc={t('RESOURCE_NOT_FOUND')}
        />
      </div>
    )
  }

  render() {
    const { type, name, createTime } = this.active

    const noMeterData = Object.values(
      toJS(this.currentMeterData)
    ).every(value => isEmpty(value))

    if (isEmpty(this.list)) {
      return (
        <div className={styles.empty}>
          <Loading spinning={this.sideLoading || this.loading}>
            <EmptyList
              className={styles.emptyCard}
              icon="cluster"
              title={t('No Available Cluster')}
              desc={t('No cluster with metering module enabled')}
              actions={<Button onClick={this.props.handleBack}>返回</Button>}
            />
          </Loading>
        </div>
      )
    }

    return (
      <div className={styles.billDetail}>
        <div
          className={classnames(styles.leftContent, {
            [styles.paddingBottom0]:
              this.crumbData.length < 2 || isEmpty(toJS(this.priceConfig)),
          })}
        >
          <Crumb
            crumbData={toJS(this.crumbData)}
            handleCrumbOperation={this.handleCrumbOperation}
            loading={this.loading || this.sideLoading}
            cluster={this.cluster}
          />

          <SideCard
            list={this.list}
            active={toJS(this.active)}
            handleSelectResource={this.handleSelectResource}
            getChildrenData={this.getChildrenData}
            loading={this.sideLoading || this.loading}
            fetchMeterData={this.fetchMeterData}
            crumbData={this.crumbData}
            timeRange={toJS(this.timeRange)}
            getMeterParamsByCrumb={this.getMeterParamsByCrumb}
            priceConfig={this.priceConfig}
            cluster={this.cluster}
            clusterList={this.clusterList}
            priceConfigList={this.priceConfigList}
          />
          {this.renderParentMeterCard()}
        </div>
        <div className={styles.rightContent}>
          <Loading spinning={this.loading}>
            <>
              <Title
                type={type}
                cluster={this.cluster}
                clusters={this.clusters}
                setCluster={this.setCluster}
              />
              {noMeterData ? (
                this.renderEmpty()
              ) : (
                <div className={styles.content}>
                  <MeterDetailCard
                    className={styles.toothbg}
                    title={
                      <>
                        <span>{t(RESOURCE_TITLE[type])}</span>
                        <strong>{name}</strong>
                      </>
                    }
                    priceConfig={this.priceConfig}
                    {...this.currentMeterData}
                  />
                  <div className={styles.subTitle}>
                    {t('Consumption by Yesterday')}
                  </div>
                  <div className={styles.info}>
                    {!isEmpty(toJS(this.timeRange)) ? (
                      <TimeSelect
                        createTime={createTime}
                        getTime={this.getTimeRange}
                        timeRange={this.timeRange}
                      />
                    ) : null}
                  </div>
                  <LineChart
                    chartData={toJS(this.chartData)}
                    priceConfig={this.priceConfig}
                  />
                  <MeterTable
                    data={toJS(this.tableData)}
                    priceConfig={this.priceConfig}
                  />
                  {this.renderSubResource()}
                </div>
              )}
            </>
          </Loading>
        </div>
      </div>
    )
  }
}
