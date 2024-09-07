/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useImperativeHandle, forwardRef, Ref, ReactNode } from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import {
  FormItem,
  useForm,
  Input,
  FormInstance,
  Alert,
  FormItemProps,
  Form,
  Textarea,
} from '@kubed/components';
import { RoleBaseInformationFormValues } from '../../../types';

const FormAlert = styled(Alert)`
  margin-top: 12px;
`;

const StyledForm = styled(Form)`
  padding: 20px;
  .form-item {
    .input-wrapper,
    .kubed-select {
      width: 100%;
      max-width: 455px;
    }
  }
`;

export interface FormFieldProps {
  'metadata.name': {
    tooltip?: ReactNode;
    disabled?: boolean;
    rules?: FormItemProps['rules'];
  };
}

interface Props {
  workspace?: string;
  cluster?: string;
  namespace?: string;
  formFieldProps: FormFieldProps;
  initialValue?: RoleBaseInformationFormValues;
  onOk?: (value: RoleBaseInformationFormValues) => void;
}

export interface FormRef {
  form: FormInstance<RoleBaseInformationFormValues>;
}

function RoleBaseInformation(
  { initialValue, formFieldProps, onOk }: Props,
  ref: Ref<FormRef> | undefined,
): JSX.Element {
  const initialValues = initialValue ?? {};
  const [form] = useForm<RoleBaseInformationFormValues>();

  useImperativeHandle(ref, () => {
    return {
      form,
    };
  });

  return (
    <StyledForm
      form={form}
      initialValues={initialValues}
      onFinish={(formValues: RoleBaseInformationFormValues) => {
        onOk?.(formValues);
      }}
    >
      <FormItem
        name={['metadata', 'name']}
        label={t('NAME')}
        help={t('NAME_DESC')}
        tooltip={get(formFieldProps, ['metadata.name', 'tooltip'], null)}
        rules={get(formFieldProps, ['metadata.name', 'rules'], [])}
      >
        <Input
          autoComplete="off"
          autoFocus={true}
          maxLength={63}
          disabled={get(formFieldProps, ['metadata.name', 'disabled'], false)}
        />
      </FormItem>
      <FormItem
        label={t('ALIAS')}
        help={t('ALIAS_DESC')}
        name={['metadata', 'annotations', 'kubesphere.io/alias-name']}
      >
        <Input autoComplete="off" maxLength={63} />
      </FormItem>
      <FormItem
        label={t('DESCRIPTION')}
        help={t('DESCRIPTION_DESC')}
        name={['metadata', 'annotations', 'kubesphere.io/description']}
      >
        <Textarea maxLength={256} rows={3} />
      </FormItem>
      <FormAlert title={t('NEXT_STEP')}>{t('NEXT_STEP_DESC')}</FormAlert>
    </StyledForm>
  );
}

export default forwardRef(RoleBaseInformation);
