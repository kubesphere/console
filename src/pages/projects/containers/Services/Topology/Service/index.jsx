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

const SHAPE_ICONS = {
  cloud: 'cloud',
  heptagon: 'appcenter',
}

export default class Service extends Component {
  handleClick = () => {
    const { onClick, data } = this.props
    onClick(data)
  }

  render() {
    const { data, isSelected } = this.props
    const { label, labelMinor, x, y } = data
    const width = 150
    const height = 100

    let internalIP
    if (data && data.metadata) {
      const metadataItem = data.metadata.find(
        item => item.id === 'kubernetes_ip'
      )

      if (metadataItem) {
        internalIP = metadataItem.value
      }
    }

    return (
      <g
        className={styles.wrapper}
        transform={`translate(${x - width / 2}, ${y - height / 2})`}
      >
        <rect width={width} height={height} rx={4} />
        <foreignObject width={width} height={height}>
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className={classNames(styles.service, {
              [styles.selected]: isSelected,
            })}
            onClick={this.handleClick}
          >
            <div className={styles.header}>
              <div className={styles.icon}>
                <Icon name={SHAPE_ICONS[data.shape]} size={40} />
              </div>
              <div className={styles.text}>
                <div className={styles.title} title={label}>
                  {label}
                </div>
                <div className={styles.description}>{labelMinor}</div>
              </div>
            </div>
            <div className={styles.footer}>{internalIP || label}</div>
          </div>
        </foreignObject>
      </g>
    )
  }
}
