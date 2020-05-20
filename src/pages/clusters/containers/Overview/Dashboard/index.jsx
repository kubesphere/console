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
import { Columns, Column, Icon } from '@pitrix/lego-ui'

import Tools from './Tools'
import ClusterInfo from './ClusterInfo'
import ClusterNodes from './ClusterNodes'
import ResourcesUsage from './ResourcesUsage'
import KubernetesStatus from './KubernetesStatus'
import ServiceComponents from './ServiceComponents'

import styles from './index.scss'

@inject('clusterStore')
@observer
export default class Dashboard extends React.Component {
  get cluster() {
    return this.props.clusterStore
  }

  render() {
    const { match } = this.props
    const { detail } = this.cluster

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {detail.icon && <Icon name={detail.icon} size={48} />}
          <div className={styles.text}>
            <div className="h4">{detail.name}</div>
            <p>{detail.description}</p>
          </div>
        </div>
        <Columns>
          <Column>
            {globals.app.isMultiCluster && <ClusterInfo cluster={detail} />}
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
