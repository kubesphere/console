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

import { Icon, Tag, Tooltip } from '@kube-design/components'
import { keyBy } from 'lodash'
import React, { Component } from 'react'
import { getDisplayNameNew } from 'utils'
import { CLUSTER_GROUP_TAG_TYPE, CLUSTER_PROVIDER_ICON } from 'utils/constants'

import styles from './index.scss'

export default class ClusterWrapper extends Component {
  renderItem = (item, index, isTooltip = false) => {
    const clusterMap = keyBy(this.props.clustersDetail, 'name')
    const { children } = this.props

    const cluster = clusterMap[item.name] || item
    return (
      <span
        className={isTooltip ? styles.tagItem : ''}
        title={getDisplayNameNew(cluster, false)}
      >
        <Tag
          key={cluster.name}
          type={!isTooltip ? CLUSTER_GROUP_TAG_TYPE[cluster.group] : 'info'}
        >
          <Icon
            name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
            size={16}
            type="light"
          />
          {children ? children(cluster) : getDisplayNameNew(cluster)}
        </Tag>
      </span>
    )
  }

  renderItem1 = (item, index) => {
    return this.renderItem(item, index, false)
  }

  renderTooltip = (item, index) => {
    return this.renderItem(item, index, true)
  }

  render() {
    const { clusters = [] } = this.props
    const rest = clusters.slice(2)
    const showClusters = clusters.slice(0, 2)

    return (
      <div className={styles.wrapper}>
        <div className={styles.tags}>
          {showClusters.map(this.renderItem1)}
          {rest.length ? (
            <Tooltip
              content={
                <div className={'flexbox items-center'}>
                  {rest.map(this.renderTooltip)}
                </div>
              }
            >
              <Tag type={'primary'}>{clusters.length}</Tag>
            </Tooltip>
          ) : null}
          {clusters.length === 0 && '-'}
        </div>
      </div>
    )
  }
}
