/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import dayjs from 'dayjs';
import { isUndefined, trimEnd } from 'lodash';

import type { PathParams } from '../types';
import { LIST_DEFAULT_ORDER } from '../constants/common';

/**
 * format size, output the value with unit
 * @param {Number} size - the number need to be format
 */
export const formatSize = (size: number): string => {
  const divisor = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];

  let index = 0;
  while (size >= divisor && index < units.length) {
    size = parseFloat((size / divisor).toFixed(2));
    index += 1;
  }

  return `${size} ${units[index]}`;
};

export const formatTime = (time: string | number, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(time).format(format);
};

export const cpuFormat = (cpu: number | string, unit = 'Core') => {
  if (isUndefined(cpu) || cpu === null || cpu === '') {
    return cpu;
  }

  const units = ['m', 'Core', 'k', 'M', 'G'];
  const currentUnit = String(cpu).slice(-1);
  // if no unit, unit = 'Core'
  const currentUnitIndex = units.indexOf(currentUnit) > -1 ? units.indexOf(currentUnit) : 1;
  const targetUnitIndex = units.indexOf(unit);

  let value = currentUnitIndex === 1 ? Number(cpu) : Number(trimEnd(String(cpu), currentUnit));

  value *= 1000 ** (currentUnitIndex - targetUnitIndex);

  return Number(value.toFixed(3));
};

type FilterParams = {
  sortBy?: string;
  ascending?: string;
  limit?: number;
  page?: number;
};

export type FetchListParams = PathParams & FilterParams;

export const formatFetchListParams = (
  module: string,
  params: Omit<FetchListParams, 'workspace' | 'namespace' | 'cluster' | 'devops'>,
): Record<string, any> => {
  if (!params.sortBy && params.ascending === undefined) {
    params.sortBy = LIST_DEFAULT_ORDER[module] || 'createTime';
  }

  if (params.limit === Infinity || params.limit === -1) {
    params.limit = -1;
    params.page = 1;
  }

  params.limit = params.limit || 10;

  return params;
};
