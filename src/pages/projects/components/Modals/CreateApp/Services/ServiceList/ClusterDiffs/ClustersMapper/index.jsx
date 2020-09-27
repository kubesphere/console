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
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class ClustersMapper extends Component {
  isOverride = name => {
    const { overrides } = this.props

    if (!overrides) {
      return false
    }

    return overrides.some(ord => ord.clusterName === name)
  }

  render() {
    const { clusters, children } = this.props

    return (
      <div className={styles.wrapper}>
        {clusters.map(({ name }) => {
          const selected = this.isOverride(name)
          return (
            <div
              key={name}
              className={classNames(styles.cluster, {
                [styles.selected]: selected,
              })}
            >
              <div className={styles.title}>
                <Icon name="kubernetes" type="light" size={20} />
                <span>{name}</span>
              </div>
              <div>{children({ cluster: name, selected })}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
