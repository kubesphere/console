import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { getStep, getTimes, getTimeOptions, getLastTimeStr } from '../utils'

import styles from './index.scss'

const TimeOps = [
  '10m',
  '20m',
  '30m',
  '1h',
  '2h',
  '3h',
  '5h',
  '12h',
  '1d',
  '2d',
  '3d',
  '7d',
]

export default class DefaultRange extends React.Component {
  static propTypes = {
    step: PropTypes.string,
    times: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    step: '10m',
    times: 30,
    onChange() {},
  }

  handleClick = e => {
    const { value } = e.target.dataset

    if (value) {
      let times = this.props.times
      let step = getStep(value, times)
      const stepNum = parseInt(step, 10)

      if (stepNum < 1) {
        times = 10
        step = getStep(value, times)
      }

      if (stepNum > 60) {
        step = '60m'
        times = getTimes(value, step)
      }

      this.props.onChange({
        step,
        times,
        start: '',
        end: '',
        lastTime: value,
      })
    }
  }

  render() {
    const { step, times } = this.props
    const options = getTimeOptions(TimeOps)
    const lastTimeStr = getLastTimeStr(step, times)

    return (
      <div className={styles.default}>
        <div className={styles.title}>{t('Select time range')}</div>
        <ul onClick={this.handleClick}>
          {options.map(({ label, value }) => (
            <li
              key={label}
              data-value={value}
              className={classnames({
                [styles.cur]: value === lastTimeStr,
              })}
            >
              {`${t('Last')} ${label}`}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
