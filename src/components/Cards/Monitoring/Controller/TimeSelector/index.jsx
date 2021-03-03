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
import { omit } from 'lodash'

import { Button, Icon } from '@kube-design/components'

import DefaultRange from './Range/Default'
import CustomRange from './Range/Custom'

import { getLastTimeStr, getTimeLabel, getDateStr } from './utils'
import styles from './index.scss'

export default class TimeSelector extends React.PureComponent {
  static propTypes = {
    step: PropTypes.string,
    times: PropTypes.number,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    step: '10m',
    times: 30,
    onChange() {},
    onToggle() {},
  }

  constructor(props) {
    super(props)

    const { step, times } = props

    this.state = {
      visible: false,
      prevPropStep: step,
      step,
      prevPropTimes: times,
      times,
      start: '',
      end: '',
      lastTime: '',
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.step !== prevState.prevPropStep ||
      nextProps.times !== prevState.prevPropTimes
    ) {
      const { step, times } = nextProps
      return {
        prevPropStep: step,
        step,
        prevPropTimes: times,
        times,
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

  handleTimeChange = data => {
    this.setState({ visible: false, ...data }, () => {
      const newData = omit(data, ['lastTime'])

      this.props.onChange(newData)
    })
  }

  renderButtonText() {
    const { step, times, start, end, lastTime } = this.state

    if (start && end && !lastTime) {
      const intervalText = `(${t('Interval')} ${getTimeLabel(step)})`
      return `${getDateStr(start)} ~ ${getDateStr(end)} ${intervalText}`
    }

    const lastTimeText = getTimeLabel(lastTime || getLastTimeStr(step, times))
    return `${t('Last')} ${lastTimeText}`
  }

  renderContent() {
    const { step, times } = this.state
    return (
      <div className={styles.content}>
        <DefaultRange
          step={step}
          times={times}
          onChange={this.handleTimeChange}
        />
        <CustomRange
          step={step}
          times={times}
          onSubmit={this.handleTimeChange}
          onCancel={this.hideSelector}
        />
      </div>
    )
  }

  render() {
    return (
      <div
        className={classnames(styles.selector, {
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
          <Icon type="light" name="timed-task" size={20} />
          <p>{this.renderButtonText()}</p>
          <Icon className={styles.arrow} type="light" name="caret-down" />
        </Button>
        <div className={styles.dropdown}>{this.renderContent()}</div>
      </div>
    )
  }
}
