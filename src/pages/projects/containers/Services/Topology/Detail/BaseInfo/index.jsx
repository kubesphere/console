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
import { get, isEmpty } from 'lodash'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class BaseInfo extends Component {
  getValue(item) {
    if (item.type === 'datetime') {
      return getLocalTime(item.value).format(`YYYY-MM-DD HH:mm:ss`)
    }
    return item.value
  }

  render() {
    const metadata = get(this.props.detail, 'metadata', [])

    if (isEmpty(metadata)) {
      return null
    }

    return (
      <div className={styles.info}>
        <div>Info</div>
        {metadata.map(item => (
          <dl key={item.id}>
            <dt>{item.label}</dt>
            <dd>{this.getValue(item)}</dd>
          </dl>
        ))}
      </div>
    )
  }
}
