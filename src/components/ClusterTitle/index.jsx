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

import { get } from 'lodash'
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@pitrix/lego-ui'
import { Tag, Indicator } from 'components/Base'
import StatusReason from 'clusters/components/StatusReason'
import { CLUSTER_PROVIDER_ICON, CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'

import styles from './index.scss'

export default class ClusterTitle extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['dark', 'light']),
    size: PropTypes.oneOf(['normal', 'small', 'large']),
  }

  static defaultProps = {
    theme: 'dark',
    size: 'normal',
  }

  iconSizeMap = {
    large: 48,
    normal: 40,
    small: 20,
  }

  render() {
    const {
      theme,
      size,
      className,
      cluster,
      tagClass,
      noStatus,
      onClick,
    } = this.props

    if (!cluster) {
      return null
    }

    const isReady = get(cluster.conditions, 'Ready.status') === 'True'

    return (
      <div
        className={classNames(
          styles.wrapper,
          styles[theme],
          styles[size],
          className
        )}
      >
        <div className={styles.icon}>
          <Icon
            name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
            size={this.iconSizeMap[size]}
            type={theme}
          />
          {!noStatus && isReady && (
            <Indicator className={styles.indicator} status="ready" />
          )}
        </div>
        <div className={styles.title}>
          <div className={styles.name}>
            {onClick ? (
              <a onClick={onClick}>{cluster.name}</a>
            ) : (
              <span>{cluster.name}</span>
            )}
            {cluster.group && (
              <Tag
                className={classNames('margin-l12', tagClass)}
                type={CLUSTER_GROUP_TAG_TYPE[cluster.group]}
              >
                {t(`ENV_${cluster.group.toUpperCase()}`, {
                  defaultValue: cluster.group,
                })}
              </Tag>
            )}
          </div>
          <div className={styles.description}>
            {isReady || noStatus ? (
              <p className="ellipsis">{cluster.description || '-'}</p>
            ) : (
              <StatusReason data={cluster} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
