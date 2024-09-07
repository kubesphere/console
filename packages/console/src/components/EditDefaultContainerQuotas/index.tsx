/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams } from '@ks-console/shared';
import { Firewall } from '@kubed/icons';
import { get, isUndefined, mergeWith } from 'lodash';
import React from 'react';
import { useAvailableQuota } from './hooks';
import { gpuLimitsArr, quotaFormat } from './utils';
import ResourceLimit from '../ResourceLimit';
import { EditDefaultContainerQuotas as Props } from './interfaces';
import { ModalStyle } from './styles';

const { default2limit, limit2default, removeEqRequest } = quotaFormat;
const getValue = (data: Record<string, any>) => {
  return default2limit(removeEqRequest(data));
};

const setValue = (data: Record<string, any>) => {
  return limit2default(data);
};

function EditDefaultContainerQuotas(props: Props & PathParams) {
  const {
    supportGpuSelect,
    visible,
    onOk,
    onCancel,
    confirmLoading,
    detail,
    workspace,
    cluster,
    namespace,
    isFederated,
    clusters = [cluster!],
  } = props;

  const [data, setData] = React.useState(getValue(get(detail, 'limit', {})));
  // const [result, setResult] = React.useState(data);
  const [error, setError] = React.useState(false);
  const availableQuota = useAvailableQuota(
    {
      workspace,
      cluster,
      namespace,
    },
    clusters,
    isFederated,
  );

  const workspaceQuota = React.useMemo(() => {
    const nsQuota = get(availableQuota, 'namespace.data.data.hard', {});
    const wsQuota = get(availableQuota, 'workspace.data.data.hard', {});

    return mergeWith(nsQuota, wsQuota, (ns, ws) => {
      if (!ns && !ws) {
        return undefined;
      }
      if (!isUndefined(ns)) {
        return ns < ws ? ns : ws;
      }
      return ws;
    });
  }, [availableQuota]);

  const getQuotaInfo = (path: string) =>
    get(workspaceQuota, path, get(workspaceQuota, `['${path}']`, undefined));

  const getGpuLimit = React.useCallback(() => {
    // workspaceQuota in multi cluster,
    // it includes more than one type of gpu limit, is an object
    return gpuLimitsArr(workspaceQuota);
  }, [workspaceQuota]);

  const workspaceLimitProps = React.useMemo(() => {
    return {
      limits: {
        cpu: getQuotaInfo('limits.cpu'),
        memory: getQuotaInfo('limits.memory'),
      },
      requests: {
        cpu: getQuotaInfo('requests.cpu'),
        memory: getQuotaInfo('requests.memory'),
      },
      gpuLimit: getGpuLimit(),
    };
  }, [availableQuota]);

  React.useEffect(() => {
    if (detail?.limit && detail?.limit !== data) {
      setData(getValue(detail?.limit));
    }
  }, [detail?.limit]);

  const handleData = (v: Record<string, any>) => {
    setData(v);
  };
  const handleOk = () => {
    if (!error) {
      onOk?.(setValue(data));
      // onOk?.(data);
    }
  };

  return (
    <ModalStyle
      title={t('EDIT_DEFAULT_CONTAINER_QUOTAS')}
      titleIcon={<Firewall />}
      width={960}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <ResourceLimit
        value={data as any}
        onChange={handleData}
        onError={setError as any}
        supportGpuSelect={supportGpuSelect || false}
        workspaceLimitProps={workspaceLimitProps as any}
      />
    </ModalStyle>
  );
}

export default React.memo(EditDefaultContainerQuotas);
