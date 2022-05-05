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
import isEqual from 'react-fast-compare'
import { throttle } from 'lodash'

import { Tooltip } from '@kube-design/components'

import styles from './index.scss'

export default class Slider extends React.Component {
  static propTypes = {
    marks: PropTypes.array,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    unit: PropTypes.string,
    onChange: PropTypes.func,
    valueFormatter: PropTypes.func,
  }

  static defaultProps = {
    marks: [],
    value: [0, 0],
    unit: '',
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.totalWeight =
      props.marks.reduce((prev, cur) => prev + (cur.weight || 1), 0) - 1

    this.endPercent = (this.totalWeight * 100) / (this.totalWeight + 1)

    this.state = this.getStateFromProps(props)

    this.ref = React.createRef()

    this.throttleState = []
  }

  getValuePercent(marks, value) {
    let ret = 0
    for (let i = 0; i < marks.length - 1; i++) {
      const markWeight = marks[i].weight || 1
      if (value >= marks[i + 1].value) {
        ret += markWeight / this.totalWeight
      } else if (value >= marks[i].value && value < marks[i + 1].value) {
        const percent =
          (value - marks[i].value) / (marks[i + 1].value - marks[i].value)
        ret += (markWeight * percent) / this.totalWeight
      }
    }

    return ret
  }

  getValueFromPercent(marks, percent) {
    const { valueFormatter } = this.props
    const weight = (this.totalWeight * percent) / 100
    let value = 0

    let usedWeight = 0
    for (let i = 0; i < marks.length - 1; i++) {
      const markWeight = marks[i].weight || 1
      usedWeight += markWeight
      if (usedWeight >= weight && usedWeight < markWeight + weight) {
        const _percent = (weight + markWeight - usedWeight) / markWeight

        value =
          (marks[i + 1].value - marks[i].value) * _percent + marks[i].value
      }
    }

    if (valueFormatter) {
      return Number(valueFormatter(value))
    }

    return Number(value.toFixed(2))
  }

  getStateFromProps(props) {
    const { marks, value } = props

    const left = this.getValuePercent(marks, value[0]) * 100
    const right = this.getValuePercent(marks, value[1]) * 100

    return { left, right }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.value, this.props.value)) {
      const { left, right } = this.getStateFromProps(this.props)
      if (left <= right) {
        this.setState({ left, right })
      }
    }
  }

  componentDidMount() {
    if (this.ref && this.ref.current) {
      this.ref.current.addEventListener('mousedown', this.handleMouseDown)
      this.rect = this.ref.current.getBoundingClientRect()
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount() {
    if (this.ref && this.ref.current) {
      this.ref.current.removeEventListener('mousedown', this.handleMouseDown)
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
      window.removeEventListener('resize', this.handleResize)
    }
  }

  triggerChange = throttle(({ left, right }) => {
    const { marks, onChange } = this.props
    const value = [
      this.getValueFromPercent(marks, left),
      this.getValueFromPercent(marks, right),
    ]
    if (!isEqual(this.throttleState, value)) {
      this.throttleState = value
      onChange(value)
    }
  }, 100)

  handleResize = () => {
    this.rect = this.ref.current.getBoundingClientRect()
  }

  handleMouseDown = e => {
    document.addEventListener('mouseup', this.handleMouseUp)

    const { left, right } = this.state

    if (e.target.getAttribute('role') === 'slider') {
      document.addEventListener('mousemove', this.handleMouseMove)
      this.type = e.target.dataset.type
    } else if (this.ref.current.contains(e.target)) {
      let dx = ((e.x - this.rect.x) / this.rect.width) * 100

      if (dx > this.endPercent) {
        dx = 100
      }

      const middle = left + right / 2
      this.triggerChange(
        dx < middle ? { left: dx, right } : { left, right: dx }
      )
    }
  }

  handleMouseMove = e => {
    const { left, right } = this.state
    let percent = ((e.x - this.rect.x) * 100) / this.rect.width

    if (percent > this.endPercent) {
      percent = 100
    }

    if (percent < 0) {
      percent = 0
    }

    if (this.type === 'left') {
      if (percent >= right) {
        this.type = 'right'

        return this.triggerChange({
          left: right,
          right: percent,
        })
      }

      return this.triggerChange({
        left: percent,
        right,
      })
    }

    if (percent <= left) {
      this.type = 'left'

      return this.triggerChange({
        left: percent,
        right: left,
      })
    }

    return this.triggerChange({
      left,
      right: percent,
    })
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    const { left, right } = this.state
    const { value, unit, marks } = this.props

    let usedWeight = 0

    return (
      <div className={styles.slider} ref={this.ref}>
        <div className={styles.rail} />
        <div
          className={styles.track}
          role="track"
          style={{ left: `${left}%`, width: `${right - left}%` }}
        />
        <Tooltip content={`${value[0]} ${unit}`}>
          <div
            className={styles.handler}
            role="slider"
            data-type="left"
            style={{ left: `calc(${left}% - 10px)` }}
          />
        </Tooltip>
        <Tooltip content={`${value[1]} ${unit}`}>
          <div
            className={styles.handler}
            role="slider"
            data-type="right"
            style={{ left: `calc(${right}% - 10px)` }}
          />
        </Tooltip>
        <div className={styles.mark}>
          {marks.map(mark => {
            const weight = mark.weight || 1

            usedWeight += weight

            const percent = ((usedWeight - weight) * 100) / this.totalWeight

            return (
              <span key={mark.value} style={{ left: `${percent}%` }}>
                {mark.label}
              </span>
            )
          })}
        </div>
      </div>
    )
  }
}
