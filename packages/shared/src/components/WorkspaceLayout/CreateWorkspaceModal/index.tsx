/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useRef } from 'react';
import { get, set } from 'lodash';
import { Modal, Steps, Button, TabStep } from '@kubed/components';
import { Cluster, Enterprise, Appcenter } from '@kubed/icons';
import { isMultiCluster } from '../../../utils';
import type { WorkspaceFormValues } from '../../../types';
import type { WorkspaceBasicInfoFormRef } from '../WorkspaceBasicInfoForm';
import { WorkspaceBasicInfoForm } from '../WorkspaceBasicInfoForm';
import type {
  WorkspaceClusterSettingsFormValues,
  WorkspaceClusterSettingsFormRef,
} from '../WorkspaceClusterSettingsForm';
import WorkspaceClusterSettingsForm from '../WorkspaceClusterSettingsForm';

interface CreateWorkspacesModalProps {
  visible: boolean;
  width?: number;
  confirmLoading: boolean;
  onOk: (data: WorkspaceFormValues) => void;
  onCancel: () => void;
}

function CreateWorkspacesModal({
  visible,
  width = 691,
  confirmLoading,
  onOk,
  onCancel,
}: CreateWorkspacesModalProps) {
  const manager = globals.user.username;
  const [active, setActive] = useState(0);
  const [baseInfo, setBaseInfo] = useState<WorkspaceFormValues>({} as WorkspaceFormValues);
  const formRef = useRef<WorkspaceBasicInfoFormRef>(null);
  const clusterFormRef = useRef<WorkspaceClusterSettingsFormRef>(null);
  const nextStep = () => setActive(current => (current < 1 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));
  const handleOk = (value: WorkspaceClusterSettingsFormValues) => {
    const clusters = get(value, 'spec.placement.clusters');
    set(baseInfo, 'spec.placement.clusters', clusters);
    onOk?.(baseInfo);
  };

  const handleNext = (value: WorkspaceFormValues) => {
    setBaseInfo(value);
    nextStep();
  };

  const renderStepsModalFooter = () => {
    if (!isMultiCluster()) {
      return (
        <>
          <Button onClick={onCancel} radius="xl">
            {t('CANCEL')}
          </Button>
          <Button
            loading={confirmLoading}
            onClick={() => formRef?.current?.form.submit()}
            radius="xl"
            shadow
            color="secondary"
          >
            {t('OK')}
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={onCancel} radius="xl">
          {t('CANCEL')}
        </Button>
        {active !== 0 && (
          <Button onClick={prevStep} disabled={active <= 0}>
            {t('PREVIOUS')}
          </Button>
        )}
        {active !== 1 ? (
          <Button
            onClick={() => formRef?.current?.form.submit()}
            color="secondary"
            disabled={active >= 1}
          >
            {t('NEXT')}
          </Button>
        ) : (
          <Button
            loading={confirmLoading}
            onClick={() => clusterFormRef.current?.form.submit()}
            radius="xl"
            shadow
            color="secondary"
          >
            {t('OK')}
          </Button>
        )}
      </>
    );
  };

  return (
    <Modal
      visible={visible}
      titleIcon={<Enterprise size={20} />}
      title={t('CREATE_WORKSPACE')}
      width={width}
      footer={renderStepsModalFooter()}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      {isMultiCluster() ? (
        <Steps active={active} onStepClick={setActive} variant="tab">
          <TabStep
            label={t('BASIC_INFORMATION')}
            description={t('WORKSPACE_CREATE_DESC')}
            completedDescription={t('FINISHED')}
            progressDescription={t('IN_PROGRESS')}
            icon={<Appcenter size={24} />}
          >
            <WorkspaceBasicInfoForm ref={formRef} manager={manager} onOk={handleNext} />
          </TabStep>
          <TabStep
            label={t('CLUSTER_SETTINGS')}
            description={t('SELECT_CLUSTERS_DESC')}
            completedDescription={t('FINISHED')}
            progressDescription={t('IN_PROGRESS')}
            icon={<Cluster size={24} />}
          >
            <WorkspaceClusterSettingsForm ref={clusterFormRef} onOk={handleOk} />
          </TabStep>
        </Steps>
      ) : (
        <WorkspaceBasicInfoForm ref={formRef} manager={manager} onOk={onOk} />
      )}
    </Modal>
  );
}

export type { CreateWorkspacesModalProps };

export { CreateWorkspacesModal };
