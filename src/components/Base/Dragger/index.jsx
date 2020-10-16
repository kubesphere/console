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
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import { set } from 'lodash'
import { observer } from 'mobx-react'
import { observable, computed, action, reaction, toJS } from 'mobx'
import { Icon } from '@kube-design/components'

import {
  enterFullScreen,
  exitFullScreen,
  addFullScreenChangeEvents,
  removeFullScreenChangeEvents,
} from 'utils/dom'

import style from './index.scss'

@observer
export default class Dragger extends React.Component {
  static defaultProps = {
    onClick: () => {},
    enableToggleFullScreen: true,
    XOffset: 0, // content initial x offset
    YOffset: 0, // content initial y offset
  }

  static childContextTypes = {
    scale: PropTypes.number,
  }

  getChildContext() {
    return {
      scale: this.scale,
    }
  }

  constructor(props) {
    super(props)
    this.initPosition = { x: 0, y: 0 }
    this.lastPosition = { x: 0, y: 0 }
    this.isMoved = false
  }

  componentDidMount() {
    this.initialComponent()
    addFullScreenChangeEvents(this.fullScreenFlagChange)

    if (this.container) {
      // some chrome versions can't stop propagation in react event stream
      this.container.addEventListener('wheel', this.handleWheel)
    }
    if (this.content) {
      const {
        left: domOffsetX,
        top: domOffsetY,
      } = this.content.getBoundingClientRect()
      this.domOffsetX = domOffsetX
      this.domOffsetY = domOffsetY
    }
    if (this.content) {
      this.setStyleReaction = reaction(
        () => this.styles,
        () => {
          set(this.content, 'style.transform', toJS(this.styles).transform)
        },
        { fireImmediately: true }
      )
    }
  }

  componentWillUnmount() {
    removeFullScreenChangeEvents(this.fullScreenFlagChange)

    if (this.container) {
      this.container.removeEventListener('wheel', this.handleWheel, false)
    }
    this.setStyleReaction && this.setStyleReaction()
  }

  handleContainerClick = e => {
    if (Math.abs(this.deltaX) > 10 || Math.abs(this.deltaY) > 10) {
      e.stopPropagation()
      return
    }
    this.props.onClick(e)
  }

  fullScreenFlagChange = () => {
    this.isFullscreen = !this.isFullscreen
  }

  @computed
  get styles() {
    return {
      transform: `translate3d(${this.translateX}px, ${this.translateY}px, 0)
          scale(${this.scale})`,
    }
  }

  @observable
  scale = 1

  @observable
  translateX = 30

  @observable
  translateY = 60

  @observable
  isFullscreen = false

  @action
  initialComponent = () => {
    if (this.props.initialScale) {
      this.scale = this.props.initialScale
    } else {
      this.initialScale()
    }

    this.initialPosition()
  }

  @action
  initialPosition = () => {
    const { XOffset, YOffset } = this.props
    this.translateX = XOffset
    this.translateY = YOffset
    this.lastPosition = { x: this.translateX, y: this.translateY }
  }

  @action
  initialScale = () => {
    const vScale = this.container.clientWidth / this.content.clientWidth
    const hScale = this.container.clientHeight / this.content.clientHeight
    const _scale = Math.min(vScale, hScale)
    this.scale = _scale > 1 ? 1 : Math.max(_scale, 0.6)
  }

  @action
  handleWheel = e => {
    e.preventDefault()
    e.stopPropagation()

    const direction = e.deltaY > 0 ? 1 : -1
    const clientY = e.clientY - this.domOffsetY
    const clientX = e.clientX - this.domOffsetX
    const deltaScale =
      -0.01 * (Math.abs(e.deltaY) > 5 ? direction * 5 : e.deltaY)
    const _scale = this.scale + deltaScale

    if (_scale < 1 && _scale > 0.2) {
      // zoom and calculate position for focus insight to mouse curser
      const contentWidth = this.content.clientWidth * this.scale
      const contentHeight = this.content.clientHeight * this.scale

      if (clientX > this.translateX + contentWidth) {
        this.translateX =
          -(deltaScale * this.content.clientWidth) + this.translateX
      } else if (clientX >= this.translateX) {
        this.translateX =
          -(deltaScale * (clientX - this.translateX)) / this.scale +
          this.translateX
      }

      if (clientY > this.translateY + contentHeight) {
        this.translateY =
          -(deltaScale * this.content.clientHeight) + this.translateY
      } else if (clientY >= this.translateY) {
        this.translateY =
          (-deltaScale * (clientY - this.translateY)) / this.scale +
          this.translateY
      }
      this.scale = _scale
      this.lastPosition = {
        x: this.translateX,
        y: this.translateY,
      }
      this.isMoved = true
    }
  }

  stopPropagation = e => {
    e.stopPropagation()
  }

  @action
  handleZoomOut = () => {
    if (this.scale < 1) {
      this.scale += 0.2
      this.isMoved = true
    }
  }

  @action
  handleZoomIn = () => {
    if (this.scale > 0.4) {
      this.scale -= 0.2
      this.isMoved = true
    }
  }

  @action
  handleNormalSize = () => {
    this.scale = 1
    this.translateX = 30
    this.translateY = 60
    this.lastPosition = { x: this.translateX, y: this.translateY }
  }

  @action
  handleAutoSize = () => {
    this.initialScale()
    this.initialPosition()
  }

  @action
  handleContentMove = e => {
    if (this.DragContent) {
      this.translateX = e.clientX - this.initPosition.x + this.lastPosition.x
      this.translateY = e.clientY - this.initPosition.y + this.lastPosition.y
      this.isMoved = true
    }
  }

  @action
  handleMouseLeave = e => {
    if (e.currentTarget.dataset.container === 'pipeline') {
      this.lastPosition = {
        x: this.translateX,
        y: this.translateY,
      }
      this.DragContent = false
    }
  }

  @action
  handleMouseDown = e => {
    e.preventDefault()
    if (e.button !== 0) {
      return
    }
    this.initPosition = { x: e.clientX, y: e.clientY }
    this.DragContent = true
  }

  @action
  handleMouseUp = e => {
    if (!this.DragContent) return
    this.deltaX = e.clientX - this.initPosition.x
    this.deltaY = e.clientY - this.initPosition.y
    this.translateX = this.deltaX + this.lastPosition.x
    this.translateY = this.deltaY + this.lastPosition.y
    this.lastPosition = {
      x: this.translateX,
      y: this.translateY,
    }
    this.DragContent = false
  }

  @action
  handleChangeScale = scale => {
    this.scale = scale / 100
  }

  @action
  toggleFullscreen = () => {
    const { onFullScreen } = this.props

    if (onFullScreen) {
      this.fullScreenFlagChange()
      return onFullScreen()
    }

    if (this.isFullscreen) {
      exitFullScreen(this.container)
    } else {
      enterFullScreen(this.container)
    }
  }

  render() {
    const {
      children,
      className,
      contentClassName,
      controlStyle,
      enableToggleFullScreen,
      onRefresh,
    } = this.props

    return (
      <div
        className={classNames(style.container, className)}
        onClickCapture={this.handleContainerClick}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleContentMove}
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        data-container="pipeline"
        ref={dom => {
          this.container = dom
        }}
      >
        <div
          className={style.controls}
          style={controlStyle}
          onMouseLeave={this.stopPropagation}
          onMouseMove={this.stopPropagation}
        >
          {enableToggleFullScreen ? (
            <div className={style.control} onClick={this.toggleFullscreen}>
              <Icon
                name={this.isFullscreen ? 'minimize' : 'maximize'}
                clickable
              />
            </div>
          ) : null}

          <div className={style.control} onClick={this.handleZoomOut}>
            <Icon name="add" clickable />
          </div>

          <div className={style.control} onClick={this.handleZoomIn}>
            <Icon name="substract" clickable />
          </div>

          {onRefresh && (
            <div className={style.control} onClick={onRefresh}>
              <Icon name="refresh" clickable />
            </div>
          )}
        </div>
        <div
          className={classNames(style.main_content, contentClassName)}
          ref={dom => {
            this.content = dom
          }}
        >
          {children}
        </div>
      </div>
    )
  }
}
