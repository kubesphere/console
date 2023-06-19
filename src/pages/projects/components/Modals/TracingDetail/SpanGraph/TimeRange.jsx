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

import { formatDuration, COORD_COUNT } from 'utils/tracing'

import styles from './index.scss'

export default class TimeRange extends React.Component {
  constructor(props) {
    super(props)

    this.svg = React.createRef()

    this.originX = -1

    this.state = {
      viewStart: props.viewRange.viewStart,
      viewEnd: props.viewRange.viewEnd,
    }
  }

  componentDidUpdate(prevProps) {
    const { viewRange } = this.props

    if (viewRange.viewStart !== prevProps.viewRange.viewStart) {
      this.setState({ viewStart: viewRange.viewStart })
    }

    if (viewRange.viewEnd !== prevProps.viewRange.viewEnd) {
      this.setState({ viewEnd: viewRange.viewEnd })
    }
  }

  componentDidMount() {
    if (this.svg && this.svg.current) {
      this.svg.current.addEventListener('mousedown', this.handleMouseDown)
      this.svg.current.addEventListener('mousemove', this.handleMouseMove)
      this.svg.current.addEventListener('mouseup', this.handleMouseUp)
      this.svg.current.addEventListener('mouseleave', this.handleMouseLeave)
      this.svgBound = this.svg.current.getBoundingClientRect()
      this.cursorGuide = this.svg.current.querySelector('[name="cursor-guide"]')
    }
  }

  componentWillUnmount() {
    if (this.svg && this.svg.current) {
      this.svg.current.removeEventListener('mousedown', this.handleMouseDown)
      this.svg.current.removeEventListener('mousemove', this.handleMouseMove)
      this.svg.current.removeEventListener('mouseup', this.handleMouseUp)
      this.svg.current.removeEventListener('mouseleave', this.handleMouseLeave)
    }
  }

  handleMouseDown = e => {
    this.originX = e.x
    this.hideCursorGuide()

    const { left, width } = this.svgBound
    const cursorPos = Math.max(e.x - left, 0) / width

    this.setState({ viewStart: cursorPos, viewEnd: cursorPos })
  }

  handleMouseUp = () => {
    this.originX = -1
    const { viewStart, viewEnd } = this.state
    if (Math.abs(viewStart - viewEnd) > 0.01) {
      this.props.onRangeChange({ viewStart, viewEnd })
    }
  }

  handleMouseLeave = () => {
    this.hideCursorGuide()
  }

  handleMouseMove = e => {
    if (this.originX > -1) {
      const { left, width } = this.svgBound
      const cursorPos = Math.max(e.x - left, 0) / width
      if (cursorPos > this.state.viewStart) {
        this.setState({ viewEnd: cursorPos })
      } else {
        this.setState({ viewStart: cursorPos })
      }
    } else {
      this.showCursorGuide(e)
    }
  }

  handleClear = () => {
    this.props.onRangeChange({
      viewStart: 0,
      viewEnd: 1,
    })
  }

  showCursorGuide = e => {
    if (this.cursorGuide) {
      const { left, width } = this.svgBound
      const cursorPos = Math.max(e.x - left, 0) / width
      const cursorPosition = `${cursorPos * 100}%`
      for (let i = 0; i < this.cursorGuide.children.length; i++) {
        this.cursorGuide.children[i].setAttribute('x1', cursorPosition)
        this.cursorGuide.children[i].setAttribute('x2', cursorPosition)
        this.cursorGuide.children[i].setAttribute('stroke-opacity', 1)
      }
    }
  }

  hideCursorGuide = () => {
    if (this.cursorGuide) {
      for (let i = 0; i < this.cursorGuide.children.length; i++) {
        this.cursorGuide.children[i].setAttribute('stroke-opacity', 0)
      }
    }
  }

  getCoords() {
    const { data } = this.props
    const duration = data.duration
    const split = (duration / COORD_COUNT).toFixed(2)
    const coordPercent = 100 / COORD_COUNT
    const coords = []

    for (let i = 0; i < COORD_COUNT; i++) {
      coords.push({
        value: i * split,
        percent: `${i * coordPercent}%`,
      })
    }
    coords.push({ value: duration, percent: '100%' })

    return coords
  }

  render() {
    const { viewStart, viewEnd } = this.state

    const hasRangeSelect = viewStart > 0 && viewEnd < 1

    const viewStartPercent = `${viewStart * 100}%`
    const viewEndPercent = `${viewEnd * 100}%`

    const coords = this.getCoords()

    return (
      <div className={styles.range}>
        <svg height="100%" width="100%" ref={this.svg}>
          <g className={styles.coord}>
            {coords.map((coord, index) => (
              <g key={coord.value} className={styles.coordLine}>
                <line y1="0%" y2="100%" x1={coord.percent} x2={coord.percent} />
                <text
                  x={coord.percent}
                  y={12}
                  transform={
                    index === COORD_COUNT ? 'translate(-2,0)' : 'translate(2,0)'
                  }
                  textAnchor={index === COORD_COUNT ? 'end' : 'start'}
                >
                  {formatDuration(coord.value)}
                </text>
              </g>
            ))}
          </g>
          <g className={styles.cursorGuide} name="cursor-guide">
            <line
              y1={0}
              y2={58}
              strokeWidth="1"
              stroke="#212b36"
              strokeOpacity="0"
              strokeDasharray="2,2"
            />
            <line
              y1={19}
              y2={41}
              stroke="#242e42"
              strokeWidth="4"
              strokeOpacity="0"
              strokeLinecap="round"
            />
            <line y1={0} y2={58} strokeWidth="20" stroke="transparent" />
          </g>
          {hasRangeSelect && (
            <g className={styles.scrubber}>
              <line
                className={styles.scrubberLine}
                y1="0%"
                y2="100%"
                x1={viewStartPercent}
                x2={viewStartPercent}
              />
              <line
                className={styles.scrubberLine}
                y1="0%"
                y2="100%"
                x1={viewEndPercent}
                x2={viewEndPercent}
              />
            </g>
          )}
        </svg>
        {hasRangeSelect && (
          <>
            <div
              className={styles.hoverBlock}
              style={{ left: 0, width: viewStartPercent }}
            />
            <div
              className={styles.hoverBlock}
              style={{
                left: viewEndPercent,
                width: `${(1 - viewEnd) * 100}%`,
              }}
            />
            <div className={styles.clearBlock} onClick={this.handleClear}>
              {t('CLEAR')}
            </div>
          </>
        )}
      </div>
    )
  }
}
