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

import { isEmpty } from 'lodash'

import Rule from 'fedprojects/containers/Routes/Detail/ResourceStatus/Rule'

import styles from './index.scss'

export default class IngressCard extends Component {
  render() {
    const { prefix, gateway, detail } = this.props

    const tls = detail.tls || []

    if (isEmpty(detail.rules)) {
      return null
    }

    return (
      <div className={styles.wrapper}>
        {detail.rules.map(rule => (
          <Rule
            key={rule.host}
            tls={tls}
            rule={rule}
            gateway={gateway}
            prefix={prefix}
          />
        ))}
      </div>
    )
  }
}
