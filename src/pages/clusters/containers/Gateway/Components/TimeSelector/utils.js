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

import { getLocalTime } from 'utils'

export const getMinutes = timeStr => {
  const unit = timeStr.slice(-1)
  const value = parseFloat(timeStr)

  switch (unit) {
    default:
    case 's':
      return value / 60
    case 'm':
      return value
    case 'h':
      return value * 60
    case 'd':
      return value * 24 * 60
  }
}

export const getStep = (timeStr, times) =>
  `${parseInt(getMinutes(timeStr) / times, 10)}m`

export const getTimes = (timeStr, step) =>
  Math.floor(getMinutes(timeStr) / getMinutes(step))

export const getTimeStr = seconds => {
  let value = Math.round(parseFloat(seconds) / 60)

  if (value < 60) {
    return `${value}m`
  }

  value = Math.round(value / 60)
  if (value < 24) {
    return `${value}h`
  }

  return `${Math.round(value / 24)}d`
}

export const getLastTimeStr = (step, times) => {
  const unit = step.slice(-1)
  const timeStr = `${parseFloat(step) * times}${unit}`
  const value = getMinutes(timeStr) * 60
  return getTimeStr(value)
}

export const getTimeLabel = timeStr => {
  const unit = timeStr.slice(-1).toUpperCase()
  return t(`TIME_${unit}`, { num: parseInt(timeStr, 10) })
}

export const getTimeOptions = times =>
  times.map(time => ({
    label: getTimeLabel(time),
    value: time,
  }))

export const getDateStr = time => {
  const localTime = getLocalTime(time * 1000)
  return `${localTime.format(t('MMMM Do YYYY'))} ${localTime.format(
    'HH:mm:ss'
  )}`
}
