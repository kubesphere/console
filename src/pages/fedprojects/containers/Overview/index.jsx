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
import { Columns, Column } from '@kube-design/components'
import { get } from 'lodash'

import BaseInfo from './BaseInfo'
import ResourceUsage from './ResourceUsage'
import UsageRanking from './UsageRanking'
import LimitRange from './LimitRange'
import Help from './Help'

@inject('rootStore', 'projectStore')
@observer
export default class Overview extends React.Component {
  state = {
    cluster: get(this.project, 'detail.clusters[0].name'),
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get namespace() {
    return get(this.props.match, 'params.namespace')
  }

  get workspace() {
    return get(this.props.match, 'params.workspace')
  }

  get project() {
    return this.props.projectStore
  }

  get clusters() {
    return this.project.detail.clusters.map(cluster => ({
      label: cluster.name,
      value: cluster.name,
    }))
  }

  handleClusterChange = cluster => {
    this.setState({ cluster })
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'project-settings',
      ...this.props.match.params,
      project: this.namespace,
    })
  }

  render() {
    const { detail } = this.project

    const clusterProps = {
      cluster: this.state.cluster,
      clusters: this.clusters,
      onClusterChange: this.handleClusterChange,
    }

    return (
      <div>
        <div className="h3 margin-b12">{t('OVERVIEW')}</div>
        <Columns>
          <Column className="is-8">
            <BaseInfo
              className="margin-b12"
              detail={detail}
              workspace={this.workspace}
            />
            {this.enabledActions.includes('edit') && (
              <LimitRange match={this.props.match} />
            )}
            <ResourceUsage match={this.props.match} {...clusterProps} />
          </Column>
          <Column className="is-4">
            <Help className="margin-b12" />
            <UsageRanking match={this.props.match} {...clusterProps} />
          </Column>
        </Columns>
      </div>
    )
  }
}
