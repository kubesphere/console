/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get, isEmpty, merge } from 'lodash';
import { FormInstance as RcFormInstance } from 'rc-field-form';
import {
  GatewayFormValues,
  hasClusterModule,
  Constants,
  OriginData,
  OriginalGateway,
} from '@ks-console/shared';
import { Form, FormInstance, FormItem, Select, Switch } from '@kubed/components';
import { Kubernetes, Loadbalancer } from '@kubed/icons';
import { CLUSTER_PROVIDERS, CLUSTER_PROVIDERS_ANNOTATIONS, GATEWAY_TEMPLATE } from '../constants';
import {
  StyledModal,
  StyledNavs,
  Wrapper,
  Content,
  Area,
  Tips,
  Option,
  LoadBalancer,
  PropertiesInputWrapper,
  StyledAutoComplete,
} from './styles';

interface Props {
  visible: boolean;
  template?: OriginData<OriginalGateway> | null;
  onOk?: (data: GatewayFormValues) => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
}

const typeOptions = [
  { label: 'NodePort', value: 'NodePort' },
  { label: 'LoadBalancer', value: 'LoadBalancer' },
];

const providers = [
  ...CLUSTER_PROVIDERS,
  {
    label: 'OpenELB',
    value: 'OpenELB',
    icon: <Kubernetes />,
  },
].map(t => ({
  label: (
    <Option>
      {cloneElement(t.icon, {
        size: 20,
        color: 'rgba(255, 255, 255, 0.9)',
        fill: 'rgba(255, 255, 255, 0.4)',
      })}
      {t.label}
    </Option>
  ),
  value: t.value,
}));

function GatewaySetting({ visible, template, onOk, onCancel, confirmLoading }: Props) {
  const { cluster } = useParams();
  const formRef = useRef<FormInstance<GatewayFormValues>>(null);
  const [okBtnDisabled, setOkBtnDisabled] = useState<boolean>(false);
  const initialValues = template ?? GATEWAY_TEMPLATE;
  const [ServiceType, setServiceType] = useState<string>(
    get(initialValues, 'spec.service.type', 'NodePort'),
  );
  const [options, setOptions] = useState<string[]>();

  useEffect(() => {
    const annotations = get(initialValues, 'spec.service.annotations');
    const type = get(initialValues, 'spec.service.type');
    const annotationType = get(initialValues, "metadata.annotations['kubesphere.io/annotations']");
    if (
      isEmpty(annotations) &&
      type === 'LoadBalancer' &&
      annotationType === 'QingCloud Kubernetes Engine'
    ) {
      formRef.current?.setFieldValue(
        ['spec', 'service', 'annotations'],
        globals.config.loadBalancerDefaultAnnotations,
      );
    }
    if (annotationType) {
      setOptions(Object.keys(CLUSTER_PROVIDERS_ANNOTATIONS[annotationType]));
    }
  }, [initialValues, formRef.current]);

  const checked = get(
    initialValues,
    'spec.deployment.annotations["servicemesh.kubesphere.io/enabled"]',
    false,
  );

  const isChecked = checked === 'true';

  const handleTracingChange = (value: boolean) => {
    formRef.current?.setFieldValue(
      ['spec', 'deployment', 'annotations', 'servicemesh.kubesphere.io/enabled'],
      value,
    );
  };

  const onNavChange = (type: string, { getFieldValue, setFieldValue }: RcFormInstance) => {
    const annotations = getFieldValue(['spec', 'service', 'annotations']) || {};
    if (type === 'LoadBalancer') {
      setFieldValue(
        ['spec', 'service', 'annotations'],
        isEmpty(annotations) ? globals.config.loadBalancerDefaultAnnotations : annotations,
      );

      setFieldValue(
        ['metadata', 'annotations', 'kubesphere.io/annotations'],
        'QingCloud Kubernetes Engine',
      );
    } else {
      setFieldValue(['spec', 'service', 'annotations'], {});

      setFieldValue(['metadata', 'annotations', 'kubesphere.io/annotations'], '');
    }
  };

  const handleAnnotations = (value: string, { setFieldValue }: RcFormInstance) => {
    setOptions(Object.keys(CLUSTER_PROVIDERS_ANNOTATIONS[value]));
    setFieldValue(
      ['spec', 'service', 'annotations'],
      value === 'QingCloud Kubernetes Engine' ? globals.config.loadBalancerDefaultAnnotations : {},
    );
  };

  return (
    <StyledModal
      width={960}
      title={t('ENABLE_GATEWAY')}
      description={t('ENABLE_GATEWAY_DESC')}
      titleIcon={<Loadbalancer size={32} />}
      confirmLoading={confirmLoading}
      onOk={() => {
        formRef.current?.submit();
      }}
      onCancel={onCancel}
      visible={visible}
      okButtonProps={{
        disabled: okBtnDisabled,
      }}
    >
      <Wrapper>
        <Form
          ref={formRef}
          initialValues={initialValues}
          onFinish={data => {
            onOk?.(merge(initialValues, data));
          }}
        >
          <FormItem name={['spec', 'service', 'type']} label={t('ACCESS_MODE')}>
            {({ value, onChange }, meta, form) => {
              return (
                <StyledNavs
                  data={typeOptions}
                  value={value}
                  onChange={(type: string) => {
                    setServiceType(type);
                    onChange(type);
                    onNavChange(type, form);
                  }}
                ></StyledNavs>
              );
            }}
          </FormItem>
          <Content>
            {hasClusterModule(cluster as string, 'servicemesh') && (
              <Area>
                <Switch label={t('TRACING')} checked={isChecked} onChange={handleTracingChange} />
                <Tips dangerouslySetInnerHTML={{ __html: t('GATEWAY_TRACING_TIP') }}></Tips>
              </Area>
            )}
            {ServiceType === 'LoadBalancer' && (
              <>
                <LoadBalancer>
                  <FormItem
                    label={t('LOAD_BALANCER_PROVIDER')}
                    name={['metadata', 'annotations', 'kubesphere.io/annotations']}
                  >
                    {({ value, onChange }, meta, form) => (
                      <Select
                        value={value}
                        dropdownMatchSelectWidth={396}
                        placeholder=""
                        optionLabelProp="value"
                        onChange={(newVal: string) => {
                          handleAnnotations(newVal, form);
                          onChange(newVal);
                        }}
                        options={providers}
                      ></Select>
                    )}
                  </FormItem>
                </LoadBalancer>
                <Area>
                  <FormItem label={t('ANNOTATION_PL')} name={['spec', 'service', 'annotations']}>
                    <PropertiesInputWrapper
                      itemProps={{
                        keyProps: {
                          component: StyledAutoComplete,
                          options: (options || Constants.INGRESS_ANNOTATIONS).map(t => ({
                            label: t,
                            value: t,
                          })),
                        },
                      }}
                    />
                  </FormItem>
                </Area>
              </>
            )}
            <Area>
              <FormItem label={t('CONFIGURATION_OPTIONS')} name={['spec', 'controller', 'config']}>
                <PropertiesInputWrapper onError={err => setOkBtnDisabled(!!err)} />
              </FormItem>
            </Area>
          </Content>
        </Form>
      </Wrapper>
    </StyledModal>
  );
}

export default GatewaySetting;
