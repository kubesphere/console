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

import { Icon, Tag } from '@kube-design/components'
import classNames from 'classnames'
import StatusReason from 'clusters/components/StatusReason'
import { Indicator } from 'components/Base'
import { get } from 'lodash'
import { PropTypes } from 'prop-types'
import React, { Component } from 'react'
import { showNameAndAlias } from 'utils'
import { CLUSTER_GROUP_TAG_TYPE, CLUSTER_PROVIDER_ICON } from 'utils/constants'

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
      isExpired = false,
    } = this.props

    if (!cluster) {
      return null
    }

    const isReady = get(cluster.conditions, 'Ready.status') === 'True'

    const sizeVal = this.iconSizeMap[size]

    return (
      <div
        className={classNames(
          styles.wrapper,
          styles[theme],
          styles[size],
          className
        )}
      >
        <div className={styles.icon} style={{ height: sizeVal }}>
          <Icon
            name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
            size={sizeVal}
            type={theme}
          />
          {isExpired ? (
            <Indicator className={styles.indicator} type="error" />
          ) : (
            !noStatus &&
            isReady && <Indicator className={styles.indicator} status="ready" />
          )}
        </div>
        <div className={styles.title}>
          <div className={styles.name}>
            {onClick ? (
              <a title={showNameAndAlias(cluster)} onClick={onClick}>
                {showNameAndAlias(cluster)}
              </a>
            ) : (
              <span title={showNameAndAlias(cluster)}>
                {showNameAndAlias(cluster)}
              </span>
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
            {cluster.isHost && (
              <Tag
                className={classNames('margin-l12', tagClass)}
                type="warning"
              >
                {t('HOST_CLUSTER')}
              </Tag>
            )}
            &nbsp;
            {size === 'small' && !noStatus && !isReady && (
              <StatusReason data={cluster} />
            )}
          </div>
          <div className={styles.description}>
            {isExpired ? (
              <p className={styles.isExpired}>
                <Icon
                  name="information"
                  size="15"
                  color={{ primary: '#ffffff', secondary: '#ab2f29' }}
                />
                {t('KUBE_CONFIG_IS_EXPIRED')}
              </p>
            ) : isReady || noStatus ? (
              <p
                className={classNames('ellipsis', styles.ellipsis)}
                title={cluster.description}
              >
                {cluster.description || '-'}
              </p>
            ) : (
              <StatusReason data={cluster} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
