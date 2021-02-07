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
import { Icon, Tag, Tooltip } from '@kube-design/components'
import { Text } from 'components/Base'
import { getDisplayName } from 'utils'
import { CLUSTER_GROUP_TAG_TYPE, CLUSTER_PROVIDER_ICON } from 'utils/constants'

import styles from './index.scss'

export default class Card extends Component {
  getIcon() {
    const { data } = this.props

    let icon
    switch (data.type) {
      case 'Cluster':
        icon = 'cluster'
        break
      case 'Workspace':
        icon = 'enterprise'
        break
      case 'Multi-cluster Project':
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

  renderTags() {
    const { data } = this.props
    if (data.type === 'Cluster') {
      return (
        <>
          {data.group && (
            <Tag type={CLUSTER_GROUP_TAG_TYPE[data.group]}>
              {t(`ENV_${data.group.toUpperCase()}`, {
                defaultValue: data.group,
              })}
            </Tag>
          )}
          {data.isHost && <Tag type="warning">{t('Host Cluster')}</Tag>}
        </>
      )
    }

    if (
      globals.app.isMultiCluster &&
      ['Project', 'DevOps'].includes(data.type) &&
      data.cluster &&
      data.cluster.name
    ) {
      return (
        <Tag type={CLUSTER_GROUP_TAG_TYPE[data.cluster.group]}>
          <Icon
            name={CLUSTER_PROVIDER_ICON[data.cluster.provider] || 'kubernetes'}
            size={16}
            type="light"
          />
          &nbsp;
          {getDisplayName(data.cluster)}
        </Tag>
      )
    }

    return null
  }

  render() {
    const { data } = this.props
    return (
      <Link to={data.url}>
        <Text
          className={styles.text}
          icon={this.getIcon()}
          title={getDisplayName(data)}
          description={t(data.type)}
          ellipsis
        />
        <span className={styles.tagWrapper}>{this.renderTags()}</span>
        {data.isFedManaged && (
          <Tooltip
            content={
              <div>
                <div className="tooltip-title">
                  {t('Multi-cluster Deployment')}
                </div>
                <p>{t('MULTI_CLUSTER_TIP')}</p>
              </div>
            }
          >
            <img className={styles.indicator} src="/assets/cluster.svg" />
          </Tooltip>
        )}
      </Link>
    )
  }
}
