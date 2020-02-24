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
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, get, throttle } from 'lodash'

import { joinSelector } from 'utils'
import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'
import PodStore from 'stores/pod'
import PodMonitorStore from 'stores/monitoring/pod'

import {
  Level,
  LevelLeft,
  LevelRight,
  Pagination,
  Loading,
} from '@pitrix/lego-ui'
import { Panel, Search, Button } from 'components/Base'
import PodItem from './Item'

import styles from './index.scss'

const MetricTypes = {
  cpu: 'pod_cpu_usage',
  memory: 'pod_memory_usage_wo_cache',
}

@inject('rootStore')
@observer
export default class PodsCard extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    title: PropTypes.string,
    detail: PropTypes.object,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    onSearch: PropTypes.func,
    onRefresh: PropTypes.func,
    onPage: PropTypes.func,
    limit: PropTypes.number,
  }

  static defaultProps = {
    title: 'Pods',
    detail: {},
    hideHeader: false,
    hideFooter: false,
    onSearch() {},
    onRefresh() {},
    onPage() {},
  }

  constructor(props) {
    super(props)

    this.store = new PodStore()
    this.monitorStore = new PodMonitorStore()

    this.params = this.getParams(props)

    this.websocket = props.rootStore.websocket
    this.initWebsocket()

    this.state = {
      expandItem: '',
    }
  }

  initWebsocket() {
    const { onUpdate } = this.props
    const { namespace, selector } = this.props.detail || {}

    const url = `api/v1/watch/namespaces/${namespace}/pods?labelSelector=${joinSelector(
      selector
    )}`

    if (url && namespace && selector) {
      this.websocket.watch(url)

      this.fetchData = throttle(this.fetchData, 2000)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.object.kind === 'Pod' && message.type === 'MODIFIED') {
            this.fetchData({ noMetrics: true, silent: true }).then(() => {
              onUpdate && onUpdate()
            })
          }
        }
      )
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.detail !== prevProps.detail) {
      this.params = this.getParams(this.props)
      this.fetchData()
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

  getParams = (props = {}) => {
    const { name, namespace, kind, _originData } = props.detail || {}
    const _kind = kind || get(_originData, 'kind', '')
    const result = {}

    if (namespace) {
      result.namespace = namespace
    }

    switch (_kind) {
      case 'PVC':
        result.pvcName = name
        break
      case 'Node':
        result.nodeName = name
        break
      case 'Service':
        result.serviceName = name
        break
      default:
        result.ownerKind = _kind
        result.ownerName = name
    }
    return result
  }

  fetchData = async ({ noMetrics, silent, ...params } = {}) => {
    const { limit } = this.props
    silent && (this.store.list.silent = true)
    await this.store.fetchList({
      limit,
      ...this.params,
      ...params,
    })
    this.store.list.silent = false

    if (!noMetrics) {
      this.fetchMetrics()
    }
  }

  fetchMetrics = (params = {}) => {
    const { data, isLoading } = this.store.list

    if (isEmpty(data) || isLoading) return false

    this.monitorStore.fetchMetrics({
      step: '1m',
      times: 30,
      resources: data.map(item => item.name),
      metrics: Object.values(MetricTypes),
      ...this.params,
      ...params,
    })
  }

  getPagination = () => {
    const { page, limit, total } = this.store.list
    const pagination = { page, limit, total }
    return pagination
  }

  getPodPrefix = (pod = {}) => {
    if (this.props.prefix) {
      return this.props.prefix
    }

    let prefix = `/projects/${pod.namespace}`

    const { name, kind, _originData } = this.props.detail
    const _kind = kind || get(_originData, 'kind', '')
    if (_kind === 'Node') {
      prefix = `/infrastructure/nodes/${name}/projects/${pod.namespace}`
    }

    return prefix
  }

  getPodMetrics = pod => {
    const data = this.monitorStore.data
    const metrics = {}

    Object.entries(MetricTypes).forEach(([key, value]) => {
      const records = get(data, `${value}.data.result`) || []
      metrics[key] = records.find(
        item =>
          get(item, 'metric.resource_name', get(item, 'metric.pod')) ===
          pod.name
      )
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

  handleExpand = name => {
    this.setState(({ expandItem }) => ({
      expandItem: expandItem === name ? '' : name,
    }))
  }

  renderHeader = () => (
    <div className={styles.header}>
      <Search
        className={styles.search}
        name="search"
        placeholder={t('Please input a keyword to filter')}
        onSearch={this.handleSearch}
      />
      <div className={styles.actions}>
        <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
      </div>
    </div>
  )

  renderContent() {
    const { data, isLoading, silent } = this.store.list

    const content = (
      <div className={styles.body}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('RESOURCE_NOT_FOUND')}</div>
        ) : (
          data.map(pod => (
            <PodItem
              key={pod.name}
              prefix={this.getPodPrefix(pod)}
              detail={pod}
              metrics={this.getPodMetrics(pod)}
              loading={this.monitorStore.isLoading}
              refreshing={this.monitorStore.isRefreshing}
              isExpand={this.state.expandItem === pod.name}
              onExpand={this.handleExpand}
            />
          ))
        )}
      </div>
    )

    return !silent ? <Loading spinning={isLoading}>{content}</Loading> : content
  }

  renderFooter = () => {
    const { total, page, limit } = this.getPagination()

    return (
      <Level className={styles.footer}>
        <LevelLeft>{t('TOTAL_ITEMS', { num: total })}</LevelLeft>
        <LevelRight>
          <Pagination
            current={page}
            total={total}
            pageSize={limit}
            onChange={this.handlePage}
          />
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { className, title, hideHeader, hideFooter } = this.props
    const { data, isLoading } = this.store.list

    return (
      <Panel
        className={classnames(styles.main, className)}
        title={t(title)}
        empty={t('NOT_AVAILABLE', { resource: t('Pod') })}
        isEmpty={isEmpty(data)}
        loading={isLoading}
      >
        {!hideHeader && this.renderHeader()}
        {this.renderContent()}
        {!hideFooter && this.renderFooter()}
      </Panel>
    )
  }
}
