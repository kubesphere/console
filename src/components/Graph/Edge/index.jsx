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
import classNames from 'classnames'
import { get, isUndefined } from 'lodash'

import styles from './index.scss'

export default class Edge extends React.Component {
  constructor(props) {
    super(props)

    this.hoverRef = React.createRef()
  }

  componentDidMount() {
    if (this.hoverRef.current) {
      this.hoverRef.current.addEventListener('mouseover', this.handleMouseover)
      this.hoverRef.current.addEventListener('mouseout', this.handleMouseout)
    }
  }

  componentWillUnmount() {
    if (this.hoverRef.current) {
      this.hoverRef.current.removeEventListener(
        'mouseover',
        this.handleMouseover
      )
      this.hoverRef.current.removeEventListener('mouseout', this.handleMouseout)
    }
  }

  handleMouseover = () => {
    const { data } = this.props
    const ele = document.getElementById(data.data.id)
    ele.classList.add(styles.selected)
  }

  handleMouseout = () => {
    const { data } = this.props
    const ele = document.getElementById(data.data.id)

    ele.classList.remove(styles.selected)
  }

  get traffic() {
    const { data } = this.props
    const traffic = get(data, 'data.traffic')

    const tcp = get(traffic, 'rates.tcp')
    if (!isUndefined(tcp)) {
      return `${tcp} B/s`
    }

    const request_count = get(traffic, 'rates.http', 0)
    return `${request_count} RPS`
  }

  getStatus = () => {
    const { data } = this.props
    const traffic = get(data, 'data.traffic')

    if (!traffic || !traffic.rates) {
      return 'nodata'
    }

    if (traffic.rates.tcp > 0) {
      return 'tcpActive'
    }

    let rate = 0
    let pErr = 0
    if (traffic.rates.http > 0) {
      rate = Number(traffic.rates.http)
      pErr =
        traffic.rates.httpPercentErr > 0
          ? Number(traffic.rates.httpPercentErr)
          : 0
    } else if (traffic.rates.grpc > 0) {
      rate = Number(traffic.rates.grpc)
      pErr =
        traffic.rates.grpcPercentErr > 0
          ? Number(traffic.rates.grpcPercentErr)
          : 0
    }

    if (rate === 0) {
      return 'nodata'
    }
    if (pErr > 20) {
      return 'error'
    }
    if (pErr > 0.1) {
      return 'degrade'
    }

    return 'active'
  }

  getPath = () => {
    const { data } = this.props

    const pointLength = data.position.points.length

    let path

    if (pointLength <= 2) {
      const [start, end] = data.position.points
      const midX = (start.x + end.x) / 2
      const dy = (end.y - start.y) / 4
      path = `M${start.x},${start.y} C${midX},${start.y + dy} ${midX},${end.y -
        dy} ${end.x},${end.y}`
    } else {
      path = data.position.points.reduce((prev, cur) => {
        let ret
        if (prev === '') {
          ret = `M${cur.x},${cur.y}`
        } else if (prev.indexOf('C') !== -1) {
          ret = `${prev}, ${cur.x} ${cur.y}`
        } else {
          ret = `${prev} C${cur.x} ${cur.y}`
        }

        return ret
      }, '')
    }

    return path
  }

  render() {
    const { data, selected } = this.props

    const path = this.getPath()
    const status = this.getStatus()

    const pathClassName = classNames(styles.path, styles[status], {
      [styles.selected]: selected,
    })
    const markerClassName = classNames(styles.marker, styles[status])

    return (
      <g>
        <defs>
          <marker
            id={`triangle-${status}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className={markerClassName} />
          </marker>
          <marker
            id={`dot-${status}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="5"
            markerHeight="5"
          >
            <circle cx="5" cy="5" r="5" className={markerClassName} />
          </marker>
        </defs>
        <path
          className={pathClassName}
          id={data.data.id}
          d={path}
          markerStart={`url(#dot-${status})`}
          markerEnd={`url(#triangle-${status})`}
        />
        <path
          ref={this.hoverRef}
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth="30"
        />
        {['active', 'tcpActive'].includes(status) && (
          <circle r="6" className={markerClassName}>
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath xlinkHref={`#${data.data.id}`} />
            </animateMotion>
          </circle>
        )}
        <text
          width="500"
          className={markerClassName}
          transform="translate(0 -20)"
        >
          <textPath
            xlinkHref={`#${data.data.id}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {this.traffic}
          </textPath>
        </text>
      </g>
    )
  }
}
