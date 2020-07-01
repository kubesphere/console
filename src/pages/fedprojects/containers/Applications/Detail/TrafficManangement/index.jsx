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
import { observer, inject } from 'mobx-react'
import { Loading, Icon } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import Graph from 'components/Graph'
import EmptyList from 'components/Cards/EmptyList'
import ClusterSelect from 'fedprojects/components/ClusterSelect'

import styles from './index.scss'

@inject('detailStore', 'projectStore')
@observer
class TrafficManangement extends React.Component {
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
    const { selector } = this.store.detail.resource
    const { namespace } = this.props.match.params
    const { cluster } = this.state

    if (!cluster || !get(cluster, 'configz.servicemesh')) {
      return
    }

    if (selector) {
      this.setState({ isGraphLoading: true })
      this.store.resourceStore
        .fetchGraph({ cluster: cluster.name, namespace, selector })
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

  renderContent() {
    const { isGraphLoading, cluster } = this.state
    const { data, health } = this.store.resourceStore.graph

    if (!cluster || !get(cluster, 'configz.servicemesh')) {
      return (
        <EmptyList
          image="/assets/traffic-management.svg"
          title={t('Temporarily unable to use traffic management')}
          desc={t('TRAFFIC_MANAGEMENT_NO_MICROSERVICE_TIP')}
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
        title={t('Temporarily unable to use traffic management')}
        desc={t(
          'The app has not received the request for a long time, please visit the app and try traffic management'
        )}
        actions={<Button onClick={this.handleRefresh}>{t('Refresh')}</Button>}
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
            ? t('Microservice enabled')
            : t('Microservice not enabled')}
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
        {this.renderContent()}
      </div>
    )
  }
}

export default TrafficManangement
