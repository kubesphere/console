/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { formatTime } from '../../utils';

export interface ValueType {
  times: number;
  step: string;
  start: string | number;
  end: string | number;
  lastTime: string;
}

export const getMinutes = (timeStr: string): number => {
  const unit = timeStr.slice(-1);
  const value = parseFloat(timeStr);

  switch (unit) {
    default:
    case 's':
      return value / 60;
    case 'm':
      return value;
    case 'h':
      return value * 60;
    case 'd':
      return value * 24 * 60;
  }
};

export const getStep = (timeStr: string, times: number) =>
  `${parseInt((getMinutes(timeStr) / times).toString(), 10)}m`;

export const getTimes = (timeStr: string, step: string) =>
  Math.floor(getMinutes(timeStr) / getMinutes(step));

export const getTimeStr = (seconds: string): string => {
  let value = Math.round(parseFloat(seconds) / 60);

  if (value < 60) {
    return `${value}m`;
  }

  value = Math.round(value / 60);
  if (value < 24) {
    return `${value}h`;
  }

  return `${Math.round(value / 24)}d`;
};

export const getLastTimeStr = (step: string, times: number) => {
  const unit = step.slice(-1);
  const timeStr = `${parseFloat(step) * times}${unit}`;
  const value = getMinutes(timeStr) * 60;
  return getTimeStr(value.toString());
};

export const getTimeLabel = (timeStr: string) => {
  const unit = timeStr.slice(-1).toUpperCase();
  return t(`TIME_${unit}`, { count: parseInt(timeStr, 10) });
};

export const getTimeOptions = (times: string[]) =>
  times.map(time => ({
    label: getTimeLabel(time),
    value: time,
  }));

export const getIconTheme = (type: string) => {
  if (type === 'dark') {
    return {
      color: '#324558',
      fill: '#b6c2cd',
    };
  }
  return {
    color: 'rgba(255, 255, 255, 0.9)',
    fill: 'rgba(255, 255, 255, 0.4)',
  };
};

export const getDateStr = (time: string | number) => {
  return formatTime(Number(time) * 1000);
};
