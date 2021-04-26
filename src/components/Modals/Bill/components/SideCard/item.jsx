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

import { Icon, Checkbox, Tag } from '@kube-design/components'
import classnames from 'classnames'
import { Text, Indicator } from 'components/Base'

import { get, isEmpty } from 'lodash'
import { CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'
import styles from './item.scss'
import BillIcon from '../BillIcon'

export default function Card({
  data,
  active,
  getCurrentMeterData,
  getChildrenData,
  getCheckData,
  noIcon,
  style,
  loading,
  isCheck,
  clusterList,
}) {
  const {
    icon,
    status,
    desc,
    name,
    type,
    labelSelector,
    disabled = false,
  } = data

  const isActive = isEmpty(active)
    ? false
    : active.name === name && active.type === type

  const isLast = type === 'pods'

  const handleChildrenClick = (e, value) => {
    e.stopPropagation()
    noIcon === true || loading ? null : getChildrenData(value)
  }

  const handleClick = () => {
    noIcon === true
      ? null
      : getCurrentMeterData({
          name,
          type,
          labelSelector,
        })
  }

  const renderCluster = nsname => {
    if (type !== 'workspaces' || clusterList.length < 1) {
      return null
    }

    const clusters = globals.app.isMultiCluster
      ? nsname === 'system-workspace'
        ? clusterList
        : get(data, '_origin.clusters', [])
      : get(data, '_origin.clusters', [])

    const _clusters = clusters
      .map(item => {
        const _item = clusterList.find(cluster => cluster.name === item.name)
        return _item || null
      })

      .filter(item => !!item)

    if (_clusters.length < 1) {
      return null
    }

    return (
      <div className={styles.tagContainer}>
        {_clusters.map(cluster => (
          <Tag
            key={cluster.name}
            type={CLUSTER_GROUP_TAG_TYPE[cluster._origin.group]}
          >
            <Icon name={cluster.icon || 'kubernetes'} size={16} type="light" />
            {cluster.name}
          </Tag>
        ))}
      </div>
    )
  }

  const renderCheckbox = () => {
    return !noIcon ? (
      <div className={styles.checkContainer} onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={isCheck}
          onClick={() => getCheckData({ name, type })}
        />
      </div>
    ) : null
  }

  const renderArrow = () => {
    return isLast || noIcon ? null : (
      <div
        className={styles.symbol}
        onClick={e =>
          handleChildrenClick(e, {
            name,
            type,
            labelSelector,
          })
        }
      >
        <Icon
          name="chevron-right"
          type={isActive ? 'light' : 'dark'}
          size={20}
        />
      </div>
    )
  }

  return (
    <div
      className={classnames(styles.billCard, {
        [styles.selected]: isActive,
        [styles.noHover]: noIcon,
        [styles.disabled]: disabled,
      })}
      style={style}
      onClick={disabled ? null : handleClick}
    >
      {renderCheckbox()}

      <div className={styles.info}>
        <div className={styles.title}>
          <Indicator type={status} className={styles.indicator} />
          <BillIcon name={name} isActive={isActive} icon={icon} type={type} />
        </div>
        <div className={styles.desc}>
          <Text title={name} description={desc} />
        </div>
        {renderCluster(name)}
        {disabled ? (
          <div className={styles.unMeter}>{t('INVALID_METERING')}</div>
        ) : null}
      </div>
      {renderArrow()}
    </div>
  )
}
