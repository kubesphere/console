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
import { parse } from 'qs'
import { joinSelector } from 'utils'

import { Select } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import TracingCard from 'projects/components/Cards/Tracing'
import TracingDetail from 'projects/components/Modals/TracingDetail'

import ServiceSelect from './ServiceSelect'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Tracing extends React.Component {
  constructor(props) {
    super(props)

    this.detailStore = props.detailStore

    const query = parse(location.search.slice(1))

    this.state = {
      showDetailModal: false,
      selectItem: {},
      serviceName: '',
      query: {
        lookback: '1h',
        limit: 5,
      },
      defaultService: query.service,
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
      { label: t('Last {num} records', { num: 5 }), value: 5 },
      { label: t('Last {num} records', { num: 10 }), value: 10 },
      { label: t('Last {num} records', { num: 20 }), value: 20 },
      { label: t('Last {num} records', { num: 50 }), value: 50 },
    ]
  }

  get lookbackOptions() {
    return [
      { label: t('Last {hour} hour', { hour: 1 }), value: '1h' },
      { label: t('Last {hour} hours', { hour: 2 }), value: '2h' },
      { label: t('Last {hour} hours', { hour: 3 }), value: '3h' },
      { label: t('Last {hour} hours', { hour: 6 }), value: '6h' },
      { label: t('Last {hour} hours', { hour: 12 }), value: '12h' },
      { label: t('Last {hour} hours', { hour: 24 }), value: '24h' },
      { label: t('Last {day} days', { day: 2 }), value: '2d' },
    ]
  }

  getData() {
    const { selector, cluster, namespace } = toJS(this.detailStore.detail)
    if (selector) {
      const params = {
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      }

      this.detailStore.serviceStore.fetchListByK8s(params).then(() => {
        const components = toJS(this.detailStore.serviceStore.list.data)
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

  handleServiceChange = service => {
    this.setState({ serviceName: service.name }, () => {
      this.fetchTracing()
    })
  }

  handleRefresh = () => {
    this.fetchTracing()
  }

  handleLookbackChange = value => {
    this.setState(
      ({ query }) => ({
        query: { ...query, lookback: value },
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

  renderServices() {
    const { isLoading, data } = this.detailStore.serviceStore.list
    return (
      <ServiceSelect
        defaultService={this.state.defaultService}
        options={toJS(data)}
        isLoading={isLoading}
        onChange={this.handleServiceChange}
      />
    )
  }

  renderOperations() {
    const { query } = this.state
    return (
      <div className={styles.operations}>
        <Select
          value={query.lookback}
          options={this.lookbackOptions}
          onChange={this.handleLookbackChange}
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
    const { isLoading, data } = this.detailStore.serviceStore.list

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
        {this.renderServices()}
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
