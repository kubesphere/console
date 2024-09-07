/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { FormInstance } from '@kubed/components';
import { FormItem } from '@kubed/components';

import type { EnterLicenseFormValues } from './types';
import { StyledForm, StyledTextarea } from './EnterLicenseForm.styles';

interface EnterLicenseFormProps {
  form: FormInstance<EnterLicenseFormValues>;
}

export function EnterLicenseForm({ form }: EnterLicenseFormProps) {
  return (
    <StyledForm form={form}>
      <FormItem
        name="raw"
        label={t('ACTIVATION_CODE')}
        rules={[{ required: true, message: t('ENTER_ACTIVATION_CODE_TIP') }]}
      >
        <StyledTextarea />
      </FormItem>
    </StyledForm>
  );
}
