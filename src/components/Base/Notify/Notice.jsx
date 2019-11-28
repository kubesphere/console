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
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Button } from '@pitrix/lego-ui'

class Notice extends Component {
  static propTypes = {
    duration: PropTypes.number,
    onClose: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
    type: PropTypes.string,
    closable: PropTypes.bool,
    children: PropTypes.node,
    prefixCls: PropTypes.string,
  }

  static defaultProps = {
    duration: 3000,
    closable: false,
    prefixCls: 'kube-notice',
  }

  componentDidMount() {
    this.startCloseTimer()
  }

  componentWillUnmount() {
    this.clearCloseTimer()
  }

  close = () => {
    this.clearCloseTimer()
    this.props.onClose()
  }

  startCloseTimer = () => {
    const { duration } = this.props
    if (duration === 0) return
    this.closeTimer = setTimeout(() => {
      this.close()
    }, duration)
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
      this.closeTimer = null
    }
  }

  render() {
    const { className, style, type, closable, children, prefixCls } = this.props

    return (
      <div
        className={classNames(
          prefixCls,
          {
            [`${prefixCls}-closable`]: closable,
            [className]: !!className,
          },
          `kube-notice-${type}`
        )}
        style={style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
      >
        <div className={`${prefixCls}-content`}>{children}</div>
        {closable ? (
          <Button
            type="text"
            onClick={this.close}
            className={`${prefixCls}-close`}
          >
            {t('Close')}
          </Button>
        ) : null}
      </div>
    )
  }
}

export default Notice
