/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, FormInstance, FormItem, Select, Field, useWatch } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { merge } from 'lodash';
import { hasKSModule } from '@ks-console/shared';

import KubeConfigForm from '../../../../components/Forms/KubeConfig';

const Wrapper = styled.div``;

const TipWrapper = styled.div`
  margin: 12px 0;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccd3db;
  background-color: #f9fbfd;
`;

interface ConnectSettingStepProps {
  form: FormInstance;
}

const ConnectSettingStep = ({ form }: ConnectSettingStepProps) => {
  const [formValue, setFormValue] = useStore('cluster:clusterForm');

  const connTypeOptions = [
    {
      label: t('CONNTECT_DIRECT'),
      value: 'direct',
    },
  ];

  if (hasKSModule('tower')) {
    connTypeOptions.push({
      label: t('CONNTECT_PROXY'),
      value: 'proxy',
    });
  }

  const connType = useWatch(['spec', 'connection', 'type'], form);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(formValue);
  }, []);

  const handleChange = () => {
    setFormValue(merge(formValue, form.getFieldsValue()));
  };

  return (
    <Wrapper>
      <Form form={form} onFieldsChange={handleChange}>
        <FormItem
          name={['spec', 'connection', 'type']}
          label={t('CONNECTION_MODE')}
          help={t('CLUSTER_CONNECT_MODE_DESC')}
        >
          <Select options={connTypeOptions} />
        </FormItem>
        {connType === 'direct' ? (
          <>
            <TipWrapper>
              <div dangerouslySetInnerHTML={{ __html: t('CLUSTER_DIRECT_IMPORT_TIP') }} />
            </TipWrapper>
            <KubeConfigForm formName={['spec', 'connection', 'kubeconfig']} />
          </>
        ) : (
          <TipWrapper>
            <Field label={t('CLUSTER_AGENT_TITLE')} value={t('CLUSTER_AGENT_DESC')} />
            <div
              dangerouslySetInnerHTML={{ __html: t('CLUSTER_AGENT_IMPORT_TIP') }}
              className="mt12"
            />
          </TipWrapper>
        )}
      </Form>
    </Wrapper>
  );
};

export default ConnectSettingStep;
