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
import { handleWSChartData, handleStrTimeToX, getTimeParams } from 'utils/meter'
import { getTimeStr } from 'components/Cards/Monitoring/Controller/TimeSelector/utils'
import { COLORS_MAP } from 'utils/constants'
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

    this.priceConfig = await this.store.fetchPrice()
    this.clusterMeterStore.retentionDay = this.store.retentionDay

    if (this.props.meterType === 'workspaces') {
      const clusterList = await this.clusterMeterStore.fetchList({
        type: 'cluster',
      })

      this.clusterList = clusterList
    }

    const list = await this.clusterMeterStore.fetchList({
      type: this.props.meterType,
    })

    if (isEmpty(list) || !isArray(list)) {
      this.sideLoading = false
      this.loading = false
    }

    const { name, type, labelSelector, createTime, startTime } = list[0]
    this.list = list

    if (type === 'cluster') {
      this.cluster = name
    }

    this.crumbData.push({
      type,
      name,
      list,
      createTime,
      start: startTime,
    })

    await this.handleSelectResource({
      name,
      type,
      isCopy: true,
      labelSelector,
      isTime: true,
      createTime,
      start: startTime,
    })

    this.sideLoading = false
    this.loading = false
  }

  @action
  getClustersList = name => {
    const workspaceData = this.crumbData[0]
    const currentData = workspaceData.list.find(item => item.name === name)
    const clustersList = get(currentData, '_origin.clusters', [])

    if (isEmpty(clustersList)) {
      return []
    }

    return clustersList
      .map(item => {
        const cluster = this.clusterList.find(_item => _item.name === item.name)
        if (!isEmpty(cluster)) {
          return {
            label: cluster.name,
            value: cluster.name,
            type: cluster._origin.isHost ? 'host' : 'member',
          }
        }
        return null
      })
      .filter(item => !isEmpty(item))
  }

  handleSelectResource = async ({ name, type, isCopy, ...params }) => {
    const createTime = params.createTime
    const start = params.start

    if (name === this.active.name && type === this.active.type) {
      return
    }

    if (type === 'workspaces') {
      this.clusters = this.getClustersList(name)
      this.cluster = get(this.clusters, '[0].value', '')
    }

    await this.getCurrentMeterData({
      name,
      type,
      isTime: true,
      ...params,
      createTime,
      start,
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

          feeData[item.type] = {
            value: parseFloat(get(item, 'fee', 0)).toFixed(2),
            unit: {
              label: this.priceConfig.currency === 'USD' ? t('$') : t('￥'),
            },
          }
        }
      })
    }
    return { sumData, feeData }
  }

  @action
  setCluster = async value => {
    this.cluster = value
    this.loading = true

    const { name, type, createTime } = this.active
    const currentData = this.list.find(item => item.name === name)

    await this.getCurrentMeterData({
      name,
      type,
      isCopy: true,
      ...toJS(this.timeRange),
      isTime: true,
      createTime,
      labelSelector: get(currentData, 'labelSelector', ''),
    })

    this.loading = false
  }

  @action
  setActiveCrumb = ({ name, type, createTime, isCopy, start }) => {
    const lastCrumbData = last(this.crumbData)
    lastCrumbData.type = type
    lastCrumbData.name = name
    lastCrumbData.createTime = createTime
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
    createTime,
    isTime,
    start,
  }) => {
    this.active = { name, type, createTime, start }
    this.tableData = []
    this.pieChartData = []
    this.timeRange = {}
    this.setActiveCrumb({
      name,
      type,
      isCopy: !!isCopy,
      createTime,
      start,
    })

    const params = this.getMeterParamsByCrumb()

    this.loading = true

    const meterData = await this.setMeterData({
      module: type,
      valueKey: 'currentMeterData',
      meters: 'all',
      resources: [name],
      start: handleStrTimeToX(start),
      isTime,
      params,
    })

    this.tableData = this.setLineChartColor(meterData)

    this.setTimeRange({ isTime, start: handleStrTimeToX(start) })

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

      if (!isEmpty(toJS(this.tableData))) {
        await this.getResourceMeterData(get(this.tableData, '[0].type', 'cpu'))
      }
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
    valueKey,
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

    const { sumData, feeData } = this.getSumMeterData(result)

    this[valueKey] = {
      sumData,
      feeData,
    }

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
  getChildrenData = async ({
    name,
    type,
    createTime,
    start,
    labelSelector,
  }) => {
    const lastCrumbData = last(this.crumbData)

    this.loading = true
    this.sideLoading = true

    if (type === 'workspaces' && name !== lastCrumbData.name) {
      this.clusters = this.getClustersList(name)
      this.cluster = get(this.clusters, '[0].value', '')
    }

    this.setActiveCrumb({
      name,
      type,
      isCopy: true,
      createTime,
      start,
    })

    const childrenList = await this.getChildrenList({
      labelSelector,
      currentType: type,
    })

    if (!isEmpty(childrenList) && isArray(childrenList)) {
      const childrenType = childrenList[0].type

      const parentType = last(this.crumbData)
      const params = this.getMeterParamsByCrumb()

      await this.setMeterData({
        params,
        meters: 'all',
        module: parentType.type,
        resources: [parentType.name],
        start: handleStrTimeToX(start),
        valueKey: 'parentMeterData',
        isTime: true,
      })

      this.crumbData.push({
        type: childrenType,
        name: childrenList[0].name,
        list: childrenList,
        createTime: childrenList[0].createTime,
        start: childrenList[0].startTime,
      })

      await this.getCurrentMeterData({
        name: childrenList[0].name,
        type: childrenType,
        isCopy: true,
        isTime: true,
        start: childrenList[0].startTime,
        createTime: childrenList[0].createTime,
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
      this.active.type === 'cluster' ||
      this.active.type === 'workspaces' ||
      isEmpty(toJS(this.priceConfig))
    ) {
      return null
    }

    const length = this.crumbData.length
    const data = this.crumbData[length - 2]

    return (
      <div className={styles.usageCard}>
        <MeterDetailCard
          className={styles.meterCard}
          isParent={true}
          priceConfig={this.priceConfig}
          title={
            <>
              <span>{t(RESOURCE_TITLE[get(data, 'type', '-')])}</span>
              <strong>{get(data, 'name', '-')}</strong>
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
  handleCrumbOperation = async methord => {
    let step = this.crumbData.length - 1
    this.sideLoading = true

    if (methord === 'back') {
      if (step === 0) {
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

      this.setMeterData({
        params,
        meters: 'all',
        module: parentData.type,
        start: handleStrTimeToX(parentData.start),
        resources: [parentData.name],
        valueKey: 'parentMeterData',
        isTime: true,
      })
    }

    const currentItem = currentActive.list.find(
      item => item.name === currentActive.name
    )

    await this.getCurrentMeterData({
      name: currentActive.name,
      type: currentActive.type,
      start: get(currentActive, 'start'),
      createTime: get(currentActive, 'createTime'),
      labelSelector: get(currentItem, 'labelSelector', ''),
      isTime: true,
    })

    this.list = currentActive.list
    this.sideLoading = false
  }

  renderSubResource = () => {
    if (
      this.active.type === 'pods' ||
      this.props.meterType === 'openpitrix' ||
      isUndefined(this.currentMeterData.sumData)
    ) {
      return null
    }
    const pieChartData = toJS(this.pieChartData)

    return (
      <>
        <div className={styles.subTitle}>
          {t('Contains Resources')}
          <Tooltip content={t('METER_RESOURCE_DESC')} placement="top">
            <Icon name="question" size={20} />
          </Tooltip>
        </div>
        <div className={styles.childrenResourceContainer}>
          <Loading spinning={this.resourceLoading}>
            <>
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
            </>
          </Loading>
        </div>
      </>
    )
  }

  render() {
    const { type, name, createTime } = this.active

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
          />

          <SideCard
            list={this.list}
            sideLoading={this.sideLoading}
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
                  {t('Consumption History')}
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
            </>
          </Loading>
        </div>
      </div>
    )
  }
}
