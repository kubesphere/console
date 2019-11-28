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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, isArray, flatten } from 'lodash'

import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'

import { Icon, Loading } from '@pitrix/lego-ui'
import { Card, Button } from 'components/Base'
import TimeSelector from './TimeSelector'

import styles from './index.scss'

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
    }

    this.init()
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.step !== this.props.step ||
      nextProps.times !== this.props.times ||
      nextProps.createTime !== this.props.createTime
    ) {
      this.initParams(nextProps)
      this.fetchData()
    }
    return true
  }

  componentWillUnmount() {
    stopAutoRefresh(this)
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
    this.props.onFetch({
      ...this.params,
      ...params,
    })
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
      <Button className={styles.button} onClick={this.handleAutoRefresh}>
        <Icon type="light" name={autoRefresh ? 'pause' : 'start'} size={20} />
      </Button>
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
        <TimeSelector
          step={step}
          times={times}
          onChange={this.handleChange}
          onToggle={this.handleToggle}
        />
        {this.renderAutoRefresh()}
        <Button className={styles.button} onClick={this.handleRefresh}>
          <Icon type="light" name="refresh" size={20} />
        </Button>
        {this.renderCustomActions()}
      </div>
    )
  }

  renderTitle() {
    const title = this.props.title || t('Monitoring')
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
          empty={t('NO_RESOURCE', { resource: t('monitoring data') })}
          isEmpty={this.props.isEmpty}
        >
          <div className={styles.content}>{this.renderContent()}</div>
        </Card>
      </Loading>
    )
  }
}
