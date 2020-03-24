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
import { observer } from 'mobx-react'
import { get } from 'lodash'

import { ICON_TYPES } from 'utils/constants'
import ClusterMonitoringStore from 'stores/monitoring/cluster'

import { Columns, Column, Loading } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import Info from 'components/Cards/Info'

import styles from './index.scss'

@observer
export default class ResourceStatistics extends React.Component {
  constructor(props) {
    super(props)

    this.monitoringStore = new ClusterMonitoringStore()
    this.fetchData()
    this.state = {
      devopsCount: 0,
    }
  }

  fetchData = async () => {
    this.monitoringStore.fetchStatistics()
    if (globals.app.hasKSModule('devops')) {
      const count = await this.monitoringStore.fetchClusterDevopsCount()
      this.setState({ devopsCount: count })
    }
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
                url="/workspaces"
              />
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Info
                icon={ICON_TYPES['projects']}
                desc={t('Projects')}
                title={metrics.cluster_namespace_count}
                url="/projects"
              />
            </Column>
            {globals.app.hasKSModule('devops') && (
              <Column>
                <Info
                  icon={ICON_TYPES['devops']}
                  desc={t('DevOps Projects')}
                  title={this.state.devopsCount}
                />
              </Column>
            )}
          </Columns>
          <Columns>
            <Column>
              <Info
                icon={ICON_TYPES['accounts']}
                desc={t('Accounts')}
                title={metrics.cluster_account_count}
                url="/accounts"
              />
            </Column>
          </Columns>
        </Card>
      </Loading>
    )
  }
}
