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

import { Button, Icon, Loading } from '@kube-design/components'
import EmptyList from 'components/Cards/EmptyList'
import TimeSelector from 'components/Cards/Monitoring/Controller/TimeSelector'
import Graph from 'components/Graph'
import ClusterSelect from 'fedprojects/components/ClusterSelect'
import { get, isEmpty } from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { getMinuteValue, getTimeRange } from 'stores/monitoring/base'
import styles from './index.scss'

@inject('detailStore', 'projectStore')
@observer
class TrafficManagement extends React.Component {
  constructor(props) {
    super(props)

    const clusters = get(this.props.projectStore, 'detail.clusters', [])
    const selectCluster =
      clusters.find(item => get(item, 'configz.servicemesh')) ||
      clusters[0] ||
      {}

    this.state = {
      cluster: selectCluster,
      isGraphLoading: true,
      duration: 60,
      autoFetch: false,
    }

    this.store = props.detailStore
    this.module = props.module
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getData()
    }, 10000)

    this.getData()
  }

  componentWillUnmount() {
    this.unmount = true
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  getData() {
    const { selector } = this.store.detail
    const { namespace } = this.props.match.params
    const { cluster, duration } = this.state

    if (!cluster || !get(cluster, 'configz.servicemesh')) {
      return
    }

    if (selector) {
      this.setState({ isGraphLoading: true })
      this.store.resourceStore
        .fetchGraph({ cluster: cluster.name, namespace, selector, duration })
        .then(() => {
          if (!this.unmount) {
            this.setState({ isGraphLoading: false })
          }
        })
    }
  }

  handleRefresh = () => {
    this.getData()
  }

  handleClusterChange = cluster => {
    this.setState({ cluster }, () => {
      this.getData()
    })
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
    const { isGraphLoading, cluster } = this.state
    const { data, health } = this.store.resourceStore.graph

    if (!cluster || !get(cluster, 'configz.servicemesh')) {
      return (
        <EmptyList
          image="/assets/traffic-management.svg"
          title={t('TRAFFIC_MANAGEMENT_UNAVAILABLE')}
          desc={t('APPLICATION_GOVERNANCE_NOT_ENABLED')}
        />
      )
    }

    if (!isEmpty(data) && !isEmpty(data.nodes)) {
      return (
        <div className={styles.main}>
          <Graph
            data={data}
            health={health}
            store={this.store.resourceStore}
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
        image="/assets/traffic-management.svg"
        title={t('NO_DATA')}
        desc={t('TRAFFIC_MONITORING_UNAVAILABLE_DESC')}
        actions={<Button onClick={this.handleRefresh}>{t('REFRESH')}</Button>}
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
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    )
  }
}

export default TrafficManagement
