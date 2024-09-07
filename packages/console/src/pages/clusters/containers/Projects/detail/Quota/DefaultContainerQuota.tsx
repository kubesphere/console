/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cpuFormat, memoryFormat, PathParams } from '@ks-console/shared';
import { Card, Entity, Field, LoadingOverlay } from '@kubed/components';
import { Cpu, Memory } from '@kubed/icons';
import { endsWith, get, isEmpty, isNil, set } from 'lodash';
import * as React from 'react';
import { useQueryProjectLimitRanges } from '../../../../stores/project';
import { Title } from './styles';

/**
 * if default\.cpu === defaultRequest\.cpu remove defaultRequest\.cpu
 * if default\.memory === defaultRequest\.memory remove defaultRequest\.memory
 * if limits\.cpu === requests\.cpu remove requests\.cpu
 * if limits\.memory === requests\.memory remove requests\.memory
 * @param data
 */
const removeEqRequest = (data: Record<string, any>) => {
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
};

const DefaultContainerQuota = (props: { params: PathParams }) => {
  const { params } = props;
  const { data, isFetching } = useQueryProjectLimitRanges(params);

  const detail = get(data, '[0]');
  if (detail?.limit) {
    detail.limit = removeEqRequest(detail.limit);
  }

  const cpuLimit = cpuFormat(get(detail, 'limit.default.cpu'));
  const cpuRequest = cpuFormat(get(detail, 'limit.defaultRequest.cpu'));
  const memoryLimit = memoryFormat(get(detail, 'limit.default.memory'));
  const memoryRequest = memoryFormat(get(detail, 'limit.defaultRequest.memory'));
  const supportGpu = globals.config.supportGpuType;
  const defaultRequest = get(detail, 'limit.defaultRequest', {});
  const gpuType = supportGpu.filter((type: string) =>
    Object.keys(defaultRequest).some(key => endsWith(key, type)),
  );
  const gpu = isEmpty(gpuType) ? {} : { value: defaultRequest[`${gpuType[0]}`], type: gpuType };

  return (
    <>
      <Title>{t('DEFAULT_CONTAINER_QUOTA_PL')}</Title>
      <Card className={'mb12'} padding={'8px 12px' as any}>
        <LoadingOverlay visible={isFetching} />
        <Entity bordered={false}>
          <Field
            avatar={<Cpu size={40} />}
            label={t('CPU_REQUEST')}
            value={cpuRequest ? t('CPU_REQUEST_CORE', { value: cpuRequest }) : t('NO_REQUEST_TCAP')}
          />
          <Field
            label={t('CPU_LIMIT')}
            value={cpuLimit ? t('CPU_LIMIT_CORE', { value: cpuLimit }) : t('NO_LIMIT_TCAP')}
          />
          <Field
            avatar={<Memory size={40} />}
            label={t('MEMORY_REQUEST')}
            value={
              memoryRequest
                ? t('MEMORY_REQUEST_MIB', { value: memoryRequest })
                : t('NO_REQUEST_TCAP')
            }
          />
          <Field
            label={t('MEMORY_LIMIT')}
            value={memoryLimit ? t('MEMORY_LIMIT_MIB', { value: memoryLimit }) : t('NO_LIMIT_TCAP')}
          />
          {/* TODO replace gpu icon */}
          <Field
            avatar={<Cpu size={40} />}
            label={t('GPU_TYPE')}
            value={gpu.value ? gpu.type : t('NONE')}
          />
          <Field label={t('GPU_LIMIT')} value={gpu.value ? gpu.value : t('NO_LIMIT_TCAP')} />
        </Entity>
      </Card>
    </>
  );
};

export default DefaultContainerQuota;
