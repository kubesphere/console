/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { hasClusterModule, PathParams, Text } from '@ks-console/shared';
import { Tab } from '@kubed/components';
import * as React from 'react';

import { get } from 'lodash';
import storageClassStore from '../../../pages/clusters/stores/storageClass';
import FormPortal from '../../FormPortal';
import StorageLinkResourceQuota from './StorageLinkResourceQuota';
import StorageResourceQuotaFormItems from './StorageResourceQuotaFormItems';
import { Card, Description, Wrapper, TabsWrapper } from './styles';
import { useQuery } from 'react-query';

export const StorageResourceQuotaWrapper = ({ children, version }: any) => {
  return (
    <Card>
      <Text
        key={version}
        icon={'storage'}
        title={t('STORAGE_QUOTA')}
        description={<Description>{t('NS_STORAGE_QUOTA_DESC')}</Description>}
      />

      <Wrapper>{children}</Wrapper>
    </Card>
  );
};

const { fetchStorageClasses } = storageClassStore;

interface Props {
  value?: Record<string, any>;
  onChange?: (d: Record<string, any>) => void;
  params: PathParams;
  workspaceLimitProps: Record<string, any>;
}

interface ValueItem {
  persistentvolumeclaims?: string;
  'requests.storage'?: string;
}
const StorageResourceQuota = (props: Props) => {
  const {
    params: { cluster, namespace } = { cluster: '', namespace: '' },
    params,
    value = {},
    onChange,
    workspaceLimitProps,
  } = props;

  const linkResource: Record<string, ValueItem> = get(value, 'linkQuota', {});

  const linkResourceRequests = Object.values(linkResource).reduce(
    (acc, cur) => {
      if (cur['requests.storage']) {
        acc['requests.storage'] = Number(acc['requests.storage'] + cur['requests.storage']);
      }
      if (cur.persistentvolumeclaims) {
        acc.persistentvolumeclaims =
          acc.persistentvolumeclaims + Number(cur.persistentvolumeclaims);
      }
      return acc;
    },
    { 'requests.storage': 0, persistentvolumeclaims: 0 },
  );

  const handleLinkResourceChange = (vv: Record<string, ValueItem>) => {
    onChange?.({
      ...value,
      linkQuota: vv,
    });
  };

  const { data: storageList } = useQuery(
    ['storage-class-list'],
    async () => {
      const result = await fetchStorageClasses({
        cluster,
        limit: -1,
        headers: { 'x-ignore-error-notify': 'true' },
        ksApi: hasClusterModule(cluster!, 'storage-utils'),
        allowedNamespace: namespace,
      });
      return result;
    },
    {
      enabled: !!cluster,
    },
  );

  const [storageErrorMsg, setStorageErrorMsg] = React.useState<{ column: string; msg: string }>();

  const validatorStorageVsLink = (storage: Record<string, number>) => {
    if (
      linkResourceRequests['requests.storage'] &&
      linkResourceRequests['requests.storage'] > storage['requests.storage']
    ) {
      return {
        column: 'requests.storage',
        msg: t('TOTAL_STORAGE_LIMIT_LESS_THAN_RELATE_RESOURCE'),
      };
    }
    if (
      linkResourceRequests.persistentvolumeclaims &&
      linkResourceRequests.persistentvolumeclaims > storage.persistentvolumeclaims
    ) {
      return {
        column: 'persistentvolumeclaims',
        msg: t('TOTAL_STORAGE_LIMIT_LESS_THAN_RELATE_RESOURCE'),
      };
    }
    return null;
  };

  const validatorStorage = (v: Record<string, any>) => {
    const storage = get(v, 'requests.storage');
    const pvc = get(v, 'persistentvolumeclaims');

    const workspaceStorage = get(workspaceLimitProps, 'requests.storage');
    const workspacePvc = get(workspaceLimitProps, 'persistentvolumeclaims');

    let msg = validatorStorageVsLink(v);
    if (msg) {
      setStorageErrorMsg(msg);
    } else if (workspaceStorage && storage && workspaceStorage < storage) {
      setStorageErrorMsg({
        column: 'requests.storage',
        msg: t('REQUEST_EXCEED_AVAILABLE_QUOTA'),
      });
    } else if (workspacePvc && pvc && workspacePvc < parseFloat(pvc)) {
      setStorageErrorMsg({
        column: 'persistentvolumeclaims',
        msg: t('REQUEST_EXCEED_AVAILABLE_QUOTA'),
      });
    } else {
      setStorageErrorMsg(undefined);
    }
  };

  const handleChange = (v: Record<string, any>) => {
    onChange?.({
      ...value,
      ...v,
    });
    validatorStorage(v);
  };

  return (
    <TabsWrapper>
      <Tab label={t('TOTAL_STORAGE_RESOURCE')} key={'1'}>
        <Card>
          <FormPortal value={value} onChange={handleChange}>
            <StorageResourceQuotaFormItems
              workspaceLimitProps={workspaceLimitProps}
              validatorMsg={storageErrorMsg}
            />
          </FormPortal>
        </Card>
      </Tab>
      <Tab label={t('STORAGE_RELATED_RESOURCE')} key={'2'}>
        <StorageLinkResourceQuota
          storageClassList={storageList?.data}
          params={params}
          value={linkResource}
          onChange={handleLinkResourceChange}
          workspaceLimitProps={value as Record<string, any>}
        />
      </Tab>
    </TabsWrapper>
  );
};

export default StorageResourceQuota;
