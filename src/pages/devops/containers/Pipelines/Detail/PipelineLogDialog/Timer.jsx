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

import { useEffect, useRef, useState } from 'react'
import { formatUsedTime } from 'utils/index'

const TimeCounter = ({ startTime, time }) => {
  const [seconds, setSeconds] = useState(0)

  const timerRef = useRef(null)

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const endTime = new Date()
        const diff = endTime.getTime() - new Date(startTime).getTime()
        setSeconds(diff)
      }, 300)
      timerRef.current = interval
      return () => clearInterval(interval)
    }
  }, [startTime])

  useEffect(() => {
    if (time && timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [time])

  return t('DURATION_VALUE', {
    value: startTime ? formatUsedTime(time ?? seconds) : '-',
  })
}

export default TimeCounter
