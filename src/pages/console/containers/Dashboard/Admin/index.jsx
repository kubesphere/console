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
import { inject, observer } from 'mobx-react'
import { get } from 'lodash'
import { Loading } from '@kube-design/components'
import { Panel, Text } from 'components/Base'

import PlatformMonitorStore from 'stores/monitoring/platform'

import PlatformStatus from './PlatformStatus'
import History from './History'

import styles from './index.scss'

const MetricTypes = {
  cluster_count: 'kubesphere_cluser_count',
  workspace_count: 'kubesphere_workspace_count',
  account_count: 'kubesphere_user_count',
  app_template_count: 'kubesphere_app_template_count',
}

@inject('rootStore')
@observer
export default class AdminDashboard extends React.Component {
  monitorStore = new PlatformMonitorStore()

  componentDidMount() {
    this.monitorStore.fetchMetrics({
      metrics: Object.values(MetricTypes),
    })
  }

  handleClusterClick = () => {
    this.props.rootStore.routing.push('/clusters')
  }

  render() {
    const { isLoading } = this.monitorStore
    const clusterCount = get(
      this.monitorStore.data,
      `${MetricTypes.cluster_count}.data.result[0].value[1]`
    )
    return (
      <Loading spinning={isLoading}>
        <>
          <Panel className={styles.info} title={t('Platform Info')}>
            <Text
              title={get(globals, 'config.version.kubesphere')}
              description={t('Platform Version')}
            />
            {globals.app.isMultiCluster ? (
              <Text
                title={clusterCount}
                description={t('Cluster Number')}
                onClick={this.handleClusterClick}
              />
            ) : (
              <Text
                title={1}
                description={t('Cluster Number')}
                onClick={this.handleClusterClick}
              />
            )}
          </Panel>
          <Panel className={styles.status} title={t('Platform Status')}>
            <PlatformStatus metrics={this.monitorStore.data} />
          </Panel>
          <Panel title={t('Recent Visit')}>
            <History />
          </Panel>
        </>
      </Loading>
    )
  }
}
