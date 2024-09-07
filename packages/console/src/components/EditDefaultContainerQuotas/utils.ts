/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { endsWith, isUndefined, merge, pickBy, replace, set, get, trimEnd, isNil } from 'lodash';

export const gpuLimitsArr = (objData: Record<string, any>) => {
  const supportGpu: string[] = globals.config.supportGpuType;
  const gpusObj = pickBy(objData, (_, key) => supportGpu.some(type => endsWith(key, type)));
  return Object.keys(gpusObj).map(key => ({ [key]: gpusObj[key] }));
};

export const getGpuValue = (objData: Record<string, any>) => {
  const supportGpu: string[] = globals.config.supportGpuType;
  const defaultV = objData.default ?? {};
  const defaultRequestV = objData.defaultRequest ?? {};
  const getType = (data: Record<string, any>) => {
    const keys = Object.keys(data);
    return supportGpu.find(item => keys.some(key => endsWith(key, item)));
  };
  const defaultType = getType(defaultV);
  if (defaultType) {
    return {
      type: defaultType,
      value: defaultV[defaultType],
    };
  }
  const defaultRequestType = getType(defaultRequestV);
  if (defaultRequestType) {
    return {
      type: defaultRequestType,
      value: defaultRequestV[defaultRequestType],
    };
  }

  return {
    type: supportGpu[0],
    value: '',
  };
  // const gpusObj = pickBy(objData, (_, key) => supportGpu.some(type => endsWith(key, type)));
  // return Object.keys(gpusObj).map(key => ({ [key]: gpusObj[key] }));
};

export const limitsRequestEndsWithDot = ({
  limits,
  requests,
}: {
  limits: Record<string, any>;
  requests: Record<string, any>;
}) => {
  const arr = [limits, requests];
  const result: Record<string, any>[] = [];
  arr.forEach((item, index: number) => {
    const tmp = {};
    if (!isUndefined(get(item, 'cpu', undefined)) && item.cpu.endsWith('.')) {
      set(tmp, 'cpu', trimEnd(item.cpu, '.'));
    }
    if (
      !isUndefined(get(item, 'memory', undefined)) &&
      item.memory.slice(0, item.memory.length - 2).endsWith('.')
    ) {
      set(tmp, 'memory', replace(item.memory, '.', ''));
    }
    result[index] = merge(item, tmp);
  });
  return { limits: result[0], requests: result[1] };
};
export const cpuFormat = (cpu: number | string, unit = 'Core') => {
  if (isUndefined(cpu) || cpu === null || cpu === '') {
    return cpu;
  }

  const units = ['m', 'Core', 'k', 'M', 'G'];
  let currentUnit = String(cpu).slice(-1);
  // if no unit, unit = 'Core'
  const currentUnitIndex = units.indexOf(currentUnit) > -1 ? units.indexOf(currentUnit) : 1;
  const targetUnitIndex = units.indexOf(unit);
  currentUnit = units[currentUnitIndex];

  let value =
    currentUnitIndex === 1 && !String(cpu).includes('Core')
      ? Number(cpu)
      : Number(trimEnd(String(cpu), currentUnit));

  value *= 1000 ** (currentUnitIndex - targetUnitIndex);

  return Number(value.toFixed(3));
};

export const quotaFormat = {
  limit2default: (data: Record<string, any>) => {
    const result: Record<string, any> = {};
    let paths = ['default.cpu', 'default.memory', 'defaultRequest.cpu', 'defaultRequest.memory'];
    let dataPaths = ['limits.cpu', 'limits.memory', 'requests.cpu', 'requests.memory'];
    let format = {
      cpu: cpuFormat,
      memory: (d: unknown) => d,
    };
    dataPaths.forEach((path, index) => {
      const value = get(data, path);
      let formatFn = format[path.split('.')[1] as 'cpu'];
      if (!isNil(value) && value !== Infinity) {
        set(result, paths[index], String(formatFn(value)));
      }
    });
    if (globals.config.supportGpuType.length > 0) {
      const gpuType = Object.keys(get(data, 'requests', {})).find(key =>
        globals.config.supportGpuType.some((type: string) => endsWith(key, type)),
      );
      set(result, `defaultRequest['${gpuType}']`, get(data, `requests['${gpuType}']`));
      set(result, `default['${gpuType}']`, get(data, `requests['${gpuType}']`));
    }
    return result;
  },
  default2limit: (data: Record<string, any>) => {
    const result: Record<string, any> = {};
    let dataPaths = [
      'default.cpu',
      'default.memory',
      'defaultRequest.cpu',
      'defaultRequest.memory',
    ];
    let paths = ['limits.cpu', 'limits.memory', 'requests.cpu', 'requests.memory'];

    dataPaths.forEach((path, index) => {
      const value = get(data, path);
      if (!isNil(value) && value !== Infinity) {
        set(result, paths[index], value);
      }
    });

    const { type, value } = getGpuValue(data);
    if (type) {
      set(result, `requests['${type}']`, value);
    }
    return result;
  },

  /**
   * if default\.cpu is not empty, defaultRequest\.cpu is empty, defaultRequest.cpu = default.cpu
   * if default\.memory is not empty, defaultRequest\.memory is empty, defaultRequest.memory = default.memory
   * @param data
   */
  setEmptyRequest: (data: Record<string, any>) => {
    [
      ['default.cpu', 'defaultRequest.cpu'],
      ['default.memory', 'defaultRequest.memory'],
      ['limits.cpu', 'requests.cpu'],
      ['limits.memory', 'requests.memory'],
    ].forEach(([path1, path2]) => {
      if (!isNil(get(data, path1))) {
        set(data, path2, get(data, path2, get(data, path1)));
      }
    });
    return data;
  },

  /**
   * if default\.cpu === defaultRequest\.cpu remove defaultRequest\.cpu
   * if default\.memory === defaultRequest\.memory remove defaultRequest\.memory
   * if limits\.cpu === requests\.cpu remove requests\.cpu
   * if limits\.memory === requests\.memory remove requests\.memory
   * @param data
   */
  removeEqRequest: (data: Record<string, any>) => {
    [
      ['default.cpu', 'defaultRequest.cpu'],
      ['default.memory', 'defaultRequest.memory'],
      ['limits.cpu', 'requests.cpu'],
      ['limits.memory', 'requests.memory'],
    ].forEach(([path1, path2]) => {
      if (!isNil(get(data, path1)) && get(data, path1) === get(data, path2)) {
        set(data, path2, undefined);
      }
    });

    return data;
  },
};
