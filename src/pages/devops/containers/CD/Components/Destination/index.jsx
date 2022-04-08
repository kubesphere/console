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

import React, { Component } from 'react'
import { Icon, Tag } from '@kube-design/components'
import { keyBy } from 'lodash'
import { CLUSTER_PROVIDER_ICON, CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'

import { inCluster2Default } from 'utils'
import styles from './index.scss'

export default class Destination extends Component {
  render() {
    const clusterMap = keyBy(this.props.clustersDetail, 'name')
    const { destination = {} } = this.props
    const clusterName = inCluster2Default(destination.name)
    const cluster = clusterMap[clusterName] || {}
    const namespace = destination.namespace || ''

    return (
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          <Tag key={cluster.name} type={CLUSTER_GROUP_TAG_TYPE[cluster.group]}>
            <Icon
              name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
              size={16}
              type="light"
            />
            {cluster.name || 'default'}
          </Tag>
          <span>
            <Icon name="project" size={16} type="dark" />
            {namespace}
          </span>
        </div>
      </div>
    )
  }
}
