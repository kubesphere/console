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
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, has, get, throttle } from 'lodash'
import {
  Button,
  Icon,
  Level,
  LevelLeft,
  LevelRight,
  Pagination,
  Loading,
  Select,
  InputSearch,
} from '@kube-design/components'

import { joinSelector } from 'utils'
import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'
import ObjectMapper from 'utils/object.mapper'
import PodStore from 'stores/pod'
import PodMonitorStore from 'stores/monitoring/pod'
import WebSocketStore from 'stores/websocket'

import { Panel } from 'components/Base'
import PodItem from './Item'

import styles from './index.scss'

const MetricTypes = {
  cpu: 'pod_cpu_usage',
  memory: 'pod_memory_usage_wo_cache',
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
    isFederated: PropTypes.bool,
    onSearch: PropTypes.func,
    onRefresh: PropTypes.func,
    onPage: PropTypes.func,
    limit: PropTypes.number,
  }

  static defaultProps = {
    title: 'Pods',
    detail: {},
    details: {},
    hideHeader: false,
    hideFooter: false,
    isFederated: false,
    onSearch() {},
    onRefresh() {},
    onPage() {},
  }

  constructor(props) {
    super(props)

    this.store = new PodStore()
    this.monitorStore = new PodMonitorStore()

    const selectCluster = props.isFederated
      ? get(props, 'clusters[0]')
      : props.detail.cluster

    this.state = {
      expandItem: '',
      selectCluster: selectCluster || '',
      params: this.getParams(selectCluster),
    }

    this.websocket = new WebSocketStore()
    this.initWebsocket()
  }

  initWebsocket() {
    const { selectCluster, params = {} } = this.state
    const { namespace, labelSelector } = params

    const url = `api/v1/watch${
      selectCluster ? `/klusters/${selectCluster}` : ''
    }/namespaces/${namespace}/pods?labelSelector=${labelSelector}`

    if (url && namespace && labelSelector) {
      this.websocket.watch(url)

      this.fetchData = throttle(this.fetchData, 2000)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.object.kind === 'Pod') {
            if (message.type === 'MODIFIED') {
              const data = {
                cluster: selectCluster,
                ...ObjectMapper.pods(toJS(message.object)),
              }
              this.store.list.updateItem(data)
            } else if (message.type === 'DELETED' || message.type === 'ADDED') {
              this.fetchData({ silent: true })
            }
          }
        }
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { detail, details, isFederated } = this.props
    if (
      detail !== prevProps.detail ||
      (isFederated &&
        Object.keys(details).length !== Object.keys(prevProps.details).length)
    ) {
      const selectCluster = isFederated
        ? get(this.props, 'clusters[0]')
        : detail.cluster

      this.setState(
        {
          expandItem: '',
          selectCluster: selectCluster || '',
          params: this.getParams(selectCluster),
        },
        () => {
          this.fetchData()
          this.initWebsocket()
        }
      )
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

  getParams = cluster => {
    const { detail, details, isFederated } = this.props
    const _detail = isFederated ? details[cluster] : detail
    const { name, namespace, kind: _kind, selector, _originData } =
      _detail || {}
    const kind = _kind || get(_originData, 'kind', '')

    let result = {}

    if (cluster) {
      result.cluster = cluster
    }

    if (namespace) {
      result.namespace = namespace
    }

    switch (kind) {
      case 'PVC':
        result.pvcName = name
        break
      case 'Node':
        result.nodeName = name
        break
      case 'Namespace':
        result.namespace = name
        break
      case 'Service':
      case 'IPPool':
        result.labelSelector = joinSelector(selector)
        break
      default:
        result.ownerKind = kind === 'Deployment' ? 'ReplicaSet' : kind
        result.labelSelector = joinSelector(selector)
    }

    if (has(result, 'labelSelector') && isEmpty(selector)) {
      result = {}
    }

    return result
  }

  fetchData = async ({ noMetrics, silent, ...params } = {}) => {
    if (isEmpty(this.state.params)) {
      this.store.list.isLoading = false
      return
    }

    const { limit } = this.props
    silent && (this.store.list.silent = true)
    await this.store.fetchList({
      limit,
      ...this.state.params,
      ...params,
    })
    this.store.list.silent = false

    if (!noMetrics) {
      this.fetchMetrics()
    }
  }

  fetchMetrics = (params = {}) => {
    const { data, isLoading } = this.store.list

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
    const { page, limit, total } = this.store.list
    const pagination = { page, limit, total }
    return pagination
  }

  getPodMetrics = pod => {
    const data = this.monitorStore.data
    const metrics = {}

    Object.entries(MetricTypes).forEach(([key, value]) => {
      const records = get(data, `${value}.data.result`) || []
      metrics[key] = records.find(item => get(item, 'metric.pod') === pod.name)
    })
    return metrics
  }

  handleSearch = value => {
    this.searchValue = value
    this.fetchData({
      name: value,
    }).then(() => {
      this.props.onSearch(value)
    })
  }

  handleRefresh = () => {
    const params = this.searchValue ? { name: this.searchValue } : {}

    this.fetchData(params).then(() => {
      const { onSearch, onRefresh } = this.props
      isEmpty(params) ? onRefresh() : onSearch(this.searchValue)
    })
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

  handleClusterChange = cluster => {
    this.setState(
      { selectCluster: cluster, params: this.getParams(cluster) },
      () => {
        this.fetchData()
        this.initWebsocket()
      }
    )
  }

  renderHeader = () => {
    const { isFederated } = this.props
    const { selectCluster } = this.state
    return (
      <div className={styles.header}>
        {isFederated && (
          <Select
            name="cluster"
            prefixIcon={<Icon name="cluster" />}
            className={styles.cluster}
            value={selectCluster}
            options={this.getClustersOptions()}
            onChange={this.handleClusterChange}
          />
        )}
        <InputSearch
          className={styles.search}
          name="search"
          placeholder={t('Filter by keyword')}
          onSearch={this.handleSearch}
        />
        <div className={styles.actions}>
          <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
        </div>
      </div>
    )
  }

  renderContent() {
    const { prefix, isFederated } = this.props
    const { data, isLoading, silent } = this.store.list
    const { selectCluster } = this.state

    const content = (
      <div className={styles.body}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('RESOURCE_NOT_FOUND')}</div>
        ) : (
          data.map(pod => (
            <PodItem
              key={pod.uid}
              prefix={
                isFederated ? `${prefix}/clusters/${selectCluster}` : prefix
              }
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
    const { data } = this.store.list

    if (noWrapper) {
      return this.renderContent()
    }

    return (
      <Panel
        className={classnames(styles.main, className)}
        title={t(title)}
        empty={t('NOT_AVAILABLE', { resource: t('Pod') })}
        isEmpty={isEmpty(data)}
      >
        {!hideHeader && this.renderHeader()}
        {this.renderContent()}
        {!hideFooter && this.renderFooter()}
      </Panel>
    )
  }
}
