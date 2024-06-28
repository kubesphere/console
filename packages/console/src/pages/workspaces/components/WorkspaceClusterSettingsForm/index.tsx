import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import { FormInstance, FormItem, useForm } from '@kubed/components';
import { ClusterSelect } from '@ks-console/shared';

import { StyledForm } from './styles';

interface WorkspaceClusterSettingsFormValues {
  spec: {
    placement: {
      clusters: string;
    };
  };
}

interface WorkspaceClusterSettingsFormProps {
  onOk: (formValues: WorkspaceClusterSettingsFormValues) => void;
}

interface WorkspaceClusterSettingsFormRef {
  form: FormInstance<WorkspaceClusterSettingsFormValues>;
}

function WorkspaceClusterSettingsForm(
  { onOk }: WorkspaceClusterSettingsFormProps,
  ref: Ref<WorkspaceClusterSettingsFormRef>,
) {
  const [form] = useForm<WorkspaceClusterSettingsFormValues>();
  useImperativeHandle(ref, () => {
    return { form };
  });

  return (
    <StyledForm
      form={form}
      onFinish={(values: WorkspaceClusterSettingsFormValues) => {
        onOk?.(values);
      }}
    >
      <FormItem label={t('AVAILABLE_CLUSTERS')} name={['spec', 'placement', 'clusters']}>
        <ClusterSelect />
      </FormItem>
    </StyledForm>
  );
}

export type { WorkspaceClusterSettingsFormValues, WorkspaceClusterSettingsFormRef };

export default forwardRef(WorkspaceClusterSettingsForm);
