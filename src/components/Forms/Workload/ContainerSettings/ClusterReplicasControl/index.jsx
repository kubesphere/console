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
import PropTypes from 'prop-types'

import Placement from './Placement'

import styles from './index.scss'

export default class ReplicasContorl extends React.Component {
  static propTypes = {
    template: PropTypes.object,
    value: PropTypes.array,
  }

  static defaultProps = {
    value: [],
  }

  handleChange = (name, newReplicas) => {
    const { onChange, value } = this.props

    value.forEach(item => {
      if (item.name === name) {
        item.replicas = newReplicas
      }
    })

    onChange && onChange(value)
  }

  render() {
    const { value } = this.props
    return (
      <div className={styles.wrapper}>
        {value.map(item => (
          <Placement
            key={item.name}
            cluster={item.name}
            replicas={item.replicas}
            onChange={this.handleChange}
          />
        ))}
      </div>
    )
  }
}
