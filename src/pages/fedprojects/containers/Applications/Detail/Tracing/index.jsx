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

import { isEmpty, get } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { joinSelector } from 'utils'

import { Button, Select, Icon } from '@kube-design/components'

import EmptyList from 'components/Cards/EmptyList'
import TracingCard from 'projects/components/Cards/Tracing'
import TracingDetail from 'projects/components/Modals/TracingDetail'
import ClusterSelect from 'fedprojects/components/ClusterSelect'
import TimeSelector from 'components/Cards/Monitoring/Controller/TimeSelector'
import { getTimeRange, getMinuteValue } from 'stores/monitoring/base'

import ServiceStore from 'stores/service'

import styles from './index.scss'

@inject('detailStore', 'projectStore')
@observer
export default class Tracing extends React.Component {
  constructor(props) {
    super(props)

    this.detailStore = props.detailStore
    this.resourceStore = this.detailStore.resourceStore

    this.serviceStore = new ServiceStore()

    const query = parse(location.search.slice(1))

    const clusters = get(this.props.projectStore, 'detail.clusters', [])
    const selectCluster =
      clusters.find(item => get(item, 'configz.servicemesh')) ||
      clusters[0] ||
      {}

    const { start, end } = getTimeRange({
      step: getMinuteValue('5m'),
      times: 60,
    })

    this.state = {
      cluster: selectCluster,
      showDetailModal: false,
      selectItem: {},
      serviceName: '',
      query: {
        limit: 5,
        start: start * 1000,
        end: end * 1000,
      },
      defaultService: query.service,
    }
  }

  componentDidMount() {
    this.getData()
  }

  get limitOptions() {
    return [
      { label: t('LAST_NUM_RECORDS', { num: 5 }), value: 5 },
      { label: t('LAST_NUM_RECORDS', { num: 10 }), value: 10 },
      { label: t('LAST_NUM_RECORDS', { num: 20 }), value: 20 },
      { label: t('LAST_NUM_RECORDS', { num: 50 }), value: 50 },
    ]
  }

  get services() {
    return this.serviceStore.list.data.map(item => ({
      label: item.name,
      value: item.name,
      type: item.type,
    }))
  }

  getData() {
    const { selector, namespace } = this.detailStore.detail
    const { cluster } = this.state

    if (!cluster || !get(cluster, 'configz.servicemesh')) {
      return
    }

    if (selector) {
      const params = {
        namespace,
        cluster: cluster.name,
        labelSelector: joinSelector(selector),
      }

      this.serviceStore.fetchListByK8s(params).then(() => {
        const components = toJS(this.serviceStore.list.data)
        if (components.length > 0) {
          this.setState({ serviceName: components[0].name }, () =>
            this.fetchTracing()
          )
        }
      })
    }
  }

  fetchTracing = () => {
    const { namespace } = toJS(this.detailStore.detail)
    const { cluster } = this.state

    if (!cluster || !get(cluster, 'configz.servicemesh')) {
      return
    }

    const query = {
      namespace,
      cluster: cluster.name,
      service: this.state.serviceName,
      ...this.state.query,
    }
    this.resourceStore.fetchTracing(query)
  }

  showDetailModal = data => {
    this.setState({ showDetailModal: true, selectItem: data })
  }

  hideDetailModal = () => {
    this.setState({ showDetailModal: false, selectItem: {} })
  }

  handleClusterChange = cluster => {
    this.setState({ cluster }, () => {
      this.getData()
    })
  }

  handleServiceChange = service => {
    this.setState({ serviceName: service }, () => {
      this.fetchTracing()
    })
  }

  handleRefresh = () => {
    this.fetchTracing()
  }

  handleLookbackChange = ({ step, times, ...rest }) => {
    const { start, end } = getTimeRange({ step: getMinuteValue(step), times })
    const _start = (rest.start || start) * 1000
    const _end = (rest.end || end) * 1000

    this.setState(
      ({ query }) => ({
        query: { ...query, start: _start, end: _end },
      }),
      () => this.fetchTracing()
    )
  }

  handleLimitChange = value => {
    this.setState(
      ({ query }) => ({
        query: { ...query, limit: value },
      }),
      () => this.fetchTracing()
    )
  }

  serviceRenderer = option => (
    <span>{t('SERVICE_VALUE', { value: option.label })}</span>
  )

  renderOperations() {
    const { query } = this.state
    return (
      <div className={styles.operations}>
        <Select
          options={this.services}
          value={this.state.serviceName}
          prefixIcon={<Icon name="appcenter" />}
          onChange={this.handleServiceChange}
          valueRenderer={this.serviceRenderer}
        />

        <TimeSelector
          className={styles.timeSelect}
          dark
          onChange={this.handleLookbackChange}
          showStep={false}
          arrowIcon="chevron-down"
        />
        <Select
          value={query.limit}
          options={this.limitOptions}
          onChange={this.handleLimitChange}
        />
        <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
      </div>
    )
  }

  renderTracing() {
    const { cluster } = this.state
    const { tracing, isTracingLoading } = this.resourceStore
    const { isLoading, data } = this.serviceStore.list

    if (!cluster || !get(cluster, 'configz.servicemesh')) {
      return (
        <EmptyList
          image="/assets/traffic-management.svg"
          title={t('TRACING_UNAVAILABLE')}
          desc={t('APPLICATION_GOVERNANCE_NOT_ENABLED')}
        />
      )
    }

    if (!isLoading && isEmpty(data)) {
      return null
    }

    return (
      <TracingCard
        loading={isTracingLoading}
        data={tracing.data}
        operations={this.renderOperations()}
        onItemClick={this.showDetailModal}
      />
    )
  }

  renderMicroServiceTip = cluster => {
    const isServiceMeshEnabled = get(cluster, 'configz.servicemesh')
    return (
      <span className={styles.tag}>
        <Icon
          name={isServiceMeshEnabled ? 'success' : 'exclamation'}
          color={
            isServiceMeshEnabled
              ? {
                  primary: '#00aa72',
                  secondary: '#90e0c5',
                }
              : {
                  primary: '#d0a406',
                  secondary: '#f0c426',
                }
          }
        />
        &nbsp;
        <span>
          {isServiceMeshEnabled
            ? t('APPLICATION_GOVERNANCE_ENABLED')
            : t('APPLICATION_GOVERNANCE_DISABLED')}
        </span>
      </span>
    )
  }

  render() {
    const { clusters } = this.props.projectStore.detail
    return (
      <div>
        <ClusterSelect
          value={this.state.cluster}
          options={clusters}
          onChange={this.handleClusterChange}
          extra={this.renderMicroServiceTip}
        />
        {this.renderTracing()}
        <TracingDetail
          detail={this.state.selectItem}
          visible={this.state.showDetailModal}
          onCancel={this.hideDetailModal}
        />
      </div>
    )
  }
}
