/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty, isArray, last, get } from 'lodash';

const UnitTypes: Record<string, any> = {
  second: {
    conditions: [0.01, 0],
    units: ['s', 'ms'],
  },
  cpu: {
    conditions: [0.1, 0],
    units: ['core', 'm'],
  },
  memory: {
    conditions: [1024 ** 4, 1024 ** 3, 1024 ** 2, 1024, 0],
    units: ['Ti', 'Gi', 'Mi', 'Ki', 'Bytes'],
  },
  disk: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['TB', 'GB', 'MB', 'KB', 'Bytes'],
  },
  throughput: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['TB/s', 'GB/s', 'MB/s', 'KB/s', 'B/s'],
  },
  traffic: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['TB/s', 'GB/s', 'MB/s', 'KB/s', 'B/s'],
  },
  bandwidth: {
    conditions: [1024 ** 2 / 8, 1024 / 8, 0],
    units: ['Mbps', 'Kbps', 'bps'],
  },
  number: {
    conditions: [1000 ** 4, 1000 ** 3, 1000 ** 2, 1000, 0],
    units: ['T', 'G', 'M', 'K', ''],
  },
};

export const coreUnitTS = (value: number, unit: string) => {
  let unitTxt = unit || '';

  if (unit === 'core') {
    unitTxt = value !== 1 ? t('CORE_PL') : t('CORE');
  }

  return unitTxt;
};

export const getValueByUnit = (
  num: string,
  unit: string,
  precision?: number,
  originalUnit?: string,
) => {
  precision = precision || 2;
  let value = num === 'NAN' ? 0 : parseFloat(num);

  if (originalUnit !== unit) {
    switch (unit) {
      default:
        break;
      case '':
      case 'default':
        return value;
      case 'iops':
        return Math.round(value);
      case '%':
        value *= 100;
        break;
      case 'm':
        value *= 1000;
        if (value < 1) return 0;
        break;
      case 'Ki':
        value /= 1024;
        break;
      case 'Mi':
        value /= 1024 ** 2;
        break;
      case 'Gi':
        value /= 1024 ** 3;
        break;
      case 'Ti':
        value /= 1024 ** 4;
        break;
      case 'Bytes':
      case 'B':
      case 'B/s':
        break;
      case 'K':
      case 'KB':
      case 'KB/s':
        value /= 1000;
        break;
      case 'M':
      case 'MB':
      case 'MB/s':
        value /= 1000 ** 2;
        break;
      case 'G':
      case 'GB':
      case 'GB/s':
        value /= 1000 ** 3;
        break;
      case 'T':
      case 'TB':
      case 'TB/s':
        value /= 1000 ** 4;
        break;
      case 'bps':
        value *= 8;
        break;
      case 'Kbps':
        value = (value * 8) / 1024;
        break;
      case 'Mbps':
        value = (value * 8) / 1024 / 1024;
        break;
      case 'ms':
        value *= 1000;
        break;
    }
  }

  return Number(value) === 0 ? 0 : Number(value.toFixed(precision));
};

export const getSuitableUnit = (value: string, unitType: string): string => {
  const config = UnitTypes[unitType];

  if (isEmpty(config)) return '';

  // value can be an array or a single value
  const values = isArray(value) ? value : [[0, Number(value)]];
  let result: string = last(config.units) || '';
  config.conditions.some((condition: number, index: number) => {
    const triggered = values.some(
      _value => ((isArray(_value) ? get(_value, '[1]') : Number(_value)) || 0) >= condition,
    );

    if (triggered) {
      result = config.units[index];
    }
    return triggered;
  });
  return result;
};
