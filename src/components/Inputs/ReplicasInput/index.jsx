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

export default class ReplicasInput extends React.Component {
  handleUp = () => {
    const { value, onChange } = this.props
    onChange && onChange(value + 1)
  }

  handleDown = () => {
    const { value, onChange } = this.props
    onChange && onChange(Math.max(value - 1, 1))
  }

  render() {
    const { value, onChange } = this.props

    return (
      <div className={styles.wrapper}>
        <span className={styles.value}>{value}</span>
        <span className={styles.text}>
          <p>
            <strong>{t(value === 1 ? 'REPLICA' : 'REPLICA_PL')}</strong>
          </p>
          <p>{t('GRAYSCALE_REPLICAS_DESC')}</p>
        </span>
        {onChange && (
          <span className={styles.buttons}>
            <Icon name="chevron-up" size={24} onClick={this.handleUp} />
            <Icon name="chevron-down" size={24} onClick={this.handleDown} />
          </span>
        )}
      </div>
    )
  }
}
