/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Alert, FormItem, Slider } from '@kubed/components';
import { Check } from '@kubed/icons';
import * as React from 'react';
import InputNumberWithUnit from '../../InputNumberWithUnit';
import { AlertContainer, AlertContent, AlertWrapper, Columns } from './styles';
import { get } from 'lodash';
import { memoryFormat } from '@ks-console/shared';

interface Props {
  workspaceLimitProps?: Record<string, any>;
  validatorMsg?: { column: string; msg: string };
}
const StorageResourceQuotaFormItems = (props: Props) => {
  const { workspaceLimitProps, validatorMsg } = props;
  const marks = [
    { value: 0, label: t('NO_REQUEST'), weight: 4 },
    { value: 409, label: 409, weight: 4 },
    { value: 819, label: 819, weight: 2 },
    { value: 1128, label: 1128, weight: 2 },
    { value: 1638, label: 1638 },
    { value: 2048, label: 2048 },
    { value: Infinity, label: t('NO_LIMIT') },
  ];

  const renderTip = () => {
    if (!workspaceLimitProps) {
      return null;
    }
    let workspaceStorage = get(workspaceLimitProps, 'requests.storage');
    let workspacePVC = get(workspaceLimitProps, 'persistentvolumeclaims');
    workspaceStorage = memoryFormat(workspaceStorage, 'Gi');
    const storageMsg = workspaceStorage
      ? t('STORAGE_VOLUME_LIMIT_HAS_A_LIMIT', { num: workspaceStorage })
      : t('STORAGE_VOLUME_LIMIT_NO_LIMIT');
    const pvcMsg = workspacePVC
      ? t('STORAGE_VOLUME_LIMIT_HAS_A_LIMIT', { num: workspacePVC })
      : t('STORAGE_VOLUME_LIMIT_NO_LIMIT');
    return (
      <AlertWrapper>
        <Check size={32} color="#3385b0" />
        <AlertContent>
          <div>{t('AVAILABLE_QUOTAS')}</div>
          <div>
            <span>{t('RESOURCE_REQUESTS')}:</span>
            <span>{`${storageMsg}, ${pvcMsg}`}</span>
          </div>
        </AlertContent>
      </AlertWrapper>
    );
  };

  return (
    <>
      <FormItem label={t('VOLUME_TOTAL_CAPACITY', { unit: 'Gi' })} name={'requests.storage'}>
        <Slider size="lg" styles={{ padding: 12, marginBottom: 12 }} marks={marks} decimals={0} />
      </FormItem>
      <Columns>
        <FormItem label={t('RESOURCE_LIMIT')} name={'requests.storage'}>
          <InputNumberWithUnit error={validatorMsg?.column === 'requests.storage'} unit="Gi" />
        </FormItem>
        <FormItem label={t('VOLUME_MAX_NUM')} name={'persistentvolumeclaims'}>
          <InputNumberWithUnit error={validatorMsg?.column === 'persistentvolumeclaims'} />
        </FormItem>
      </Columns>
      <AlertContainer>
        {renderTip()}
        {validatorMsg && (
          <Alert title={validatorMsg.msg} children={null} type={'error'} showIcon={false} />
        )}
      </AlertContainer>
    </>
  );
};

export default StorageResourceQuotaFormItems;
