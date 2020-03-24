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
import { observer, inject } from 'mobx-react'

import { renderRoutes } from 'utils/router.config'

import { Banner, Nav } from 'components/Base'
import { Loading } from '@pitrix/lego-ui'

import MonitoringStore from 'stores/monitoring/base'

import styles from './index.scss'

@inject('rootStore')
@observer
class ClusterStability extends React.Component {
  constructor(props) {
    super(props)

    if (!this.props.rootStore.monitoring) {
      const monitoringStore = new MonitoringStore()
      this.props.rootStore.register('monitoring', monitoringStore)
    }
  }

  componentDidMount() {
    this.props.rootStore.monitoring.checkEtcd()
  }

  filterRoute(route) {
    const routes = route.routes.filter(
      item => !item.requireETCD || this.props.rootStore.monitoring.supportETCD
    )
    return { routes }
  }

  renderBanner() {
    const { route, match } = this.props

    return (
      <div className={styles.banner}>
        <Banner
          type="purple"
          icon="linechart"
          rightIcon="/assets/banner-icon-1.svg"
          name={t('Cluster Status Monitoring')}
          desc={t('MONITORING_CLUSTER_DESC')}
        />
        <Nav route={this.filterRoute(route)} match={match} />
      </div>
    )
  }

  render() {
    const { route } = this.props

    return (
      <Loading spinning={this.props.rootStore.monitoring.etcdChecking}>
        <div className={styles.wrapper}>
          {this.renderBanner()}
          <div className={styles.main}>{renderRoutes(route.routes)}</div>
        </div>
      </Loading>
    )
  }
}

export default ClusterStability
