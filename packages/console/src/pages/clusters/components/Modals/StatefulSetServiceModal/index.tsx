/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { get, unset, set } from 'lodash';
import { useForm, Loading, Button } from '@kubed/components';
import { serviceStore } from '@ks-console/shared';
import Form from './Form';
import { StyledLoading, ButtonWrapper, FormWrapper } from './styles';
import type { OriginData, OriginalService } from '@ks-console/shared';

interface IProps {
  type: string;
  name?: string;
  namespace?: string;
  cluster?: string;
  serviceName?: string;
  onOk: (form: Record<string, any>) => void;
  onCancel: () => void;
}

const { fetchDetail, SERVICE_TYPES } = serviceStore;

const StatefulSetServiceModal = ({
  type,
  name,
  namespace,
  serviceName,
  cluster,
  onCancel,
  onOk,
}: IProps) => {
  const [formRef] = useForm();
  const [loading, setLoading] = useState(true);
  const [resourceVersion, setResourceVersion] = useState('');
  const [formTemplate, setFormTemplate] = useState<OriginData<OriginalService>>();

  const fetchData = async () => {
    if (name && namespace) {
      setLoading(true);
      const result = await fetchDetail({ name: serviceName, namespace, cluster });
      setResourceVersion(result.resourceVersion);
      setFormTemplate(result?._originData);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOk = () => {
    formRef.validateFields().then(form => {
      const typeFiled = get(form, 'spec.clusterIP', 'virtualIP');

      if (typeFiled === 'headlessSelector') {
        set(form, 'spec.clusterIP', 'None');
      } else {
        unset(form, 'spec.clusterIP');
      }

      set(form, 'metadata.resourceVersion', resourceVersion);
      onOk(form);
    });
  };

  const renderForm = () => {
    const serviceType =
      get(formTemplate, 'spec.clusterIP', '') === 'None' ? 'headlessSelector' : 'virtualIP';

    return (
      <>
        <FormWrapper>
          <Form formRef={formRef} formTemplate={formTemplate} serviceType={serviceType} />
        </FormWrapper>
        <ButtonWrapper>
          <Button onClick={() => onCancel()}>{t('CANCEL')}</Button>
          <Button
            onClick={type !== SERVICE_TYPES.Unknown ? handleOk : onCancel}
            shadow={true}
            color={'secondary'}
          >
            {t('OK')}
          </Button>
        </ButtonWrapper>
      </>
    );
  };

  const renderLoading = () => (
    <StyledLoading>
      <Loading />
    </StyledLoading>
  );

  return !loading ? renderForm() : renderLoading();
};

export default StatefulSetServiceModal;
