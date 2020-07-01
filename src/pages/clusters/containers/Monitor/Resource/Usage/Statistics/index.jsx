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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'

import { ICON_TYPES } from 'utils/constants'
import ClusterMonitoringStore from 'stores/monitoring/cluster'

import { Columns, Column, Loading } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import Info from 'components/Cards/Info'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ResourceStatistics extends React.Component {
  constructor(props) {
    super(props)

    this.monitoringStore = new ClusterMonitoringStore({
      cluster: this.cluster,
    })
    this.fetchData()
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = () => {
    this.monitoringStore.fetchStatistics()
  }

  getLink = routeName => {
    const actions = globals.app.getActions({
      module: routeName,
      cluster: this.cluster,
    })
    if (actions.includes('view') || actions.includes('manage')) {
      return `/${routeName}`
    }
    return null
  }

  getMetrics = () => {
    const data = toJS(this.monitoringStore.statistics.data)
    const metrics = {}

    Object.entries(data).forEach(([key, value]) => {
      metrics[key] = get(value, 'data.result[0].value[1]', 0)
    })

    return metrics
  }

  render() {
    const { isLoading } = this.monitoringStore.statistics
    const metrics = this.getMetrics()

    return (
      <Loading spinning={isLoading}>
        <Card className={styles.card}>
          <Columns>
            <Column>
              <Info
                icon={ICON_TYPES['workspaces']}
                desc={t('Workspaces')}
                title={metrics.cluster_workspace_count}
                url={this.getLink('workspaces')}
                size="large"
              />
            </Column>
            <Column>
              <Info
                icon={ICON_TYPES['accounts']}
                desc={t('Accounts')}
                title={metrics.cluster_account_count}
                url={this.getLink('accounts')}
                size="large"
              />
            </Column>
            <Column>
              <Info
                icon={ICON_TYPES['projects']}
                desc={t('Projects')}
                title={metrics.cluster_namespace_count}
                url={this.getLink('projects')}
                size="large"
              />
            </Column>
            {globals.app.hasClusterModule(this.cluster, 'devops') && (
              <Column>
                <Info
                  icon={ICON_TYPES['devops']}
                  desc={t('DevOps Projects')}
                  title={metrics.cluster_devops_project_count}
                  size="large"
                />
              </Column>
            )}
          </Columns>
        </Card>
      </Loading>
    )
  }
}
