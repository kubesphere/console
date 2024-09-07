/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get, set } from 'lodash';
import { Form, FormItem, Input } from '@kubed/components';
import { Constants } from '@ks-console/shared';
import type { FormInstance } from '@kubed/components';

interface IProps {
  module: string;
  formRef: FormInstance;
  formTemplate: Record<string, any> | undefined;
}
const { MODULE_KIND_MAP } = Constants;

export default function ExternalName({ module, formRef, formTemplate }: IProps): JSX.Element {
  const getFormTemplate = () => {
    const form = get(formTemplate, MODULE_KIND_MAP[module], formTemplate);
    if (get(form, 'spec.type') !== 'ExternalName') {
      set(form, 'spec', { type: 'ExternalName' });
    }
    return form;
  };

  return (
    <Form form={formRef} initialValues={getFormTemplate()}>
      <FormItem
        label={t('EXTERNAL_SERVICE_ADDRESS')}
        help={t('EXTERNAL_SERVICE_ADDRESS_DESC')}
        name={['spec', 'externalName']}
        rules={[
          {
            required: true,
            message: t('EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC'),
          },
        ]}
      >
        <Input placeholder={'foo.bar.example.com'} />
      </FormItem>
    </Form>
  );
}
