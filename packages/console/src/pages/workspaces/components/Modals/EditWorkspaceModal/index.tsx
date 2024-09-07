/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { Modal } from '@kubed/components';
import { Enterprise } from '@kubed/icons';

import type { OriginalWorkspace, WorkspaceFormValues } from '@ks-console/shared';
import type { WorkspaceBasicInfoFormRef } from '../../WorkspaceBasicInfoForm';
import { WorkspaceBasicInfoForm } from '../../WorkspaceBasicInfoForm';

interface EditWorkspaceModalProps {
  editWorkspace?: OriginalWorkspace;
  visible: boolean;
  confirmLoading: boolean;
  onOk: (value: WorkspaceFormValues) => void;
  onCancel: () => void;
}

function EditWorkspaceModal({
  editWorkspace,
  visible,
  confirmLoading,
  onOk,
  onCancel,
}: EditWorkspaceModalProps) {
  const formRef = useRef<WorkspaceBasicInfoFormRef>(null);
  return (
    <Modal
      visible={visible}
      titleIcon={<Enterprise size={20} />}
      title={t('EDIT_INFORMATION')}
      width={691}
      confirmLoading={confirmLoading}
      onOk={() => formRef.current?.form.submit()}
      onCancel={onCancel}
    >
      <WorkspaceBasicInfoForm
        ref={formRef}
        initialValues={editWorkspace}
        isHideManagerFiled
        onOk={onOk}
      />
    </Modal>
  );
}

export type { EditWorkspaceModalProps };

export { EditWorkspaceModal };
