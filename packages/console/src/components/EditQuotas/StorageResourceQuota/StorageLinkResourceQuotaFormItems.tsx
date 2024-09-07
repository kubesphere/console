/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams, StorageClassDetail, Text, memoryFormat } from '@ks-console/shared';
import { FormItem } from '@kubed/components';
import { Database } from '@kubed/icons';
import * as React from 'react';
import RecordSelect from '../../RecordSelect';
import StorageResourceQuotaFormItems from './StorageResourceQuotaFormItems';
import { Columns, Description } from './styles';
import { get } from 'lodash';
import FormPortal from '../../FormPortal';

interface Props {
  storageClassList: StorageClassDetail[];
  params: PathParams;
  workspaceLimitProps?: Record<string, any>;
  value?: Record<string, any>;
  onChange?: (d: Record<string, any>) => void;
  onCancel?: () => void;
}

const StorageLinkResourceQuotaFormItems = (props: Props) => {
  const { storageClassList: data = [], workspaceLimitProps, value, onChange, onCancel } = props;

  const renderOption = (record: Record<string, any>) => {
    return (
      <Columns key={record.name}>
        <Text title={record.name} description={<Description>{t('name')}</Description>} />
        <Text title="" description={<Description>{t('VOLUME_COUNT')}</Description>} />
        <Text
          title={record.provisioner}
          description={<Description>{t('PROVISIONER')}</Description>}
        />
      </Columns>
    );
  };
  const placeholder = (
    <Text
      title={t('SELECT_STORAGE_CLASS')}
      description={<Description>{t('SET_RELATED_STORAGE_CLASS_QUOTA')}</Description>}
    />
  );

  const [storageErrorMsg, setStorageErrorMsg] = React.useState<{ column: string; msg: string }>();

  const validateStorage = (v: {
    name?: string;
    persistentvolumeclaims?: number | string;
    'requests.storage'?: number;
  }) => {
    const storage = get(v, 'requests.storage');
    const pvc = get(v, 'persistentvolumeclaims');

    const workspaceStorage = get(workspaceLimitProps, 'requests.storage');
    const workspacePvc = get(workspaceLimitProps, 'persistentvolumeclaims');
    let msg;
    if (workspaceStorage && storage && workspaceStorage < storage) {
      msg = {
        column: 'requests.storage',
        msg: t('REQUEST_EXCEED_AVAILABLE_QUOTA'),
      };
    } else if (workspacePvc && pvc && workspacePvc < parseFloat(pvc as string)) {
      msg = {
        column: 'persistentvolumeclaims',
        msg: t('REQUEST_EXCEED_AVAILABLE_QUOTA'),
      };
    } else {
      msg = undefined;
    }
    setStorageErrorMsg(msg);
    return msg;
  };

  return (
    <div style={{ position: 'relative', height: 40 }}>
      <FormPortal
        type="manual"
        absoluteWrapper
        value={value}
        onCancel={onCancel}
        validator={v => {
          let msg = validateStorage(v);
          return !!v.name && !msg;
        }}
        onSubmit={v => {
          onChange?.(v!);
        }}
      >
        <FormItem label={t('NAME')} name={'name'}>
          <RecordSelect<StorageClassDetail>
            icon={<Database size={40} />}
            placeholder={placeholder}
            renderOption={renderOption}
            options={data.map(i => ({ ...i, value: i.name }))}
            // infiniteProps={
            //   {
            //     ...storageClassRes,
            //     onLoadMore: storageClassRes?.fetchNextPage,
            //   } as any
            // }
          />
        </FormItem>
        <StorageResourceQuotaFormItems
          workspaceLimitProps={workspaceLimitProps}
          validatorMsg={storageErrorMsg}
        />
      </FormPortal>
    </div>
  );
};

export default StorageLinkResourceQuotaFormItems;
