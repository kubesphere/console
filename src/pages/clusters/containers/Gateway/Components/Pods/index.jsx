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
import { reaction, toJS } from 'mobx'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'
import {
  Button,
  Level,
  LevelLeft,
  LevelRight,
  Pagination,
  Loading,
  InputSearch,
} from '@kube-design/components'

import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'
import GatewayMonitorStore from 'stores/monitoring/gateway'
import WebSocketStore from 'stores/websocket'
import ObjectMapper from 'utils/object.mapper'
import { joinSelector } from 'utils'
import { Panel } from 'components/Base'
import PodItem from './Item'

import styles from './index.scss'

const MetricTypes = {
  cpu: 'ingress_request_cpu_usage',
  memory: 'ingress_request_memory_bytes',
}

@observer
export default class PodsCard extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    title: PropTypes.string,
    detail: PropTypes.object,
    details: PropTypes.object,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    onPage: PropTypes.func,
    limit: PropTypes.number,
  }

  static defaultProps = {
    title: 'PODS',
    detail: {},
    details: {},
    hideHeader: false,
    hideFooter: false,
    onPage() {},
  }

  constructor(props) {
    super(props)

    this.store = props.store
    this.monitorStore = new GatewayMonitorStore()
    this.websocket = new WebSocketStore()

    this.state = {
      expandItem: '',
      params: props.params,
    }
  }

  initWebsocket = () => {
    const { selector, namespace, getReplica } = this.props
    const { params } = this.state

    const labelSelector = joinSelector(selector)
    const url = `api/v1/watch${
      params ? `/klusters/${params.cluster}` : ''
    }/namespaces/${namespace}/pods?labelSelector=${labelSelector}`

    if (url && namespace && labelSelector) {
      this.websocket.watch(url)

      this.disposer && this.disposer()

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.object.kind === 'Pod') {
            if (message.type === 'MODIFIED') {
              const data = {
                cluster: params.cluster,
                ...ObjectMapper.pods(toJS(message.object)),
              }
              this.store.podList.updateItem(data)
              getReplica && getReplica()
            } else if (message.type === 'DELETED' || message.type === 'ADDED') {
              this.fetchData({ silent: true })
              getReplica && getReplica()
            }
          }
        }
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { detail, params, selector, namespace } = this.props
    const initWs =
      selector !== prevProps.selector || namespace !== prevProps.namespace
    if (detail !== prevProps.detail) {
      this.setState(
        {
          expandItem: '',
          params: params || {},
        },
        () => {
          this.fetchData()
        }
      )
    }

    if (initWs) {
      this.initWebsocket()
    }
  }

  componentDidMount() {
    this.fetchData()
    startAutoRefresh(this, {
      method: 'fetchMetrics',
      leading: false,
    })
  }

  componentWillUnmount() {
    stopAutoRefresh(this)
    this.disposer && this.disposer()
  }

  fetchData = async ({ noMetrics, silent, ...params } = {}) => {
    if (isEmpty(this.state.params)) {
      this.store.podList.isLoading = false
      return
    }

    const { limit } = this.props
    silent && (this.store.podList.silent = true)

    await this.store.getGatewayPodsList({
      limit,
      ...this.state.params,
      ...params,
    })
    this.store.podList.silent = false

    if (!noMetrics) {
      this.fetchMetrics()
    }
  }

  fetchMetrics = (params = {}) => {
    const { data, isLoading } = this.store.podList

    if (isEmpty(data) || isLoading || isEmpty(this.state.params)) return false
    this.monitorStore.fetchMetrics({
      step: '1m',
      times: 30,
      resources: data.map(item => item.name),
      metrics: Object.values(MetricTypes),
      ...this.state.params,
      ...params,
    })
  }

  getPagination = () => {
    const { page, limit, total } = this.store.podList
    const pagination = { page, limit, total }
    return pagination
  }

  getPodMetrics = () => {
    const data = this.monitorStore.data
    const metrics = {}

    Object.entries(MetricTypes).forEach(([key, value]) => {
      const records = get(data, `${value}.data.result`) || []
      metrics[key] = records[0]
    })

    return metrics
  }

  handleSearch = value => {
    this.searchValue = value
    this.fetchData({
      search: value,
    })
  }

  handleRefresh = () => {
    const params = this.searchValue ? { search: this.searchValue } : {}
    this.fetchData(params)
  }

  handlePage = page => {
    this.fetchData({ page }).then(() => {
      this.props.onPage(page)
    })
  }

  handleExpand = uid => {
    this.setState(({ expandItem }) => ({
      expandItem: expandItem === uid ? '' : uid,
    }))
  }

  getClustersOptions = () => {
    const { clusters } = this.props
    return clusters.map(cluster => ({
      label: cluster,
      value: cluster,
    }))
  }

  renderHeader = () => {
    return (
      <div className={styles.header}>
        <InputSearch
          className={styles.search}
          name="search"
          placeholder={t('SEARCH')}
          onSearch={this.handleSearch}
        />
        <div className={styles.actions}>
          <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
        </div>
      </div>
    )
  }

  renderContent() {
    const { prefix } = this.props
    const { data, isLoading, silent } = this.store.podList

    const content = (
      <div className={styles.body}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('NO_RESOURCE_FOUND')}</div>
        ) : (
          data.map(pod => (
            <PodItem
              key={pod.uid}
              prefix={prefix}
              detail={pod}
              metrics={this.getPodMetrics(pod)}
              loading={this.monitorStore.isLoading}
              refreshing={this.monitorStore.isRefreshing}
              isExpand={this.state.expandItem === pod.uid}
              onExpand={this.handleExpand}
            />
          ))
        )}
      </div>
    )

    return !silent ? <Loading spinning={isLoading}>{content}</Loading> : content
  }

  renderFooter = () => {
    const pagination = this.getPagination()
    const { total } = pagination

    return (
      <Level className={styles.footer}>
        <LevelLeft>{t('TOTAL_ITEMS', { num: total })}</LevelLeft>
        <LevelRight>
          <Pagination {...pagination} onChange={this.handlePage} />
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { className, title, hideHeader, hideFooter, noWrapper } = this.props
    const { data } = this.store.podList

    if (noWrapper) {
      return this.renderContent()
    }

    return (
      <Panel
        className={classnames(styles.main, className)}
        title={t(title)}
        empty={t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('Pod') })}
        isEmpty={isEmpty(data)}
      >
        {!hideHeader && this.renderHeader()}
        {this.renderContent()}
        {!hideFooter && this.renderFooter()}
      </Panel>
    )
  }
}
