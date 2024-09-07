/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { Form, FormInstance, FormItem, Input, Textarea } from '@kubed/components';
import { ClusterTagSelector, ProviderSelector, Pattern } from '@ks-console/shared';
import { merge } from 'lodash';
import type { OriginData } from '@ks-console/shared';

export interface ClusterBaseInfoFromProps {
  initialValues?: OriginData;
  form: FormInstance;
  disableName?: boolean;
  className?: string;
  onChange?: any;
}

const ClusterBaseInfoFrom = ({
  form,
  disableName,
  className,
  initialValues,
  onChange = () => {},
}: ClusterBaseInfoFromProps) => {
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, []);

  const handleChange = () => {
    onChange(merge(initialValues, form.getFieldsValue()));
  };

  return (
    <Form form={form} className={className} onFieldsChange={handleChange}>
      <FormItem
        name={['metadata', 'name']}
        label={t('CLUSTER_NAME')}
        help={t('NAME_DESC')}
        rules={[
          { required: true, message: t('CLUSTER_NAME_EMPTY') },
          {
            pattern: Pattern.PATTERN_NAME,
            message: t('INVALID_NAME_DESC'),
          },
        ]}
      >
        <Input disabled={disableName} maxLength={63} />
      </FormItem>
      <FormItem
        name={['metadata', 'labels', 'cluster.kubesphere.io/group']}
        label={t('TAG')}
        help={t('CLUSTER_TAG_DESC')}
      >
        <ClusterTagSelector />
      </FormItem>
      <FormItem name={['spec', 'provider']} label={t('PROVIDER')} help={t('CLUSTER_PROVIDER_DESC')}>
        <ProviderSelector />
      </FormItem>
      <FormItem
        name={['metadata', 'annotations', 'kubesphere.io/description']}
        label={t('DESCRIPTION')}
        help={t('DESCRIPTION_DESC')}
      >
        <Textarea maxLength={256} rows={3} />
      </FormItem>
    </Form>
  );
};

export default ClusterBaseInfoFrom;
