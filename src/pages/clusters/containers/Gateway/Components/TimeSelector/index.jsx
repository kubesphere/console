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
import classnames from 'classnames'

import { Button, Icon } from '@kube-design/components'

import DefaultRange from './Range/Default'

import { getTimeLabel } from './utils'
import styles from './index.scss'

export default class TimeSelector extends React.PureComponent {
  static propTypes = {
    duration: PropTypes.string,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    duration: '10m',
    onChange() {},
    onToggle() {},
  }

  constructor(props) {
    super(props)

    const { duration } = props

    this.state = {
      visible: false,
      preDuration: '',
      duration: duration || '10m',
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.duration !== prevState.preDuration) {
      const { duration } = nextProps
      return {
        prevPropStep: duration,
        duration,
      }
    }
    return null
  }

  handleToggle = () => {
    this.setState({ visible: !this.state.visible }, () => {
      this.props.onToggle(this.state.visible)
    })
  }

  hideSelector = () => {
    this.setState({ visible: false }, () => {
      this.props.onToggle(false)
    })
  }

  handleTimeChange = ({ duration }) => {
    this.setState({ visible: false, duration }, () => {
      this.props.onChange(duration)
    })
  }

  renderButtonText() {
    const { duration } = this.state
    const lastTimeText = getTimeLabel(duration)
    return `${t('LAST')} ${lastTimeText}`
  }

  renderContent() {
    const { duration } = this.state
    return (
      <div className={styles.content}>
        <DefaultRange duration={duration} onChange={this.handleTimeChange} />
      </div>
    )
  }

  render() {
    const { className, dark, arrowIcon } = this.props
    return (
      <div
        className={classnames(styles.selector, className, {
          [styles.active]: this.state.visible,
        })}
      >
        <div
          className={classnames(styles.mask, {
            [styles.active]: this.state.visible,
          })}
          onClick={this.hideSelector}
        />
        <Button className={styles.button} onClick={this.handleToggle}>
          <Icon type={dark ? 'dark' : 'light'} name="timed-task" size={20} />
          <p>{this.renderButtonText()}</p>
          <Icon
            className={styles.arrow}
            type={dark ? 'dark' : 'light'}
            name={arrowIcon || 'caret-down'}
          />
        </Button>
        <div className={styles.dropdown}>{this.renderContent()}</div>
      </div>
    )
  }
}
