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
import { Icon } from '@kube-design/components'

import styles from './index.scss'

const CLASSLISTS = ['A', 'B', 'C', 'D']

export default class CodeStatusCard extends React.PureComponent {
  static defaultProps = {
    hasIcon: false,
    title: '-',
    value: 0,
    url: '',
  }

  render() {
    const { hasIcon, title, value, resultClass, unit, url } = this.props
    const classContent = CLASSLISTS[parseInt(resultClass, 10) - 1]

    return (
      <div className={styles.resultCard}>
        <p className={styles.title}>
          {hasIcon ? <Icon name="debug" size={20} /> : null}
          {title}
          {resultClass ? (
            <span className={styles[classContent]}>{classContent}</span>
          ) : null}
        </p>
        <p className={styles.value}>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer noopener">
              <span>{value}</span>
            </a>
          ) : (
            <span>{value}</span>
          )}
          <span className={styles.unit}>{unit}</span>
        </p>
      </div>
    )
  }
}
