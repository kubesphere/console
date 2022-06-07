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

import {
  Button,
  Form,
  Notify,
  DatePicker,
  Select,
} from '@kube-design/components'

import { getMinutes, getTimeOptions } from '../utils'

import styles from './index.scss'

const TimeOps = ['1m', '2m', '5m', '10m', '15m', '30m', '1h', '2h', '5h']

export default class CustomRange extends React.Component {
  static propTypes = {
    showStep: PropTypes.bool,
    step: PropTypes.string,
    times: PropTypes.number,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    showStep: true,
    step: '10m',
    times: 30,
    onSubmit() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    const now = new Date()
    const start = new Date(now.valueOf() - 3600000)

    this.formData = {
      step: props.step,
      start: props.start ? [props.start] : [start],
      end: props.end ? [props.end] : [now],
    }
  }

  handlerStartDateClose = this.handlerDateClose('start')

  handlerEndDateClose = this.handlerDateClose('end')

  handlerDateClose(name) {
    return time => {
      this.formData[name] = time
      this.forceUpdate()
    }
  }

  handleOk = () => {
    const { step, start, end } = this.formData
    if (!start[0] || !end[0]) {
      Notify.error({ content: t('TIMERANGE_SELECTOR_ERROR_MSG') })
      return
    }
    const startTime = start[0].valueOf() / 1000
    const endTime = end[0].valueOf() / 1000
    const interval = endTime - startTime

    if (interval > 0) {
      const times = Math.floor(interval / (getMinutes(step) * 60)) || 1
      const data = { step, times, start: startTime, end: endTime, lastTime: '' }
      this.props.onSubmit(data)
    } else {
      Notify.error({ content: t('TIMERANGE_SELECTOR_MSG') })
    }
  }

  render() {
    const { onCancel, className } = this.props
    const { start, end } = this.formData

    return (
      <div className={classnames(styles.custom, className)}>
        <div className={styles.title}>{t('CUSTOM_TIME_RANGE')}</div>
        <Form data={this.formData}>
          <Form.Item label={t('START_TIME')}>
            <DatePicker
              name="start"
              defaultDate={start[0]}
              maxDate={end[0]}
              enableTime
              enableSeconds
              dateFormat={'Y-m-d H:i:S'}
              onClose={this.handlerStartDateClose}
            />
          </Form.Item>
          <Form.Item label={t('END_TIME')}>
            <DatePicker
              name="end"
              defaultDate={end[0]}
              maxDate={end[0]}
              enableTime
              enableSeconds
              dateFormat={'Y-m-d H:i:S'}
              onClose={this.handlerEndDateClose}
            />
          </Form.Item>
          {this.props.showStep && (
            <Form.Item label={t('SAMPLING_INTERVAL')}>
              <Select
                className={styles.selectBox}
                defaultValue="1m"
                name="step"
                options={getTimeOptions(TimeOps)}
              />
            </Form.Item>
          )}
          <div
            className={classnames(styles.actions, {
              [styles.bottom10]: !this.props.showStep,
            })}
          >
            <Button onClick={onCancel}>{t('CANCEL')}</Button>
            <Button type="control" onClick={this.handleOk}>
              {t('OK')}
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
