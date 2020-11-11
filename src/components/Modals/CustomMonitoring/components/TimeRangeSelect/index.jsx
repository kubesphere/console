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

import { get, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import {
  Form,
  Button,
  Notify,
  Icon,
  DatePicker,
  Select,
} from '@kube-design/components'
import moment from 'moment-mini'

import styles from './index.scss'

const defaultRecentOpts = [
  { label: 'Last 5 Minutes', value: { count: 5, unit: 'Minutes' } },
]

const defaultFormat = ({ count, unit } = {}, { startTime = 0, endTime = 0 }) =>
  count
    ? `${t('Last')} ${count} ${t(unit)}`
    : `${moment(startTime).format('YYYY/MM/DD HH:mm:ss')} ~ ${moment(
        endTime
      ).format('YYYY/MM/DD HH:mm:ss')}`

class TimeRangeSelector extends Component {
  static propTypes = {
    recent: PropTypes.object,
    timeRange: PropTypes.object,
    format: PropTypes.func,
    recentOpts: PropTypes.array,
    interval: PropTypes.string,
    intervalOpts: PropTypes.array,
    onRecentSelect: PropTypes.func,
    onCustomSubmit: PropTypes.func,
  }

  static defaultProps = {
    recent: null,
    timeRange: { startTime: Date.now(), endTime: Date.now() },
    format: defaultFormat,
    recentOpts: defaultRecentOpts,
    intervalOpts: [],
    onRecentSelect() {},
    onCustomSummit() {},
  }

  state = {
    showDropdown: false,
  }

  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  hideDropdown = () => {
    this.setState({ showDropdown: false })
  }

  handleRecentClick = e => {
    const { dataset } = e.currentTarget
    const { index } = dataset
    const { recentOpts, onRecentSelect } = this.props

    onRecentSelect(get(recentOpts, `[${index}].value`))
  }

  handleSubmit = timeRange => {
    const { startTime, endTime, interval } = timeRange
    const [start] = startTime
    const [end] = endTime

    if (start > end) {
      Notify.error({ content: t('TIMERANGE_SELECTOR_MSG') })
    } else {
      this.props.onCustomSubmit({ startTime: start, endTime: end, interval })
    }
  }

  render() {
    const { showDropdown } = this.state
    const { format, timeRange, recent } = this.props
    const content = format(recent || {}, timeRange)

    return (
      <div
        className={classnames(styles.wrapper, {
          [styles.active]: showDropdown,
        })}
      >
        <div
          className={classnames(styles.mask, {
            [styles.active]: showDropdown,
          })}
          onClick={this.hideDropdown}
        />
        <div className={styles.content} onClick={this.toggleDropdown}>
          <Icon name="calendar" type="light" />
          <span>{content}</span>
          <Icon name="chevron-down" type="light" />
        </div>
        {this.renderDropDown()}
      </div>
    )
  }

  renderDropDown() {
    return (
      <div className={styles.dropdown}>
        {this.renderRecentOpts()}
        {this.renderCustomOpts()}
      </div>
    )
  }

  renderRecentOpts() {
    const { recentOpts } = this.props
    return (
      <>
        <div className={styles.title}>{t('Select Time Range')}</div>
        <div className={styles.recentWrapper}>
          {recentOpts.map(({ label }, index) => (
            <span
              onClick={this.handleRecentClick}
              data-index={index}
              key={index}
            >
              {label}
            </span>
          ))}
        </div>
      </>
    )
  }

  renderCustomOpts() {
    const { timeRange, interval, intervalOpts } = this.props
    const { startTime, endTime } = timeRange

    const datePickerProps = {
      enableSeconds: true,
      enableTime: true,
      dateFormat: 'Y-m-d H:i:S',
    }

    return (
      <>
        <div className={styles.title}>{t('Custom Time Range')}</div>
        <Form
          data={{ interval, startTime: [startTime], endTime: [endTime] }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label={t('Start Time')}>
            <DatePicker name={'startTime'} {...datePickerProps} />
          </Form.Item>
          <Form.Item label={t('End Time')}>
            <DatePicker name={'endTime'} {...datePickerProps} />
          </Form.Item>
          <div className={styles.footer}>
            {isEmpty(intervalOpts) || (
              <Form.Item label={t('Time Interval')}>
                <Select
                  name="interval"
                  className={styles.select}
                  options={intervalOpts}
                />
              </Form.Item>
            )}
            <div>
              <Button htmlType="submit">{t('OK')}</Button>
            </div>
          </div>
        </Form>
      </>
    )
  }
}
export default TimeRangeSelector
