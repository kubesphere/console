/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  Text,
  Row,
  Col,
  Form,
  FormItem,
  Select,
  Tooltip,
  useForm,
} from '@kubed/components';
import { Constants, Icon, AnnotationsInput, OpenELBStore } from '@ks-console/shared';
import { cloneDeep, get, set, unset, omit } from 'lodash';
import { CLUSTER_PROVIDERS_ANNOTATIONS } from './constants';
import {
  BodyWrapper,
  TitleWrapper,
  Container,
  ContentWrapper,
  OptionWrapper,
  ProviderOption,
  FooterWrapper,
} from './styles';

const defaultProvider = 'QingCloud Kubernetes Engine';
const { CLUSTER_PROVIDERS } = Constants;

const ServiceGatewaySetting = ({
  detail,
  onOK,
  onCancel,
}: {
  detail: Record<string, any>;
  onOK?: any;
  onCancel?: any;
}) => {
  const [selectMode, setSelectMode] = useState(() => {
    return get(detail._originData, 'spec.type');
  });
  const [formTemplate] = useState(cloneDeep(detail._originData));
  const [openELBOpened, setOpenELBOpened] = useState(true);
  const [provider, setProvider] = useState(defaultProvider);
  const [formRef] = useForm();

  const checkOpenELB = () => {
    const { cluster, namespace } = detail;
    let isOpened = false;

    OpenELBStore.isActive({
      clusters: [cluster],
      namespace,
    })
      .then(res => {
        isOpened = res;
      })
      .catch(() => {});

    if (!isOpened) {
      setOpenELBOpened(isOpened);
    }
  };

  useEffect(() => {
    checkOpenELB();
  }, []);

  const ACCESS_MODES = [
    { label: t('NONE'), desc: t('ACCESS_NONE_TIP'), value: 'ClusterIP' },
    {
      label: 'NodePort',
      desc: t('ACCESS_NODEPORT_TIP'),
      value: 'NodePort',
    },
    {
      label: 'LoadBalancer',
      desc: t('ACCESS_LOADBALANCER_TIP'),
      value: 'LoadBalancer',
    },
  ];

  const PROVIDER_LISTS: Record<string, any>[] = [
    ...CLUSTER_PROVIDERS,
    {
      label: 'OpenELB',
      value: 'OpenELB',
      icon: 'kubernetes',
      disabled: !openELBOpened,
      tip: '',
    },
  ];

  const PROVIDER_OPTIONS: string[] =
    provider === '' ? [] : Object.keys(CLUSTER_PROVIDERS_ANNOTATIONS[provider]);

  const handleTypeChange = (mode: string) => {
    setSelectMode(mode);
  };

  const handleProvideChange = (value: string) => {
    setProvider(value);
  };

  const handleFormData = () => {
    const fakeTemplate = cloneDeep(formTemplate);
    set(fakeTemplate, 'spec.type', selectMode);

    if (selectMode !== 'LoadBalancer') {
      Object.keys(globals.config.loadBalancerDefaultAnnotations).forEach(key => {
        unset(fakeTemplate, `metadata.annotations["${key}"]`);
      });

      PROVIDER_OPTIONS.forEach(key => {
        unset(fakeTemplate, `metadata.annotations["${key}"]`);
      });

      if (selectMode === 'ClusterIP') {
        const ports = get(fakeTemplate, 'spec.ports', []).map((port: any) =>
          omit(port, ['nodePort']),
        );

        set(fakeTemplate, 'spec.ports', ports);
      }
    } else {
      const annotations = formRef.getFieldValue(['metadata', 'annotations']);
      set(fakeTemplate, 'metadata.annotations', annotations);
    }

    return fakeTemplate;
  };

  const handleOK = () => {
    const formData = handleFormData();
    onOK?.(formData);
  };

  const renderForm = () => {
    const { Option } = Select;

    return (
      <Form form={formRef} initialValues={formTemplate}>
        <TitleWrapper>
          <Text variant="h4">{t('EXTERNAL_ACCESS')}</Text>
          <p>{t('SERVICE_EXTERNAL_ACCESS_DESC')}</p>
        </TitleWrapper>
        <Container>
          <ContentWrapper>
            <Row>
              <Col span={6}>
                <FormItem label={t('ACCESS_MODE')} name={['spec', 'type']}>
                  {({ onChange }) => (
                    <Select
                      value={selectMode}
                      optionLabelProp={'label'}
                      onChange={(type: string) => {
                        onChange(type);
                        handleTypeChange(type);
                      }}
                    >
                      {ACCESS_MODES.map(option => (
                        <Option key={option.value} value={option.value} label={option.label}>
                          <OptionWrapper>
                            <div>{option.label}</div>
                            <p>{option.desc}</p>
                          </OptionWrapper>
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              {selectMode === 'LoadBalancer' && (
                <Col span={6}>
                  <FormItem label={t('LOAD_BALANCER_PROVIDER')} name={['provider']}>
                    {({ onChange }) => (
                      <Select
                        value={provider}
                        placeholder=" "
                        optionLabelProp="label"
                        onChange={(type: string) => {
                          onChange(type);
                          handleProvideChange(type);
                        }}
                      >
                        {PROVIDER_LISTS.map(option => (
                          <Option
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            disabled={option.disabled}
                          >
                            <ProviderOption disabled={option.disabled}>
                              <Icon name={option.icon} variant="light" size={20} />
                              <span className="text">{option.label}</span>
                              {option.disabled && (
                                <Tooltip content={t('OPENELB_NOT_READY')}>
                                  <Icon name={'question'} size={16}></Icon>
                                </Tooltip>
                              )}
                            </ProviderOption>
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
              )}
            </Row>
            {selectMode === 'LoadBalancer' && (
              <FormItem label={t('ANNOTATION_PL')} name={['metadata', 'annotations']}>
                <AnnotationsInput
                  options={PROVIDER_OPTIONS.map(item => ({ label: item, value: item }))}
                  hiddenKeys={[/^kubesphere.io\//, 'openpitrix_runtime']}
                  addText={t('ADD')}
                />
              </FormItem>
            )}
          </ContentWrapper>
        </Container>
      </Form>
    );
  };

  return (
    <>
      <BodyWrapper>{renderForm()}</BodyWrapper>
      <FooterWrapper>
        <Button onClick={onCancel}>{t('CANCEL')}</Button>
        <Button onClick={handleOK} shadow={true} color={'secondary'}>
          {t('OK')}
        </Button>
      </FooterWrapper>
    </>
  );
};

export default ServiceGatewaySetting;
