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

import { isEmpty } from 'lodash'
import React from 'react'
import { toJS, when } from 'mobx'
import { observer, inject } from 'mobx-react'
import { joinSelector } from 'utils'

import { Button, Icon, Select } from '@kube-design/components'
import TracingCard from 'projects/components/Cards/Tracing'
import TracingDetail from 'projects/components/Modals/TracingDetail'

import TimeSelector from 'components/Cards/Monitoring/Controller/TimeSelector'
import { getTimeRange, getMinuteValue } from 'stores/monitoring/base'

import ServiceStore from 'stores/service'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Tracing extends React.Component {
  constructor(props) {
    super(props)

    this.detailStore = props.detailStore

    this.serviceStore = new ServiceStore()

    const { start, end } = getTimeRange({
      step: getMinuteValue('5m'),
      times: 60,
    })

    this.state = {
      showDetailModal: false,
      selectItem: {},
      serviceName: '',
      query: {
        limit: 5,
        start: start * 1000,
        end: end * 1000,
      },
    }
  }

  componentDidMount() {
    this.disposer = when(
      () => !isEmpty(this.detailStore.detail),
      () => this.getData()
    )
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer()
    }
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
    const { selector, cluster, namespace } = toJS(this.detailStore.detail)
    if (selector) {
      const params = {
        cluster,
        namespace,
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
    const { cluster, namespace } = toJS(this.detailStore.detail)
    const query = {
      cluster,
      namespace,
      service: this.state.serviceName,
      ...this.state.query,
    }
    this.detailStore.fetchTracing(query)
  }

  showDetailModal = data => {
    this.setState({ showDetailModal: true, selectItem: data })
  }

  hideDetailModal = () => {
    this.setState({ showDetailModal: false, selectItem: {} })
  }

  handleServiceChange = value => {
    this.setState({ serviceName: value }, () => {
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
          onChange={this.handleLookbackChange}
          showStep={false}
          dark
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
    const { tracing, isTracingLoading } = this.detailStore
    const { isLoading, data } = this.serviceStore.list

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

  render() {
    return (
      <div>
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
