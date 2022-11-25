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
import { observer, inject } from 'mobx-react'
import moment from 'moment-mini'

import { translateTimeAlias, getMsFromTimeAlias } from 'utils/time'

import TimeRangeSelect from '../components/TimeRangeSelect'
import { recentTimeRange } from '../options'

const FULL_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const getISOStringFromDate = function(timestamp) {
  return new Date(timestamp).toISOString()
}

@inject('monitoringStore')
@observer
class CustomMonitorTimeRangeSelect extends React.Component {
  handleQuickSelect = time => {
    this.props.monitoringStore.changeTimeRange(time)
  }

  handeCustomSelect = ({ startTime, endTime }) => {
    this.props.monitoringStore.changeTimeRange({
      from: getISOStringFromDate(startTime),
      to: getISOStringFromDate(endTime),
    })
  }

  options = recentTimeRange.map(recentDuration => ({
    label: `${t('LAST')} ${translateTimeAlias(recentDuration)}`,
    value: {
      from: `now-${recentDuration}`,
      to: 'now',
    },
  }))

  format = () => {
    const { to, from } = this.props.monitoringStore.time
    return to === 'now'
      ? `${t('LAST')} ${translateTimeAlias(from.replace('now-', ''))}`
      : `${moment(from).format(FULL_TIME_FORMAT)} ~ ${moment(to).format(
          FULL_TIME_FORMAT
        )}`
  }

  generateTimeRange() {
    const { time } = this.props.monitoringStore
    const { from, to } = time
    const isRecent = to === 'now'
    return isRecent
      ? {
          startTime: Date.now() - getMsFromTimeAlias(from.replace('now-', '')),
          endTime: Date.now(),
        }
      : {
          startTime: new Date(from).valueOf(),
          endTime: new Date(to).valueOf(),
        }
  }

  render() {
    const { from, to } = this.props.monitoringStore.time
    return (
      <TimeRangeSelect
        key={from + to}
        recentOpts={this.options}
        timeRange={this.generateTimeRange()}
        onRecentSelect={this.handleQuickSelect}
        onCustomSubmit={this.handeCustomSelect}
        format={this.format}
      />
    )
  }
}

export default CustomMonitorTimeRangeSelect
