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
import styles from './index.scss'

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
}) {
  const { icon, status, desc, name, type, labelSelector, createTime } = data
  const isActive = isEmpty(active)
    ? false
    : active.name === name && active.type === type

  const isLast = type === 'pods'

  const handleChildrenClick = (e, value) => {
    e.stopPropagation()
    noIcon === true || loading ? null : getChildrenData(value)
  }

  const renderCluster = () => {
    if (type !== 'workspaces') {
      return null
    }

    const clusters = get(data, '_origin.clusters', [])

    return (
      <div className={styles.tagContainer}>
        {clusters.map((cluster, index) => (
          <Tag key={index}>
            <Icon name="kubernetes" type="light" size={16} />
            {cluster.name}
          </Tag>
        ))}
      </div>
    )
  }

  return (
    <div
      className={classnames(styles.billCard, {
        [styles.selected]: isActive,
        [styles.noHover]: noIcon,
      })}
      style={style}
      onClick={() => {
        noIcon === true
          ? null
          : getCurrentMeterData({
              name,
              type,
              createTime,
              labelSelector,
            })
      }}
    >
      {!noIcon ? (
        <div
          className={styles.checkContainer}
          onClick={e => e.stopPropagation()}
        >
          <Checkbox checked={isCheck} onClick={() => getCheckData(name)} />
        </div>
      ) : null}

      <div className={styles.info}>
        <div className={styles.title}>
          <Indicator type={status} className={styles.indicator} />
          <Icon name={icon} size={40} type={isActive ? 'light' : 'dark'} />
        </div>
        <div className={styles.desc}>
          <Text title={name} description={desc} />
        </div>
        {renderCluster()}
      </div>
      {isLast || noIcon ? null : (
        <div
          className={styles.symbol}
          onClick={e =>
            handleChildrenClick(e, {
              name,
              type,
              createTime,
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
      )}
    </div>
  )
}
