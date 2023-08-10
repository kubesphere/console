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
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { Icon } from '@kube-design/components'
import { Indicator } from 'components/Base'
import { getSuitableValue } from 'utils/monitoring'

import styles from './index.scss'

export default class Item extends React.Component {
  handleLinkClick = () => {
    localStorage.setItem('pod-detail-referrer', `${this.props.prefix}/pods`)
  }

  render() {
    const { data, prefix } = this.props
    const { type } = data.podStatus
    const url = `${prefix}/pods/${data.name}`
    return (
      <li>
        <div className={styles.icon}>
          <Icon name="pod" size={24} />
          <Indicator
            type={type.toLowerCase()}
            className={styles.status}
            flicker
          />
        </div>
        <Link to={url}>
          <span onClick={this.handleLinkClick}>{data.name}</span>
        </Link>
        <div className={styles.metric}>
          <Icon name="memory" size={20} />
          <div>
            {getSuitableValue(get(data, 'metrics.memory.value[1]'), 'memory')}
          </div>
        </div>
        <div className={styles.metric}>
          <Icon name="cpu" size={20} />
          <div>
            {getSuitableValue(get(data, 'metrics.cpu.value[1]'), 'cpu')}
          </div>
        </div>
      </li>
    )
  }
}
