/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Form, FormItem, Input, useForm } from '@kubed/components';
import { Pen } from '@kubed/icons';
import * as React from 'react';
import ResourceLimit from '../ResourceLimit';

import { workspaceQuotaStore } from '@ks-console/shared';
import { get } from 'lodash';
import AppResourceQuota from './AppResourceQuota';
import StorageResourceQuota, { StorageResourceQuotaWrapper } from './StorageResourceQuota';
import { EditQuotasProps } from './interfaces';
import { ModalStyle } from './styles';
import {
  getAppResourceQuota,
  getResourceLimit,
  getStorageResourceQuota,
  resourceLimitOut,
  resourceQuotaOut,
} from './utils';
import quotaStore from '../../pages/clusters/stores/quota';

const { useFetchWorkspaceResourceQuotaQuery } = workspaceQuotaStore;
const EditQuotas = (props: EditQuotasProps) => {
  const { visible, detail = {}, onCancel, confirmLoading, onOk, isFederated, params } = props;
  const [form] = useForm<{
    name: string;
    resourceLimit: Record<string, any>;
    storageResourceQuota: Record<string, any>;
    appResourceQuota: Record<string, any>;
  }>();
  const [error, setError] = React.useState(false);

  const handleOk = () => {
    if (error) {
      return;
    }
    form.validateFields().then(v => {
      const { resourceLimit = {}, storageResourceQuota = {}, appResourceQuota = {} } = v;
      onOk?.({
        ...resourceLimitOut(resourceLimit),
        ...appResourceQuota,
        ...resourceQuotaOut(storageResourceQuota),
      });
    });
  };
  const fetchData = async () => {
    const ret = await quotaStore.checkName(params, {});
    if (ret.exist) {
      const data = await quotaStore.fetchDetail(params);
      let d = get(data, 'spec.hard');
      form.setFieldsValue({
        // name: detail?.name,
        resourceLimit: getResourceLimit(d),
        storageResourceQuota: getStorageResourceQuota(d),
        appResourceQuota: getAppResourceQuota(d),
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const { cluster, workspace } = detail;
  const { data: workspaceQuotaData } = useFetchWorkspaceResourceQuotaQuery(
    {
      enabled: !!workspace,
      cluster,
      workspace,
      name: workspace,
    },
    {
      headers: { 'x-ignore-error-notify': 'true' },
    },
  );

  // const { data, isLoading } = useQueryDetail(params);
  // React.useEffect(() => {
  //   if (isLoading) {
  //     return;
  //   }
  //   let d = get(data, 'spec.hard');
  //   console.log(form.getFieldsValue());
  //   let s = getStorageResourceQuota(d);
  //   console.log('d >>> ', data, s);
  //   form.setFieldsValue({
  //     name: detail?.name,
  //     resourceLimit: getResourceLimit(d),
  //     storageResourceQuota: s,
  //     appResourceQuota: getAppResourceQuota(d),
  //   });
  // fixme: effect loading ???
  // }, [isLoading]);

  return (
    <ModalStyle
      title={t('EDIT_PROJECT_QUOTAS')}
      titleIcon={<Pen />}
      width={960}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <div>
        <Form
          initialValues={{
            name: detail?.name,
            resourceLimit: {},
            storageResourceQuota: {},
            appResourceQuota: {
              'count/pods': undefined,
            },
          }}
          form={form}
        >
          <FormItem label={t('NAME')} name={'name'}>
            <Input disabled />
          </FormItem>
          <FormItem label={null} name={'resourceLimit'}>
            <ResourceLimit
              onError={e => {
                setError(!!e);
              }}
              workspaceLimitProps={get(workspaceQuotaData, 'spec.quota.hard')}
              memoryProps={{
                unit: 'Gi',
              }}
            />
          </FormItem>
          {/* fixme: children don't re-render */}
          <StorageResourceQuotaWrapper>
            <FormItem label={null} name="storageResourceQuota">
              <StorageResourceQuota
                workspaceLimitProps={get(workspaceQuotaData, 'spec.quota.hard')}
                params={params}
                // value={value}
                // onChange={setValue}
              />
            </FormItem>
          </StorageResourceQuotaWrapper>
          <FormItem label={t('APPLICATION_RESOURCE_QUOTAS')} name={'appResourceQuota'}>
            <AppResourceQuota isFederated={isFederated} />
          </FormItem>
        </Form>
      </div>
    </ModalStyle>
  );
};

export default EditQuotas;
