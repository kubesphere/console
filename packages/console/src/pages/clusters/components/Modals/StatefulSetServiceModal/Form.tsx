/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { OriginData, Icon, ArrayInput, Pattern } from '@ks-console/shared';
import { Form, FormItem, Input, TypeSelect } from '@kubed/components';
import ServicePort from '../../Inputs/ServicePort';
import type { OriginalService } from '@ks-console/shared';

import { StyledTag, FormGroup, FormGroupTitle, FormGroupDesc, GroupContent } from './styles';

interface IProps {
  serviceType: string;
  formRef: any;
  formTemplate?: OriginData<OriginalService>;
}

const { PATTERN_PORT_NAME } = Pattern;

const ServiceForm = ({ serviceType, formRef, formTemplate }: IProps) => {
  const types = [
    {
      icon: <Icon name="cluster" size={40} />,
      label: t('VIRTUAL_IP_TITLE'),
      description: t('VIRTUAL_IP_DESC'),
      value: 'virtualIP',
    },
    {
      icon: <Icon name="blockchain" size={40} />,
      label: t('INTERNAL_DOMAIN_NAME'),
      description: t('INTERNAL_DOMAIN_NAME_DESC'),
      value: 'headlessSelector',
    },
  ];

  const renderName = () => {
    return (
      <FormItem label={t('NAME')} name={['metadata', 'name']}>
        <Input disabled />
      </FormItem>
    );
  };

  const renderTypeSelect = () => {
    return (
      <FormItem label={t('INTERNAL_ACCESS_MODE')} name={['spec', 'clusterIP']}>
        <TypeSelect className="mb12" defaultValue={serviceType} options={types} disabled />
      </FormItem>
    );
  };

  const renderSelectorLabel = () => {
    const selectors: Record<string, any> = get(formTemplate, 'spec.selector', {});

    return (
      <FormItem label={t('SELECTOR')}>
        <div>
          {Object.keys(selectors).map(key => (
            <StyledTag title={key} key={key} color="secondary">
              {selectors[key]}
            </StyledTag>
          ))}
        </div>
      </FormItem>
    );
  };

  const portsValidator = (rule: any, value: any, callback: (error?: any) => void) => {
    if (!value) {
      return callback();
    }

    if (value.length > 0) {
      const names: string[] = [];
      value.forEach((item: { name?: string; port?: string }) => {
        if (!item.name || !item.port) {
          return callback(t('INVALID_PORT'));
        }

        if (names.includes(item.name)) {
          return callback(t('PORT_INPUT_DESC'));
        }

        if (item.name && (item.name.length > 63 || !PATTERN_PORT_NAME.test(item.name))) {
          return callback(t('PORT_NAME_DESC'));
        }

        names.push(item.name);
      });
    }

    return callback();
  };

  const renderPorts = () => {
    return (
      <FormGroup>
        <div>
          <FormGroupTitle>{t('PORT_PL')}</FormGroupTitle>
          <FormGroupDesc>{t('SERVICE_PORTS_DESC')}</FormGroupDesc>
        </div>
        <GroupContent>
          <FormItem
            name={['spec', 'ports']}
            rules={[{ required: true, message: t('PORT_EMPTY') }, { validator: portsValidator }]}
          >
            <ArrayInput itemType="object" desc={t('SERVICE_PORTS_DESC')} addText={t('ADD')}>
              <ServicePort />
            </ArrayInput>
          </FormItem>
        </GroupContent>
      </FormGroup>
    );
  };

  return (
    <Form form={formRef} initialValues={formTemplate}>
      {renderName()}
      {renderTypeSelect()}
      {renderSelectorLabel()}
      {renderPorts()}
    </Form>
  );
};

export default ServiceForm;
