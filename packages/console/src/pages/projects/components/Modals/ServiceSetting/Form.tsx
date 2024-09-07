/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Icon } from '@ks-console/shared';
import { FormItem, TypeSelect } from '@kubed/components';
import ServiceSettings, {
  ISettingsProps,
} from '../../../../../components/Forms/Service/ServiceSettings';

const HeadLessForm = (props: ISettingsProps) => {
  const renderTypeSelect = ({ type }: { type: string }) => {
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
        <TypeSelect className="margin-b12" defaultValue={type} options={types} disabled />
      </FormItem>
    );
  };

  return <ServiceSettings {...props} renderTypeSelect={renderTypeSelect} />;
};

export default HeadLessForm;
