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
import { line, curveBasis } from 'd3-shape'

import styles from './index.scss'

export default class index extends Component {
  render() {
    const { data = {} } = this.props

    const spline = line()
      .curve(curveBasis)
      .x(d => d.x)
      .y(d => d.y)

    const id = data.v + data.w

    return (
      <g className={styles.wrapper}>
        <defs>
          <marker
            id={`triangle-${id}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <path d={spline(data.points)} markerEnd={`url(#triangle-${id})`} />
      </g>
    )
  }
}
