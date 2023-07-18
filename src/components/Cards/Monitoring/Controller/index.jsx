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

import { Button, Icon, Loading, Select } from '@kube-design/components'
import classnames from 'classnames'
import { Card } from 'components/Base'
import { flatten, get, isArray, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { showNameAndAlias } from 'utils'

import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'

import styles from './index.scss'
import TimeSelector from './TimeSelector'

export default class MonitoringController extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    step: PropTypes.string,
    times: PropTypes.number,
    createTime: PropTypes.string,
    onFetch: PropTypes.func,
    loading: PropTypes.bool,
    refreshing: PropTypes.bool,
    isEmpty: PropTypes.bool,
    enableAutoRefresh: PropTypes.bool,
    customAction: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  }

  static defaultProps = {
    step: '10m',
    times: 50,
    createTime: '',
    onFetch() {},
    loading: false,
    refreshing: false,
    isEmpty: false,
    enableAutoRefresh: true,
    customAction: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      active: false,
      enableAutoRefresh: props.enableAutoRefresh,
      autoRefresh: false,
      cluster: get(props, 'clusters[0].name', ''),
    }

    this.init()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.step !== this.props.step ||
      prevProps.times !== this.props.times ||
      prevProps.createTime !== this.props.createTime
    ) {
      this.initParams(this.props)
      this.fetchData()
    }
  }

  componentWillUnmount() {
    stopAutoRefresh(this)
  }

  get clusters() {
    return this.props.clusters.map(cluster => ({
      label: showNameAndAlias(cluster.name || cluster, 'cluster'),
      value: cluster.name || cluster,
    }))
  }

  init() {
    this.initParams(this.props)
    this.fetchData()
  }

  initParams = (props = {}) => {
    const { times, step, createTime } = props || {}
    const params = {
      times,
      step,
    }

    if (createTime) {
      const create = new Date(createTime).valueOf() / 1000
      const now = Date.now() / 1000
      const interval = now - create

      switch (true) {
        // half an hour
        case interval <= 1800:
          params.times = 30
          params.step = '1m'
          break
        // an hour
        case interval <= 3600:
          params.times = 60
          params.step = '1m'
          break
        // five hours
        case interval <= 3600 * 5:
          params.times = 60
          params.step = '5m'
          break
        default:
          break
      }
    }

    this.params = params
  }

  fetchData = (params = {}) => {
    const { cluster } = this.state
    const query = {
      ...this.params,
      ...params,
    }
    if (cluster) {
      query.cluster = cluster
    }
    this.props.onFetch(query)
  }

  handleChange = data => {
    this.params = data

    const enableAutoRefresh =
      !data.start && !data.end && this.props.enableAutoRefresh
    this.setState({ enableAutoRefresh, autoRefresh: false }, () => {
      stopAutoRefresh(this)
      this.fetchData()
    })
  }

  handleClusterChange = cluster => {
    this.setState({ cluster }, () => {
      this.fetchData()
    })
  }

  handleRefresh = () => {
    this.fetchData()
  }

  handleAutoRefresh = () => {
    this.setState({ autoRefresh: !this.state.autoRefresh }, () => {
      const { autoRefresh } = this.state
      autoRefresh ? startAutoRefresh(this) : stopAutoRefresh(this)
    })
  }

  handleToggle = active => {
    this.setState({ active })
  }

  renderAutoRefresh() {
    const { enableAutoRefresh, autoRefresh } = this.state

    if (!enableAutoRefresh) return null

    return (
      <Button
        className={styles.button}
        type="control"
        icon={autoRefresh ? 'pause' : 'start'}
        iconType="light"
        onClick={this.handleAutoRefresh}
      ></Button>
    )
  }

  renderCustomActions() {
    const { customAction } = this.props

    return customAction || null
  }

  renderOperations() {
    const { active } = this.state
    const { step, times } = this.params

    return (
      <div
        className={classnames(styles.operations, {
          [styles.active]: active,
        })}
      >
        {this.props.isFederated && (
          <Select
            key={this.state.cluster}
            prefixIcon={<Icon name="cluster" />}
            className={styles.clusters}
            value={this.state.cluster}
            options={this.clusters}
            onChange={this.handleClusterChange}
          />
        )}
        <TimeSelector
          step={step}
          times={times}
          onChange={this.handleChange}
          onToggle={this.handleToggle}
        />
        {this.renderAutoRefresh()}
        <Button
          className={styles.button}
          type="control"
          icon="refresh"
          iconType="light"
          onClick={this.handleRefresh}
        ></Button>
        {this.renderCustomActions()}
      </div>
    )
  }

  renderTitle() {
    const title = this.props.title || t('MONITORING')
    return (
      <div className={styles.title}>
        <span>{title}</span>
        {this.renderOperations()}
      </div>
    )
  }

  renderContent() {
    const { children } = this.props

    if (isEmpty(children)) return null

    if (isArray(children) && isEmpty(flatten(children).filter(item => item)))
      return null

    return children
  }

  render() {
    const { loading } = this.props
    const { active } = this.state

    return (
      <Loading spinning={loading}>
        <Card
          className={classnames(styles.card, {
            [styles.showDropDown]: active,
          })}
          title={this.renderTitle()}
          empty={t('NO_MONITORING_DATA')}
          isEmpty={this.props.isEmpty}
        >
          <div className={styles.content}>{this.renderContent()}</div>
        </Card>
      </Loading>
    )
  }
}
