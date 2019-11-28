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

const TIME_UNIT_MS_MAP = {
  s: 1000,
  m: 1000 * 60,
  h: 1000 * 60 * 60,
  d: 1000 * 60 * 60 * 24,
  w: 1000 * 60 * 60 * 24 * 7,
}

export const splitDateString = function(date) {
  const [, count = 0, unit = 's'] = date.match(/(\d*)([a-zA-Z])/) || []
  return {
    count,
    unit,
  }
}

export const date2Ms = function(date) {
  const { count, unit } = splitDateString(date)
  return count * (TIME_UNIT_MS_MAP[unit] || 0)
}

export const dateI18n = function(date) {
  const { count, unit } = splitDateString(date)
  return t(`TIME_${unit.toUpperCase()}`, { num: count })
}

export const getLastTimeRange = function(date) {
  const now = Date.now()
  return {
    endTime: now,
    startTime: now - date2Ms(date),
  }
}
