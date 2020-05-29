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
import WorkspaceMonitorStore from 'stores/monitoring/workspace'

import { Columns, Column, Loading } from '@pitrix/lego-ui'
import { Card } from 'components/Base'
import Info from 'components/Cards/Info'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class ResourceStatistics extends React.Component {
  constructor(props) {
    super(props)

    this.workspace = props.workspace
    this.monitorStore = new WorkspaceMonitorStore()
    this.fetchData()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  fetchData = async () => {
    this.monitorStore.fetchStatistics(this.workspace)
  }

  getLink = routeName => {
    const actions = globals.app.getActions({
      module: routeName,
      workspace: this.workspace,
    })

    if (actions.includes('view') || actions.includes('manage')) {
      return `/workspaces/${this.workspace}/${routeName}`
    }

    return null
  }

  getMetrics = () => {
    const data = toJS(this.monitorStore.statistics.data)
    const metrics = {}

    Object.entries(data).forEach(([key, value]) => {
      metrics[key] = get(value, 'data.result[0].value[1]', 0)
    })

    return metrics
  }

  render() {
    const { isLoading } = this.monitorStore.statistics
    const metrics = this.getMetrics()

    return (
      <Loading spinning={isLoading}>
        <Card className={styles.card}>
          <Columns>
            <Column>
              <Info
                icon={ICON_TYPES['projects']}
                desc={t('Projects')}
                title={metrics.workspace_namespace_count}
                url={this.getLink('projects')}
                size="large"
              />
            </Column>
            {globals.app.hasKSModule('devops') && (
              <Column>
                <Info
                  icon={ICON_TYPES['devops']}
                  desc={t('DevOps Projects')}
                  title={metrics.workspace_devops_project_count}
                  url={this.getLink('devops')}
                  size="large"
                />
              </Column>
            )}

            <Column>
              <Info
                icon={ICON_TYPES['roles']}
                desc={t('Roles')}
                title={metrics.workspace_role_count}
                url={this.getLink('roles')}
                size="large"
              />
            </Column>
            <Column>
              <Info
                icon={ICON_TYPES['members']}
                desc={t('Workspace Members')}
                title={metrics.workspace_member_count}
                url={this.getLink('members')}
                size="large"
              />
            </Column>
          </Columns>
        </Card>
      </Loading>
    )
  }
}
