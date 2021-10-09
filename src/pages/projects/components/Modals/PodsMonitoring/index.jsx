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
import { toJS, when } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { isEmpty, get } from 'lodash'

import PodMonitorStore from 'stores/monitoring/pod'

import ControllerModal from 'components/Modals/Monitoring/Controller'
import ResourcesList from './Resources'
import ChartsList from './Charts'

import styles from './index.scss'

@observer
export default class MultipleDataModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    defaultChecked: PropTypes.number,
    limit: PropTypes.number,
    config: PropTypes.object,
    onCancel: PropTypes.func,
    module: PropTypes.string,
    name: PropTypes.string,
    namespace: PropTypes.string,
    cluster: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    defaultChecked: 5,
    limit: 10,
    config: {},
    module: 'deployments',
    name: '',
    namespace: '',
    cluster: '',
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      checked: [],
    }

    this.init()
  }

  get monitorOptions() {
    return {
      times: 50,
      step: '5m',
    }
  }

  get name() {
    return 'POD_PL'
  }

  get metrics() {
    return this.monitorStore.data
  }

  get metricType() {
    return this.props.config.metricType
  }

  get resourceParams() {
    const { module, cluster, namespace, name } = this.props

    return {
      cluster,
      namespace,
      workloadKind: module,
      workloadName: name,
    }
  }

  get resources() {
    return toJS(get(this.resourceStore, 'sort', {}))
  }

  get resourcesData() {
    return get(this.resources, `data[${this.metricType}].data.result`, [])
  }

  get monitorsData() {
    return get(this.monitorStore, `data[${this.metricType}].data.result`, [])
  }

  getItemName = item => get(item, 'metric.pod', '-')

  componentDidMount() {
    when(
      () => !isEmpty(this.resourcesData) && isEmpty(this.state.checked),
      () => {
        const { defaultChecked } = this.props
        const checked = this.resourcesData
          .map(item => this.getItemName(item))
          .slice(0, defaultChecked)

        this.setState({ checked })
      }
    )
  }

  init() {
    const store = new PodMonitorStore()
    this.resourceStore = store
    this.monitorStore = store
  }

  fetchResources = async params => {
    await this.resourceStore.fetchSortedMetrics({
      metrics: [this.metricType],
      limit: 20,
      ...this.resourceParams,
      ...params,
    })
  }

  fetchMonitorings = async params => {
    const { checked } = this.state

    await this.monitorStore.fetchMetrics({
      resources: checked,
      metrics: [this.metricType],
      ...this.resourceParams,
      ...params,
    })
  }

  fetchData = async (params = {}) => {
    this.params = params
    await this.fetchResources()
    await this.fetchMonitorings(params)
  }

  handleChangeChecked = check => {
    this.setState({ checked: check }, () => {
      const { checked } = this.state
      const existed = this.monitorsData.map(this.getItemName)

      checked.some(item => {
        if (!existed.includes(item)) {
          this.fetchMonitorings({
            pods: [item],
            more: true,
            ...this.params,
          })
          return true
        }
        return false
      })
    })
  }

  renderCharts() {
    const { config } = this.props
    const { checked } = this.state
    const data = []
    checked.forEach(name => {
      const metrics = this.monitorsData.find(
        item => this.getItemName(item) === name
      )
      if (metrics) {
        data.push(metrics)
      }
    })

    return (
      <ChartsList
        loading={this.monitorStore.isLoading}
        config={config}
        data={data}
      />
    )
  }

  renderResroucesList() {
    const { config } = this.props
    const { checked } = this.state
    const { page, total, isLoading } = this.resources

    return (
      <ResourcesList
        loading={isLoading}
        config={config}
        name={this.name}
        page={page}
        total={total}
        checked={checked}
        data={this.resourcesData}
        onFetch={this.fetchResources}
        onChange={this.handleChangeChecked}
      />
    )
  }

  render() {
    const { isLoading, isRefreshing } = this.monitorStore
    const { visible, onCancel } = this.props

    return (
      <ControllerModal
        visible={visible}
        onFetch={this.fetchData}
        onCancel={onCancel}
        loading={isLoading}
        refreshing={isRefreshing}
        {...this.monitorOptions}
      >
        <div className={styles.content}>
          {this.renderResroucesList()}
          {this.renderCharts()}
        </div>
      </ControllerModal>
    )
  }
}
