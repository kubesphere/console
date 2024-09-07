/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { useForm, Loading, Button } from '@kubed/components';
import { serviceStore } from '@ks-console/shared';
import ServiceSettingsForm from './Form';
import ExternalName from '../../../../../components/Forms/Service/ExternalName';
import { BodyWrapper, StyledLoading, FooterWrapper } from './styles';

import type { OriginData, OriginalService } from '@ks-console/shared';
interface IProps {
  type: string;
  module: string;
  cluster: string;
  detail: Record<string, any>;
  onOk?: (value: OriginData) => void;
  onCancel?: () => void;
}
const { fetchDetail, SERVICE_TYPES, SERVICE_TYPES_VALUE } = serviceStore;

const EditServiceModal = ({ type, module, cluster, detail, onOk, onCancel }: IProps) => {
  const [formRef] = useForm();
  const [loading, setLoading] = useState(false);
  const [formTemplate, setFormTemplate] = useState<OriginData<OriginalService>>();

  const fetchData = async () => {
    if (detail.name && detail.namespace) {
      setLoading(true);
      const result = await fetchDetail(detail);
      setFormTemplate(result?._originData);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [detail]);

  const handleOk = () => {
    formRef.validateFields().then(() => {
      const allData = formRef.getFieldsValue(true);
      onOk?.(allData);
    });
  };

  const renderLoading = () => (
    <StyledLoading>
      <Loading />
    </StyledLoading>
  );

  const renderServiceSettings = () => {
    return (
      <>
        <ServiceSettingsForm
          module={module}
          cluster={cluster}
          form={formRef}
          formTemplate={formTemplate}
          type={SERVICE_TYPES_VALUE[type]}
        />
      </>
    );
  };

  const renderExternalName = () => {
    return <ExternalName module={module} formRef={formRef} formTemplate={formTemplate} />;
  };

  const renderEmpty = () => {
    return <p>{t('UNKNOWN_SERVICE_TYPE')}</p>;
  };

  const renderForm = () => {
    let content = null;

    switch (type) {
      case SERVICE_TYPES.VirtualIP:
      case SERVICE_TYPES.Headless:
        content = renderServiceSettings();
        break;
      case SERVICE_TYPES.ExternalName:
        content = renderExternalName();
        break;
      default:
        content = renderEmpty();
    }

    return (
      <>
        <BodyWrapper>{content}</BodyWrapper>
        <FooterWrapper>
          <Button onClick={onCancel}>{t('CANCEL')}</Button>
          <Button
            onClick={type !== SERVICE_TYPES.Unknown ? handleOk : onCancel}
            shadow={true}
            color={'secondary'}
          >
            {t('OK')}
          </Button>
        </FooterWrapper>
      </>
    );
  };

  return loading ? renderLoading() : renderForm();
};

export default EditServiceModal;
