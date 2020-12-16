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

import { getLocalTime } from 'utils'
import { DatePicker, Select, Notify } from '@kube-design/components'
import { getTimeOptions } from 'components/Cards/Monitoring/Controller/TimeSelector/utils'
import cookie from 'utils/cookie'

import styles from './index.scss'

const TimeOps = ['1h', '2h', '5h', '8h', '1d']

export default class TimeSelect extends React.Component {
  static defaultProps = {
    start: '',
    end: '',
    step: '',
    createTime: '',
  }

  getTimeRange = ({ type, methord }) => selectedDates => {
    const { getTime, start, end } = this.props

    if (type === 'step') {
      const _step = selectedDates
      const day = Math.floor((end - start) / 3600 / 24 / 1000)

      if (day >= 30) {
        Notify.error({ content: t('TIMERANGE_MORE_30DAY_MSG') })
      }

      getTime({ type, value: _step, methord })
    } else {
      const time = new Date(selectedDates[0]).getTime()
      if (
        (type === 'start' && time > end) ||
        (type === 'end' && time < start)
      ) {
        Notify.error({ content: t('TIMERANGE_SELECTOR_MSG') })
        return
      }

      getTime({ type, value: time, methord })
    }
  }

  setTimeRange = type => selectedDates => {
    const time = new Date(selectedDates[0]).getTime()
    this.props.getTime({ type, value: time, methord: 'change' })
  }

  render() {
    const { createTime, start, end, step } = this.props
    const format = cookie('lang') === 'zh' ? 'Y年Md日 H:i' : 'M d, Y H:i'
    const timeFormat =
      cookie('lang') === 'zh' ? 'YYYY年MM月DD日 HH:mm' : 'MMM DD, YYYY HH:mm'

    const createTimeStr = createTime
      ? getLocalTime(createTime).format(timeFormat)
      : '-'

    return (
      <ul className={styles.datepicker}>
        <li>
          <div>{t('Reconciliation Cycle')}</div>
          <p>
            {t('Create Time')}: {createTimeStr}
          </p>
        </li>
        <li>
          <div>
            <DatePicker
              value={start}
              enableTime
              showClearBtn={false}
              dateFormat={format}
              onClose={this.getTimeRange({
                type: 'start',
                methord: 'close',
              })}
              onChange={this.setTimeRange('start')}
            />
          </div>
          <p>{t('Start Time')}</p>
        </li>
        <li>
          <div>
            <DatePicker
              value={end}
              enableTime
              showClearBtn={false}
              dateFormat={format}
              onClose={this.getTimeRange({
                type: 'end',
                methord: 'close',
              })}
              onChange={this.setTimeRange('end')}
            />
          </div>
          <p>{t('End Time')}</p>
        </li>
        <li>
          <div>
            <Select
              value={step}
              options={getTimeOptions(TimeOps)}
              onChange={this.getTimeRange({ type: 'step', methord: 'close' })}
            />
          </div>
          <p>{t('Time Interval')}</p>
        </li>
      </ul>
    )
  }
}
