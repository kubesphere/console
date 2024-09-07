/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useImperativeHandle, forwardRef } from 'react';
import type { Ref } from 'react';
import { assign } from 'lodash';
import { FormItem, useForm, Input, FormInstance, Textarea } from '@kubed/components';

import type { OriginalWorkspace, WorkspaceFormValues } from '@ks-console/shared';
import { Pattern, workspaceStore } from '@ks-console/shared';
import { WorkspaceManagerField } from './WorkspaceManagerField';
import { StyledForm } from './WorkspaceBasicInfoForm.styles';

const { nameValidator } = workspaceStore;

interface WorkspaceBasicInfoFormProps {
  initialValues?: OriginalWorkspace;
  isHideManagerFiled?: boolean;
  manager?: string;
  onOk?: (value: WorkspaceFormValues) => void;
}

interface WorkspaceBasicInfoFormRef {
  form: FormInstance<WorkspaceFormValues>;
}

function WorkspaceBasicInfoForm(
  { initialValues = {}, isHideManagerFiled, manager = '', onOk }: WorkspaceBasicInfoFormProps,
  ref: Ref<WorkspaceBasicInfoFormRef> | undefined,
) {
  const [form] = useForm<WorkspaceFormValues>();

  useImperativeHandle(ref, () => {
    return {
      form,
    };
  });

  return (
    <StyledForm
      form={form}
      initialValues={initialValues}
      onFinish={(formValues: WorkspaceFormValues) => {
        let baseData: Record<string, any> = {
          apiVersion: 'iam.kubesphere.io/v1beta1',
          kind: 'WorkspaceTemplate',
        };
        if (isHideManagerFiled) {
          baseData = {};
        }

        const params = assign(baseData, formValues);
        onOk?.(params);
      }}
    >
      <FormItem
        name={['metadata', 'name']}
        label={t('NAME')}
        help={t('NAME_DESC')}
        rules={[
          {
            required: true,
            message: t('WORKSPACE_NAME_EMPTY_DESC'),
          },
          {
            pattern: Pattern.PATTERN_NAME,
            message: t('INVALID_NAME_DESC'),
          },
          {
            validator: async (rule, value) => {
              if (value === 'workspaces' || value === 'clusters' || value === 'cluster') {
                return Promise.reject(t('current name is not available'));
              }

              return nameValidator({ name: value });
            },
          },
        ]}
      >
        <Input autoComplete="off" autoFocus={true} maxLength={63} disabled={isHideManagerFiled} />
      </FormItem>
      <FormItem
        label={t('ALIAS')}
        help={t('ALIAS_DESC')}
        name={['metadata', 'annotations', 'kubesphere.io/alias-name']}
      >
        <Input autoComplete="off" maxLength={63} />
      </FormItem>
      {!isHideManagerFiled && <WorkspaceManagerField manager={manager} />}
      <FormItem
        label={t('DESCRIPTION')}
        help={t('DESCRIPTION_DESC')}
        name={['metadata', 'annotations', 'kubesphere.io/description']}
      >
        <Textarea maxLength={256} rows={3} />
      </FormItem>
    </StyledForm>
  );
}

export type { WorkspaceBasicInfoFormRef };

export default forwardRef(WorkspaceBasicInfoForm);
