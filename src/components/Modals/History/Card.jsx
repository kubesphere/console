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
import { Link } from 'react-router-dom'
import { Text, Tag } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'

import styles from './index.scss'

export default class Card extends Component {
  getIcon() {
    const { data } = this.props

    let icon
    switch (data.type) {
      case 'Workspace':
        icon = 'enterprise'
        break
      case 'Project':
        icon = 'project'
        break
      case 'DevOps':
        icon = 'strategy-group'
        break
      default:
    }

    return icon
  }

  render() {
    const { data, onClick } = this.props

    return (
      <Link to={data.url} onClick={onClick}>
        {data.type === 'Cluster' ? (
          <ClusterTitle cluster={data} noStatus />
        ) : (
          <Text
            icon={this.getIcon()}
            title={data.name}
            description={data.description || t(data.type)}
            ellipsis
          />
        )}
        {data.isFedManaged && (
          <Tag className={styles.tag}>{t('MULTI_CLUSTER')}</Tag>
        )}
      </Link>
    )
  }
}
