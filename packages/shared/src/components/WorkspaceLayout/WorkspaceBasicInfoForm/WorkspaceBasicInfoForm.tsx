/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useImperativeHandle, forwardRef } from 'react';
import type { Ref } from 'react';
import { assign } from 'lodash';
import { FormItem, useForm, Input, FormInstance, Textarea } from '@kubed/components';

import { workspaceStore } from '../../../stores';
import { Pattern } from '../../../constants';
import { WorkspaceManagerField } from './WorkspaceManagerField';
import { StyledForm } from './WorkspaceBasicInfoForm.styles';
import type { OriginalWorkspace, WorkspaceFormValues } from '../../../types';

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

  // TODO 新增克空间管理员名字
  function setManagerName(value: string) {
    form.setFieldValue(['metadata', 'annotations', 'kubesphere.io/manager-name'], value);
  }

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
              if (value === 'workspaces') {
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
      {!isHideManagerFiled && (
        <WorkspaceManagerField manager={manager} setManagerName={setManagerName} />
      )}
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
