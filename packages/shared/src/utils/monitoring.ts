/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import dayjs from 'dayjs';
import { flatten, get, isArray, isEmpty, isNumber, isString, isUndefined, last, set } from 'lodash';
import { COLORS_MAP } from '../constants/common';
import type { OriginalStatisticsMetricResult, FormattedStatistics } from '../types';

export type Unit = { conditions: number[]; units: string[] };

export type Option = {
  label: string;
  value: string;
  icon: string;
};

type ValueType = number | string;
type ValuesType = ValueType | ValueType[] | [ValueType, ValueType][];

const UnitTypes: Record<string, Unit> = {
  second: {
    conditions: [0.01, 0],
    units: ['s', 'ms'],
  },
  cpu: {
    conditions: [0.1, 0],
    units: ['core', 'm'],
  },
  gpu: {
    conditions: [0.1, 0],
    units: ['GPU', 'GPU'],
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

export const fillEmptyMetrics = (params: Record<string, any>, result: FormattedStatistics) => {
  if (!params.times || !params.start || !params.end) {
    return result;
  }

  const format = (num: number) => String(num).replace(/\..*$/, '');
  const step = Math.floor((params.end - params.start) / params.times);
  const correctCount = params.times + 1;

  Object.values(result).forEach(item => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _result: OriginalStatisticsMetricResult[] = get(item, 'data.result');
    if (!isEmpty(_result)) {
      _result.forEach(resultItem => {
        const curValues: [number, string][] = resultItem.values || [];
        const curValuesMap = curValues.reduce<Record<string, string>>(
          (prev, cur) => ({
            ...prev,
            [format(cur[0])]: cur[1],
          }),
          {},
        );

        if (curValues.length < correctCount) {
          const newValues: [number, string][] = [];
          for (let index = 0; index < correctCount; index++) {
            const time = format(params.start + index * step);
            newValues.push([Number(time), curValuesMap[time] || '0']);
          }
          resultItem.values = newValues;
        }
      });
    }
  });

  return result;
};

export const getMinuteValue = (timeStr = '60s', hasUnit = true) => {
  const unit = timeStr.slice(-1);
  let value = parseFloat(timeStr);

  switch (unit) {
    default:
    case 's':
      break;
    case 'm':
      value *= 60;
      break;
    case 'h':
      value *= 60 * 60;
      break;
    case 'd':
      value = value * 24 * 60 * 60;
      break;
  }
  return hasUnit ? `${value}s` : value;
};

export const getTimeRange = ({ step = '600s', times = 20 } = {}) => {
  const interval = parseFloat(step) * times;
  const end = Math.floor(Date.now() / 1000);
  const start = Math.floor(end - interval);

  return { start, end };
};

export const coreUnitTS = (value: number, unit: string): string => {
  let unitTxt = unit || '';

  if (unit === 'core') {
    unitTxt = value !== 1 ? t('CORE_PL') : t('CORE');
  }

  return unitTxt;
};

export function getSuitableUnit(value: ValuesType, unitType: string): string {
  const config = UnitTypes[unitType];

  if (isEmpty(config)) return '';

  // value can be an array or a single value
  const values = isArray(value) ? value : [[0, Number(value)]];
  let result = last(config.units);
  config.conditions.some((condition, index) => {
    const triggered = values.some(
      _value => ((isArray(_value) ? get(_value, '[1]') : Number(_value)) || 0) >= condition,
    );

    if (triggered) {
      result = config.units[index];
    }
    return triggered;
  });

  return result ?? '';
}

export function getValueByUnit(num: ValueType, unit?: string, precision = 2): number {
  let value = num === 'NaN' ? 0 : isNumber(num) ? num : parseFloat(num);

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

  return Number(value) === 0 ? 0 : Number(value.toFixed(precision));
}

export function getLastMonitoringData(
  data?: FormattedStatistics,
): Record<string, { value: [number, string] }> {
  return Object.entries(data ?? {}).reduce<Record<string, { value: [number, string] }>>(
    (acc, [key, value]) => {
      const values: [number, string][] = get(value, 'data.result[0].values', []) || [];
      const val = isEmpty(values)
        ? get(value, 'data.result[0].value', []) || []
        : (last(values) as [number, string]);
      set(acc, `[${key}].value`, val);
      return acc;
    },
    {},
  );
}

// export function enableManageAction(
//   actionKeys: string[],
//   isHost?: boolean,
//   connectionType?: string,
// ): Option[] {
//   const proxyConnect = connectionType === 'proxy';
//   const option: Option[] = [];
//
//   if (actionKeys.includes('edit')) {
//     option.push({
//       label: 'EDIT_INFORMATION',
//       value: 'resource.baseinfo.edit',
//       icon: 'pen',
//     });
//   }
//
//   if (actionKeys.includes('edit') && !isHost && !proxyConnect) {
//     option.push({
//       label: 'UPDATE_KUBECONFIG',
//       value: 'cluster.update.kubeconfig',
//       icon: 'data',
//     });
//   }
//
//   if (actionKeys.includes('delete') && !isHost) {
//     option.push({
//       label: 'REMOVE_CLUSTER',
//       value: 'cluster.unbind',
//       icon: 'trash',
//     });
//   }
//
//   return option;
// }

export const getFormatTime = (ms: number, showDay: boolean) =>
  dayjs(Number(ms))
    .format(showDay ? 'MM-DD HH:mm' : 'HH:mm:ss')
    .replace(/(\d+:\d+)(:00)$/g, '$1');

export const getChartData = ({
  type,
  unit,
  xKey = 'time',
  legend = [],
  valuesData = [],
  dot = 2,
  workload_kind,
}: {
  type?: string;
  unit?: string;
  xKey?: string;
  legend?: string[];
  valuesData?: [ValueType, ValueType][];
  dot?: number;
  workload_kind?: string;
}) => {
  /*
    build a value map => { 1566289260: {...} }
    e.g. { 1566289260: { 'utilisation': 30.2 } }
  */
  let minX = 0;
  let maxX = 0;
  const valueMap: Record<number, Record<string, number | null>> = {};
  valuesData.forEach((values, index) => {
    values.forEach(item => {
      const time = parseInt(get(item, [0], 0), 10);
      const value = get(item, [1]);
      const key = get(legend, [index]);

      if (time && !valueMap[time]) {
        valueMap[time] = legend.reduce<Record<string, number | null>>((obj, xAxisKey) => {
          if (!obj[xAxisKey]) obj[xAxisKey] = null;
          return obj;
        }, {});
      }

      if (key !== undefined && key !== null && valueMap[time]) {
        const newValue =
          value === '-1' ? null : getValueByUnit(value, isUndefined(unit) ? type : unit, dot);

        if (workload_kind === 'StatefulSet') {
          if (!(valueMap[time][key] && !newValue)) {
            valueMap[time][key] = newValue;
          }
        } else {
          valueMap[time][key] = newValue;
        }
      }

      if (!minX || minX > time) minX = time;
      if (!maxX || maxX < time) maxX = time;
    });
  });

  const showDay = maxX - minX > 3600 * 24;
  const formatter = (key: string) =>
    xKey === 'time' ? getFormatTime(Number(key) * 1000, showDay) : key;

  // generate the chart data
  const chartData = Object.entries(valueMap).map(([key, value]) => ({
    [xKey]: formatter(key),
    ...value,
  }));

  return chartData;
};

export const getAreaChartOps = ({
  type,
  title,
  unitType,
  xKey = 'time',
  legend = [],
  data = [],
  ...rest
}: {
  type?: string;
  title: string;
  unitType?: string;
  xKey?: string;
  legend?: string[];
  unit?: string;
  dot?: number;
  data: { values: [number, string] }[];
  renderTooltip?: (payload: any[]) => React.ReactNode;
  workload_kind?: string;
}) => {
  const seriesData = isArray(data) ? data : [];
  const valuesData = seriesData.map(result => get(result, 'values') || []);

  const unit = unitType ? getSuitableUnit(flatten(valuesData), unitType) : rest.unit;

  const chartData = getChartData({
    type,
    unit,
    xKey,
    legend,
    valuesData,
    dot: rest.dot,
    workload_kind: rest.workload_kind,
  });

  return {
    ...rest,
    title,
    unit,
    data: chartData,
  };
};

export const getSuitableValue = (
  value: unknown,
  unitType = 'default',
  defaultValue: ValueType = 0,
) => {
  if ((!isNumber(value) && !isString(value)) || isNaN(Number(value))) {
    return defaultValue;
  }

  const unit = getSuitableUnit(value, unitType);

  const count = getValueByUnit(value, unit || unitType);
  const unitText = coreUnitTS(count, unit);

  return `${count} ${t(unitText)}`;
};

export function getValueText(val: { value: unknown }, unitType?: string): string {
  const value: number = get(val, 'value[1]', 0);
  const unit = getSuitableUnit(value, unitType ?? '');
  const result = getValueByUnit(value.toString(), unit).toString();

  return unit ? `${result} ${unit}` : result;
}

export const getZeroValues = () => {
  const values: any = [];
  let time = parseInt((Date.now() / 1000).toString(), 10) - 6000;
  for (let i = 0; i < 10; i++) {
    values[i] = [time, 0];
    time += 600;
  }
  return values;
};

export const getColorByName = (colorName = '#fff') => get(COLORS_MAP, colorName, colorName);
