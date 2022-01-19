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
import { observer, inject } from 'mobx-react'
import { Button, Loading } from '@kube-design/components'
import EmptyList from 'components/Cards/EmptyList'
import TimeSelector from 'components/Cards/Monitoring/Controller/TimeSelector'
import { getTimeRange, getMinuteValue } from 'stores/monitoring/base'

import Graph from 'components/Graph'
import styles from './index.scss'

@inject('detailStore')
@observer
class TrafficManangement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isGraphLoading: true,
      duration: 60,
      autoFetch: false,
    }

    this.store = props.detailStore
    this.module = props.module
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    this.unmount = true
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  getData() {
    const { cluster, namespace, name } = this.props.match.params
    const { duration } = this.state
    this.setState({ isGraphLoading: true })
    this.store
      .fetchGraph({ cluster, namespace, app: name, duration })
      .then(() => {
        if (!this.unmount) {
          this.setState({ isGraphLoading: false })
        }
      })
  }

  handleRefresh = () => {
    this.getData()
  }

  handleAutoFetch = () => {
    const { autoFetch } = this.state
    this.setState({ autoFetch: !autoFetch }, () => {
      if (this.state.autoFetch) {
        this.interval = setInterval(() => {
          this.getData()
        }, 10000)
      } else {
        this.interval && clearInterval(this.interval)
      }
    })
  }

  handleLookbackChange = ({ step, times, ...rest }) => {
    const { start, end } = getTimeRange({ step: getMinuteValue(step), times })
    const _start = rest.start || start
    const _end = rest.end || end
    const duration = Math.floor(_end - _start)

    this.setState({ duration }, () => {
      this.getData()
    })
  }

  operations = () => {
    const { autoFetch } = this.state
    return (
      <div className={styles.operations}>
        <TimeSelector
          className={styles.timeSelect}
          onChange={this.handleLookbackChange}
          showStep={false}
          dark
          arrowIcon="chevron-down"
          step="1m"
          times={1}
        />
        <Button
          type="flat"
          icon={autoFetch ? 'pause' : 'start'}
          onClick={this.handleAutoFetch}
        />
        <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
      </div>
    )
  }

  renderHeader = () => {
    return (
      <div className={styles.cardHeader}>
        {this.operations()}
        {t('TRAFFIC_MONITORING')}
      </div>
    )
  }

  renderContent() {
    const { isGraphLoading } = this.state
    const { data, health } = this.store.graph

    if (!isEmpty(data) && !isEmpty(data.nodes)) {
      return (
        <div className={styles.main}>
          <Graph
            className={styles.graph}
            data={data}
            health={health}
            store={this.store}
            loading={isGraphLoading}
            onFetch={this.handleRefresh}
          />
        </div>
      )
    }

    if (isGraphLoading) {
      return <Loading className={styles.loading} />
    }

    return (
      <EmptyList
        className={styles.emptyList}
        image="/assets/traffic-management.svg"
        title={t('NO_DATA')}
        desc={t('TRAFFIC_MONITORING_UNAVAILABLE_DESC')}
      />
    )
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderContent()}
      </>
    )
  }
}

export default TrafficManangement
