import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { omit } from 'lodash'

import { Icon } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
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
          <Icon name="calendar" size={20} />
          <p>{this.renderButtonText()}</p>
          <Icon className={styles.arrow} name="caret-down" />
        </Button>
        <div className={styles.dropdown}>{this.renderContent()}</div>
      </div>
    )
  }
}
