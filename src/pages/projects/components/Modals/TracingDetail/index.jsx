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

import { isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Columns, Column } from '@kube-design/components'
import isEqual from 'react-fast-compare'
import { Modal } from 'components/Base'
import { getLocalTime } from 'utils'
import {
  formatDuration,
  createViewedBoundsFunc,
  COORD_COUNT,
} from 'utils/tracing'
import Span from './Span'
import SpanDetail from './SpanDetail'
import SpanGraph from './SpanGraph'

import styles from './index.scss'

export default class TracingDetailModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      selectSpan: {},
      viewStart: 0,
      viewEnd: 1,
    }

    this.getViewedBounds = createViewedBoundsFunc({
      min: props.detail.startTime,
      max: props.detail.endTime,
      viewStart: 0,
      viewEnd: 1,
    })

    this.listPane = React.createRef()
    this.detailPane = React.createRef()
    this.originPos = 0
  }

  componentDidUpdate(prevProps, prevState) {
    const { detail } = this.props
    if (!isEqual(detail, prevProps.detail)) {
      this.getViewedBounds = createViewedBoundsFunc({
        min: detail.startTime,
        max: detail.endTime,
        viewStart: 0,
        viewEnd: 1,
      })

      this.setState({ selectSpan: {}, viewStart: 0, viewEnd: 1 })
    }

    if (this.detailPane && this.detailPane.current) {
      if (!isEmpty(this.state.selectSpan) && isEmpty(prevState.selectSpan)) {
        this.detailPane.current.addEventListener(
          'mousedown',
          this.handleMouseDown,
          false
        )
        document.addEventListener('mouseup', this.handleMouseUp, false)
      } else if (
        isEmpty(this.state.selectSpan) &&
        !isEmpty(prevState.selectSpan)
      ) {
        this.detailPane.current.removeEventListener(
          'mousedown',
          this.handleMouseDown,
          false
        )
        document.removeEventListener('mouseup', this.handleMouseUp, false)
        document.removeEventListener('mousemove', this.handleResize, false)
      }
    }
  }

  componentWillUnmount() {
    if (this.detailPane && this.detailPane.current) {
      this.detailPane.current.removeEventListener(
        'mousedown',
        this.handleMouseDown,
        false
      )
      document.removeEventListener('mouseup', this.handleMouseUp, false)
      document.removeEventListener('mousemove', this.handleResize, false)
    }
  }

  get viewRange() {
    return {
      viewStart: this.state.viewStart,
      viewEnd: this.state.viewEnd,
    }
  }

  handleMouseDown = e => {
    if (e.offsetY < 4) {
      this.originPos = e.y
      document.addEventListener('mousemove', this.handleResize, false)
    }
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleResize, false)
  }

  handleResize = e => {
    const dy = this.originPos - e.y
    this.originPos = e.y

    const $detail = this.detailPane.current

    const parentHeight = parseInt(
      getComputedStyle($detail.parentNode, '').height,
      10
    )
    const detailHeight = parseInt(getComputedStyle($detail, '').height, 10)

    if (detailHeight + dy < parentHeight - 83) {
      $detail.style.height = `${detailHeight + dy}px`

      if (this.listPane && this.listPane.current) {
        const $list = this.listPane.current
        $list.style.bottom = `${detailHeight + dy}px`
      }
    }
  }

  handleSpanClick = span => {
    this.setState({ selectSpan: span })
  }

  hideSpanDetail = () => {
    this.setState({ selectSpan: {} })
  }

  handleRangeChange = data => {
    this.getViewedBounds = createViewedBoundsFunc({
      min: this.props.detail.startTime,
      max: this.props.detail.endTime,
      viewStart: data.viewStart,
      viewEnd: data.viewEnd,
    })

    this.setState(data)
  }

  getCoords() {
    const coordPercent = 100 / COORD_COUNT
    const coords = []

    for (let i = 0; i < COORD_COUNT; i++) {
      coords.push({
        percent: `${i * coordPercent}%`,
      })
    }
    coords.push({ percent: '100%' })

    return coords
  }

  renderHeader() {
    const {
      traceName,
      traceID,
      duration,
      startTime,
      services,
      spans,
    } = this.props.detail

    if (!spans) {
      return null
    }

    let depth = 0
    spans.forEach(span => {
      depth = Math.max(depth, span.depth)
    })

    return (
      <div className={styles.header}>
        <Icon name="target" size={40} />
        <div className={styles.title}>
          <div className={styles.name}>
            {traceName} <span>{traceID}</span>
          </div>
          <ul>
            <li>
              <span>{t('START_TIME')}: </span>
              <span>
                {getLocalTime(startTime / 1000).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </li>
            <li>
              <span>{t('DURATION')}: </span>
              <span>{formatDuration(duration)}</span>
            </li>
            <li>
              <span>{t('CALLED_SERVICES')}: </span>
              <span>{services.length}</span>
            </li>
            <li>
              <span>{t('CALL_DEPTH')}: </span>
              <span>{depth}</span>
            </li>
          </ul>
        </div>
        <div className={styles.close} onClick={this.props.onCancel}>
          <Icon name="close" size={20} type="light" />
        </div>
      </div>
    )
  }

  render() {
    const { visible, detail, onCancel } = this.props
    const { selectSpan } = this.state

    const coords = this.getCoords()

    return (
      <Modal
        visible={visible}
        bodyClassName={styles.body}
        onCancel={onCancel}
        hideHeader
        hideFooter
        fullScreen
      >
        {this.renderHeader()}
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <Columns className="is-gapless">
              <Column className="is-3">
                <div className={styles.leftPane}>
                  <div className={styles.timelineTitle}>
                    {t('SERVICES_AND_OPERATIONS')}
                  </div>
                </div>
              </Column>
              <Column>
                <div className={styles.rightPane}>
                  <div className={styles.timelineSelect}>
                    <SpanGraph
                      data={detail}
                      viewRange={this.viewRange}
                      onRangeChange={this.handleRangeChange}
                    />
                  </div>
                  <svg className={styles.coords}>
                    {coords.map(coord => (
                      <line
                        key={coord.percent}
                        y1="0%"
                        y2="100%"
                        x1={coord.percent}
                        x2={coord.percent}
                      />
                    ))}
                  </svg>
                </div>
              </Column>
            </Columns>
            <ul
              className={styles.listPane}
              ref={this.listPane}
              style={{ bottom: !isEmpty(selectSpan) ? '50%' : 0 }}
            >
              {detail.spans &&
                detail.spans.map(span => (
                  <Span
                    key={span.spanID}
                    span={span}
                    selected={selectSpan.spanID === span.spanID}
                    color={detail.serviceColorMap[span.process.serviceName]}
                    getViewedBounds={this.getViewedBounds}
                    onClick={this.handleSpanClick}
                  />
                ))}
            </ul>
            {!isEmpty(selectSpan) && (
              <div className={styles.detailPane} ref={this.detailPane}>
                <SpanDetail span={selectSpan} onClose={this.hideSpanDetail} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    )
  }
}
