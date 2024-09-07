/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import React, { useRef } from 'react';
import { Form, FormItem, TypeSelect } from '@kubed/components';
import { OriginData, Icon, ArrayInput, Pattern, Constants } from '@ks-console/shared';
import ServicePort from '../../../../pages/clusters/components/Inputs/ServicePort';
import SelectorsInput from './SelectorsInput';
import { FormGroup, FormGroupTitle, FormGroupDesc, GroupContent } from './styles';

import type { OriginalService } from '@ks-console/shared';
export interface ISettingsProps {
  type: string;
  module: string;
  cluster: string;
  form: any;
  formTemplate?: OriginData<OriginalService>;
  renderTypeSelect?: (props: { type: string }) => void;
}

const { PATTERN_PORT_NAME } = Pattern;
const { MODULE_KIND_MAP } = Constants;

const renderTypeSelectDefault = ({ type }: { type: string }) => {
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

  return (
    <FormItem label={t('INTERNAL_ACCESS_MODE')} name={['spec', 'clusterIP']}>
      <TypeSelect className="margin-b12" defaultValue={type} options={types} />
    </FormItem>
  );
};

const ServiceSettingsForm = ({
  form,
  cluster,
  formTemplate,
  type,
  module,
  renderTypeSelect = renderTypeSelectDefault,
}: ISettingsProps) => {
  const innerFormTemplate = useRef(get(formTemplate, MODULE_KIND_MAP[module], formTemplate));
  const namespace = useRef(get(innerFormTemplate.current, 'metadata.namespace'));

  const renderSelectorLabel = () => {
    return (
      <FormItem label={t('WORKLOAD_SELECTOR')} name={['spec', 'selector']}>
        <SelectorsInput cluster={cluster} namespace={namespace.current} addText={t('ADD')} />
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
    <Form form={form} initialValues={innerFormTemplate.current}>
      {renderTypeSelect({ type })}
      {renderSelectorLabel()}
      {renderPorts()}
    </Form>
  );
};

export default ServiceSettingsForm;
