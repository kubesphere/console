/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cpuFormat, memoryFormat } from '@ks-console/shared';
import { Alert, Select } from '@kubed/components';
import { Check, Cpu, Memory } from '@kubed/icons';
import { get, isEmpty, isNil, isNumber, isUndefined, set } from 'lodash';
import * as React from 'react';
import InputWithUnit from '../InputNumberWithUnit';
import { AlertContent, AlertWrapper, InputItem, InputLimit, Wrapper } from './styles';

type LimitValueType = string | number | undefined;

interface ILimitValue {
  limit?: {
    cpu?: LimitValueType;
    memory?: LimitValueType;
    [key: string]: LimitValueType;
  };
  request?: {
    cpu?: LimitValueType;
    memory?: LimitValueType;
    [key: string]: LimitValueType;
  };
}

interface Props {
  value?: ILimitValue;
  defaultValue?: ILimitValue;
  onChange?: (value: ILimitValue) => void;
  onError?: (error?: string | boolean | undefined) => void;
  supportGpuSelect?: boolean;
  cpuProps?: {
    unit?: string;
  };
  memoryProps?: {
    unit?: string;
  };
  workspaceLimitProps?: ILimitValue & { gpuLimit: Record<string, LimitValueType>[] };
}

const getGpuFromProps = (valueProp: Record<string, any>) => {
  const value = get(valueProp, 'value', get(valueProp, 'defaultValue'));
  const supportGpuType: string[] = globals.config.supportGpuType;
  if (!value) {
    return {
      type: supportGpuType[0],
      value: '',
    };
  }
  // The value may not have requests field
  const types = Object.keys(get(value, 'requests', {})).find(key =>
    supportGpuType.some(item => key.endsWith(item)),
  );
  const type = types || supportGpuType[0];
  return {
    type,
    value: !isEmpty(types) ? get(value, `requests["${type}"]`, '') : '',
  };
};

const allowInputDot = (formatNum: any, unit: string, formatFn: Function, isMemory = false) => {
  if (formatNum === Infinity) {
    return formatNum;
  }

  const inputNum = formatNum && isMemory ? formatNum.slice(0, -2) : formatNum;

  if (inputNum && String(inputNum).endsWith('.')) {
    const number = formatFn(formatNum, unit);
    return `${number}.`;
  }

  if (inputNum && String(inputNum).endsWith('.0')) {
    const number = formatFn(formatNum, unit);
    return `${number}.0`;
  }

  return formatFn(formatNum, unit);
};

const getDefaultRequestValue = (props: Props, key: string) => {
  return get(
    props,
    `value.requests.${key}`,
    get(
      props,
      `value.['requests.${key}']`,
      get(props, `defaultValue.requests.${key}`, get(props, `defaultValue.['requests.${key}']`)),
    ) ?? undefined,
  );
};

const getDefaultLimitValue = (props: Props, key: string) => {
  return get(
    props,
    `value.limits.${key}`,
    get(
      props,
      `value.['limits.${key}']`,
      get(props, `defaultValue.limits.${key}`, get(props, `defaultValue.['limits.${key}']`)),
    ) ?? undefined,
  );
};

const getWorkspaceRequestLimit = (props: Props, key: string) => {
  return get(
    props,
    `workspaceLimitProps.requests.${key}`,
    get(props, `workspaceLimitProps['requests.${key}']`, 'Not Limited'),
  );
};

const getWorkspaceLimitValue = (props: Props, key: string) => {
  return get(
    props,
    `workspaceLimitProps.limits.${key}`,
    get(props, `workspaceLimitProps['limits.${key}']`, 'Not Limited'),
  );
};

const getValue = (props: Props) => {
  const cpuUnit = get(props, 'cpuProps.unit', 'Core');
  const memoryUnit = get(props, 'memoryProps.unit', 'Mi');

  const requestCpu = getDefaultRequestValue(props, 'cpu');
  const requestMeo = getDefaultRequestValue(props, 'memory');
  const limitCpu = getDefaultLimitValue(props, 'cpu');
  const limitMeo = getDefaultLimitValue(props, 'memory');

  const cpuRequests = allowInputDot(requestCpu, cpuUnit, cpuFormat);

  const memoryRequests = allowInputDot(requestMeo, memoryUnit, memoryFormat, true);

  const cpuLimits = allowInputDot(limitCpu, cpuUnit, cpuFormat);

  const memoryLimits = allowInputDot(limitMeo, memoryUnit, memoryFormat, true);

  const workspaceReqMeo = memoryFormat(`${getWorkspaceRequestLimit(props, 'memory')}`, memoryUnit);

  const workspaceMeoLimit = memoryFormat(`${getWorkspaceLimitValue(props, 'memory')}`, memoryUnit);

  const workspaceCpuRequests = cpuFormat(getWorkspaceRequestLimit(props, 'cpu'), cpuUnit);

  const workspaceCpuLimits = cpuFormat(getWorkspaceLimitValue(props, 'cpu'), cpuUnit);

  return {
    requests: {
      cpu: cpuRequests,
      memory: memoryRequests,
    },
    limits: {
      cpu: cpuLimits,
      memory: memoryLimits,
    },
    workspaceRequests: {
      cpu:
        !isNumber(workspaceCpuRequests) || isNaN(workspaceCpuRequests)
          ? 'Not Limited'
          : workspaceCpuRequests,
      memory:
        !isNumber(workspaceReqMeo) || isNaN(workspaceReqMeo) ? 'Not Limited' : workspaceReqMeo,
    },
    workspaceLimits: {
      cpu:
        !isNumber(workspaceCpuLimits) || isNaN(workspaceCpuLimits)
          ? 'Not Limited'
          : workspaceCpuLimits,
      memory:
        !isNumber(workspaceMeoLimit) || isNaN(workspaceMeoLimit)
          ? 'Not Limited'
          : workspaceMeoLimit,
    },
    gpu: getGpuFromProps(props),
  };
};

const checkNumOutLimit = (num: LimitValueType, limit: LimitValueType) => {
  if (limit !== 'Not Limited') {
    return isFinite(Number(num)) && Number(num) > (limit as number) ? 'workspaceRequestExceed' : '';
  }
  return '';
};

const ResourceLimit = (props: Props) => {
  const {
    cpuProps: { unit: cpuUnit = 'Core' } = { unit: 'Core' },
    memoryProps: { unit: memoryUnit = 'Mi' } = { unit: 'Mi' },
    onChange,
    workspaceLimitProps,
  } = props;
  const [state, setState] = React.useState(() => getValue(props));
  const valueRef = React.useRef(props.value ?? props.defaultValue);

  React.useEffect(() => {
    const valueProp = props.value ?? props.defaultValue;
    if (valueRef.current !== valueProp) {
      setState(getValue(props));
    }
  }, [props.value, props.defaultValue, workspaceLimitProps, props.cpuProps, props.memoryProps]);

  const [workspaceLimitCheck, setWorkspaceLimitCheck] = React.useState<
    Partial<{
      requestCpuError: string;
      requestMemoryError: string;
      limitCpuError: string;
      limitMemoryError: string;
      gpuLimitError: string;
    }>
  >({});

  const [{ cpuError, memoryError }, setCheckError] = React.useState<
    Partial<{
      cpuError: string;
      memoryError: string;
    }>
  >({});

  const gpuOptions = React.useMemo(() => {
    return globals.config.supportGpuType.reduce(
      (prev: Record<string, any>[], value: string) => [
        ...prev,
        {
          value,
          label: t(value.replace(/[-/.]/g, '_').toUpperCase()),
        },
      ],
      [],
    );
  }, []);

  const checkError = (_state: Record<string, any>) => {
    let cpuError1 = '';
    let memoryError1 = '';
    const { requests, limits } = _state;

    if (
      limits.cpu &&
      !String(limits.cpu).endsWith('.') &&
      Number(requests.cpu) > Number(limits.cpu)
    ) {
      cpuError1 = 'RequestExceed';
    }

    if (
      limits.memory &&
      !String(limits.memory).endsWith('.') &&
      Number(requests.memory) > Number(limits.memory)
    ) {
      memoryError1 = 'RequestExceed';
    }
    setCheckError({ cpuError: cpuError1, memoryError: memoryError1 });
    return {
      cpuError: cpuError1,
      memoryError: memoryError1,
    };
  };

  const checkGpuOutOfLimit = (gpu: { type: string; value: number }) => {
    const { type } = gpu;
    const limitsArr: any[] = get(props, `workspaceLimitProps.gpuLimit`, []);
    const limitRes = limitsArr.filter(item => Object.keys(item)[0].endsWith(type));
    const limit = limitRes.length > 0 ? Object.values(limitRes[0])[0] : 'Not Limited';
    return checkNumOutLimit(gpu.value, limit as number);
  };

  const getWorkspaceCheckError = () => {
    return Object.keys(workspaceLimitCheck).filter(
      key => workspaceLimitCheck[key as 'requestCpuError'] !== '',
    );
  };

  const triggerChange = (newState: typeof state) => {
    const { onError = () => {} } = props;
    const { requests, limits, gpu } = newState;
    const { cpuError: cpuError1, memoryError: memoryError1 } = checkError(newState);
    const wsL = workspaceLimitCheck;
    const errorList = getWorkspaceCheckError();
    if (errorList.length > 0) {
      onError(cpuError1 || memoryError1 || wsL[errorList[0] as 'requestCpuError']);
    } else if (cpuError1 && memoryError1) {
      onError(cpuError1 || memoryError1);
    } else {
      onError('');
    }

    const result: Record<string, any> = {};

    if (!isNil(requests.cpu) && requests.cpu >= 0 && requests.cpu < Infinity) {
      set(result, 'requests.cpu', `${requests.cpu}${cpuUnit}`);
    }

    if (!isNil(requests.memory) && requests.memory >= 0 && requests.memory < Infinity) {
      set(result, 'requests.memory', `${requests.memory}${memoryUnit}`);
    }

    if (!isNil(limits.cpu) && limits.cpu >= 0 && limits.cpu < Infinity) {
      set(result, 'limits.cpu', `${limits.cpu}${cpuUnit}`);
    }
    if (!isNil(limits.memory) && limits.memory >= 0 && limits.memory < Infinity) {
      set(result, 'limits.memory', `${limits.memory}${memoryUnit}`);
    }

    // pass gpu input config into limits and requests field
    if (!!gpu.type && !!gpu.value) {
      set(result, 'limits', { ...result.limits, [`${gpu.type}`]: gpu.value });
      set(result, 'requests', {
        ...result.requests,
        [`${gpu.type}`]: gpu.value,
      });
    }

    valueRef.current = result;
    if (onChange) onChange(result);
  };

  const checkAndTrigger = (newState: typeof state) => {
    const { requests, limits, gpu, workspaceLimits: wsL, workspaceRequests: wsR } = newState;
    setWorkspaceLimitCheck({
      requestCpuError: checkNumOutLimit(requests.cpu, wsR.cpu),
      requestMemoryError: checkNumOutLimit(requests.memory, wsR.memory),
      limitCpuError: checkNumOutLimit(limits.cpu, wsL.cpu),
      limitMemoryError: checkNumOutLimit(limits.memory, wsL.memory),
      gpuLimitError: checkGpuOutOfLimit(gpu),
    });
    triggerChange(newState);
  };

  const gpuSelectChange = (type: string) => {
    const newState = {
      ...state,
      gpu: {
        type,
        value: state.gpu.value,
      },
    };
    setState(newState);
    checkAndTrigger(newState);
  };
  const handleInputChange = (name: string, value: number) => {
    set(state, name, value);

    setState({ ...state });
    checkError(state);
    checkAndTrigger(state);
  };

  const renderCpu = () => {
    return (
      <InputItem>
        <div>
          <Cpu size={48} />
        </div>
        <span>{t('CPU_REQUEST')}</span>
        <InputWithUnit
          min={0}
          value={state.requests.cpu}
          onChange={(v: number) => {
            handleInputChange('requests.cpu', v);
          }}
          error={!!cpuError || !!workspaceLimitCheck.requestCpuError}
          unit={cpuUnit}
          placeholder={t('NO_REQUEST')}
        />
        <span>{t('CPU_LIMIT')}</span>
        <InputWithUnit
          min={0}
          value={state.limits.cpu}
          onChange={(v: number) => {
            handleInputChange('limits.cpu', v);
          }}
          error={!!cpuError || !!workspaceLimitCheck.limitCpuError}
          unit={cpuUnit}
          placeholder={t('NO_LIMIT')}
        />
      </InputItem>
    );
  };

  const renderMem = () => {
    return (
      <InputItem>
        <div>
          <Memory size={48} />
        </div>
        <span>{t('MEMORY_REQUEST')}</span>
        <InputWithUnit
          value={state.requests.memory}
          onChange={(v: number) => {
            handleInputChange('requests.memory', v);
          }}
          error={!!memoryError || !!workspaceLimitCheck.requestMemoryError}
          min={0}
          unit={memoryUnit}
          placeholder={t('NO_REQUEST')}
        />
        <span>{t('MEMORY_LIMIT')}</span>
        <InputWithUnit
          value={state.limits.memory}
          onChange={(v: number) => {
            handleInputChange('limits.memory', v);
          }}
          error={!!memoryError || !!workspaceLimitCheck.limitMemoryError}
          min={0}
          unit={memoryUnit}
          placeholder={t('NO_LIMIT')}
        />
      </InputItem>
    );
  };

  const renderGpu = () => {
    return (
      <InputItem>
        <div>
          <img width={48} src="/assets/GPU.svg" alt="" />
        </div>
        <span>{t('GPU_TYPE')}</span>
        <Select
          options={gpuOptions}
          value={state.gpu.type}
          onChange={gpuSelectChange}
          placeholder=" "
        />
        <span>{t('GPU_LIMIT')}</span>
        <InputWithUnit
          min={0}
          integer
          placeholder={t('NO_LIMIT')}
          value={state.gpu.value}
          onChange={(v: number) => {
            handleInputChange('gpu.value', v);
          }}
          error={!!workspaceLimitCheck.gpuLimitError}
        />
      </InputItem>
    );
  };

  const renderAlert = () => {
    return (
      <>
        {(cpuError || memoryError) && (
          <Alert
            title={t('REQUEST_EXCEED_LIMIT')}
            children={null}
            type={'error'}
            showIcon={false}
          />
        )}
        {getWorkspaceCheckError().length > 0 && (
          <Alert
            title={t('INSUFFICENT_RESOURCES')}
            children={null}
            type={'error'}
            showIcon={false}
          />
        )}
      </>
    );
  };

  const renderWitchUnit = (unit: string, value?: number | string) => {
    return isNil(value) || value === '' ? t('NO_LIMIT') : `${value} ${unit}`;
  };

  const renderTip = () => {
    const { workspaceLimitProps: pWL } = props;
    const { gpu } = state;
    const findResult = pWL?.gpuLimit?.filter(item => {
      return isEmpty(item) ? item : Object.keys(item)[0].endsWith(gpu.type);
    })[0];
    if (isEmpty(workspaceLimitProps)) {
      return null;
    }
    return (
      <AlertWrapper>
        <Check size={32} color="#3385b0" />
        <AlertContent>
          <div>{t('AVAILABLE_QUOTAS')}</div>
          <div>
            <span>{t('RESOURCE_REQUESTS')}:</span>
            <span>{`CPU ${renderWitchUnit(
              cpuUnit,
              cpuFormat(get(workspaceLimitProps, 'requests.cpu'), cpuUnit),
            )}
            , ${t('memory')} ${renderWitchUnit(
              memoryUnit,
              memoryFormat(get(workspaceLimitProps, 'requests.memory'), memoryUnit) as number,
            )}`}</span>
          </div>
          <div>
            <span>{t('RESOURCE_LIMITS')}:</span>
            <span>{`CPU ${renderWitchUnit(
              cpuUnit,
              cpuFormat(get(workspaceLimitProps, 'limits.cpu'), cpuUnit),
            )}, ${t('memory')} ${renderWitchUnit(
              memoryUnit,
              memoryFormat(get(workspaceLimitProps, 'limits.memory'), memoryUnit) as number,
            )}`}</span>
          </div>
          {!isUndefined(findResult) && (
            <div>
              <span>{t('GPU_TYPE')}:</span>
              <span>{gpu.type}</span>
            </div>
          )}
          <div>
            <span>{t('GPU_LIMIT')}:</span>
            <span>{isUndefined(findResult) ? t('NO_LIMIT') : Object.values(findResult)[0]}</span>
          </div>
        </AlertContent>
      </AlertWrapper>
    );
  };

  return (
    <Wrapper>
      <InputLimit>
        {renderCpu()}
        {renderMem()}
        {renderGpu()}
      </InputLimit>
      {renderTip()}

      {renderAlert()}
    </Wrapper>
  );
};

export default ResourceLimit;
