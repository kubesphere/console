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
import { isArray, isEmpty } from 'lodash'

import style from './index.scss'

const STROKEWIDTH = 2
const EDGES_LENGTH = 35
const POINT_R = 6
const CURVE_R = 10

export default class PipelineEdges extends React.Component {
  getMaxHeight = () => {
    const { heights, index } = this.props
    return Math.max(
      ...[...(heights[index] || []), ...(heights[index + 1] || [])]
    )
  }

  onInsertColumn = index => () => {
    this.props.onInsertColumn(index)
  }

  getRightLinePath(height) {
    if (!height) {
      return `M ${EDGES_LENGTH} ${POINT_R} H ${2 * EDGES_LENGTH - POINT_R}`
    }
    height += POINT_R - 10
    return `M${EDGES_LENGTH} ${POINT_R}  V ${height -
      CURVE_R} Q ${EDGES_LENGTH}, ${height} ${EDGES_LENGTH +
      CURVE_R}, ${height} H ${2 * EDGES_LENGTH - POINT_R}`
  }

  getLeftLinePath(height) {
    if (!height) {
      return `M${POINT_R} ${POINT_R} H ${EDGES_LENGTH}`
    }
    height += POINT_R - 10
    return `M${POINT_R} ${height} H ${EDGES_LENGTH -
      CURVE_R} Q ${EDGES_LENGTH},${height} ${EDGES_LENGTH},${height -
      CURVE_R} V ${POINT_R}`
  }

  renderEditButton() {
    const { index, isEditMode } = this.props

    if (!isEditMode) {
      return
    }
    return (
      <g className={style.editButton}>
        <circle
          cx={EDGES_LENGTH}
          cy={POINT_R}
          r="10"
          stroke="#d8dee5"
          strokeDasharray="3,3"
          fill="white"
          strokeWidth={STROKEWIDTH}
          onClick={this.onInsertColumn(index + 1)}
        />
        <line
          x1={EDGES_LENGTH - 5}
          x2={EDGES_LENGTH + 5}
          y1={POINT_R}
          y2={POINT_R}
          stroke="black"
        />
        <line
          x1={EDGES_LENGTH}
          x2={EDGES_LENGTH}
          y1={POINT_R - 5}
          y2={POINT_R + 5}
          stroke="black"
        />
      </g>
    )
  }

  renderLine(height, posision, isShallow) {
    if (posision === 'left') {
      return (
        <path
          key={`left-${this.props.index}`}
          d={this.getLeftLinePath(height)}
          stroke={isShallow ? '#d8dee5' : 'black'}
          strokeWidth={STROKEWIDTH}
          fill="none"
          markerStart={`url(#path-marker-${isShallow ? 'grey' : 'black'})`}
          markerEnd={`url(#path-marker-${isShallow ? 'grey' : 'black'})`}
        />
      )
    }
    return (
      <path
        key={`right-${this.props.index}`}
        d={this.getRightLinePath(height)}
        stroke={isShallow ? '#d8dee5' : 'black'}
        strokeWidth={STROKEWIDTH}
        fill="none"
        markerStart={`url(#path-marker-${isShallow ? 'grey' : 'black'})`}
        markerEnd={`url(#path-marker-${isShallow ? 'grey' : 'black'})`}
      />
    )
  }

  renderLines = (heights, posision) => {
    if (!isArray(heights)) {
      return null
    }

    return heights.map((height, index) => {
      if (index === heights.length - 1) {
        return null
      }
      return (
        <React.Fragment key={index}>
          {this.renderLine(height, posision)}
        </React.Fragment>
      )
    })
  }

  renderEditLines = () => {
    const { heights, index, isEditMode } = this.props
    const lineLists = []

    if (!isArray(heights) || !isEditMode) {
      return null
    }

    if (isArray(heights[index]) && !isEmpty(heights[index])) {
      const { length, last = length - 1 } = heights[index]
      lineLists.push(this.renderLine(heights[index][last] - 50, 'left', true))
    }

    if (isArray(heights[index + 1]) && !isEmpty(heights[index + 1])) {
      const { length, last = length - 1 } = heights[index + 1]
      lineLists.push(
        this.renderLine(heights[index + 1][last] - 50, 'right', true)
      )
    }

    return lineLists
  }

  renderFirstLines() {
    return (
      <>
        {this.renderLine(0, 'right')}
        {this.renderLine(0, 'left')}
      </>
    )
  }

  renderBoldLines() {
    const { heights, index } = this.props
    return (
      <>
        {this.renderLines(heights[index], 'left')}
        {this.renderLines(heights[index + 1], 'right')}
      </>
    )
  }

  renderEdges() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id={'path-marker-black'}
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <circle
              cx={POINT_R}
              cy={POINT_R}
              r={POINT_R - 1}
              fill={'#329dce'}
            />
          </marker>
          <marker
            id={'path-marker-grey'}
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <circle
              cx={POINT_R}
              cy={POINT_R}
              r={POINT_R - 1}
              fill={'#d8dee5'}
            />
          </marker>
        </defs>
        {this.renderEditLines()}
        {this.renderBoldLines()}
        {this.renderFirstLines()}
        {this.renderEditButton()}
      </svg>
    )
  }

  render() {
    const { heights, index, posision, isEditMode } = this.props

    if (!isEditMode && index === heights.length - 1) {
      return <div className={style.connects__column} />
    }

    return (
      <React.Fragment>
        <div
          className={style.connects__column}
          style={{ height: `${this.getMaxHeight() + 32}px` }}
        >
          {this.renderEdges()}
          {isEditMode && !index && posision === 'Right'
            ? this.renderEditButton()
            : null}
        </div>
      </React.Fragment>
    )
  }
}
