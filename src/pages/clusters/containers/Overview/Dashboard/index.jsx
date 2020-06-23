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
import { Columns, Column } from '@pitrix/lego-ui'

import ClusterTitle from 'components/Clusters/ClusterTitle'

import Tools from './Tools'
import ClusterInfo from './ClusterInfo'
import ClusterNodes from './ClusterNodes'
import ResourcesUsage from './ResourcesUsage'
import KubernetesStatus from './KubernetesStatus'
import ServiceComponents from './ServiceComponents'

@inject('clusterStore')
@observer
export default class Dashboard extends React.Component {
  componentDidMount() {
    this.cluster.fetchVersion(this.props.match.params)
  }

  get cluster() {
    return this.props.clusterStore
  }

  render() {
    const { match } = this.props
    const { detail } = this.cluster

    return (
      <div>
        <ClusterTitle
          className="margin-b12"
          cluster={detail}
          size="large"
          noStatus
        />
        <Columns>
          <Column>
            {globals.app.isMultiCluster && (
              <ClusterInfo cluster={detail} version={this.cluster.version} />
            )}
            <ServiceComponents cluster={match.params.cluster} />
            <ResourcesUsage cluster={match.params.cluster} />
            <Tools cluster={match.params.cluster} />
          </Column>
          <Column className="is-narrow is-4">
            <KubernetesStatus cluster={match.params.cluster} />
            <ClusterNodes cluster={match.params.cluster} />
          </Column>
        </Columns>
      </div>
    )
  }
}
