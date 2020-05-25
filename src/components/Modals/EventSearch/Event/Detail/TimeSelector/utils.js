import { getLocalTime } from 'utils'

export const getMinutes = timeStr => {
  const unit = timeStr.slice(-1)
  const value = parseFloat(timeStr)

  switch (unit) {
    default:
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
