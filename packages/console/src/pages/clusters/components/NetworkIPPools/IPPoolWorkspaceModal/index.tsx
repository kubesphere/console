/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cloneDeep, get, pick, set } from 'lodash';
import { FormattedNetworkIPPool, workspaceStore } from '@ks-console/shared';
import React, { useState } from 'react';
import { Alert, Form, FormItem, Modal, Select, useForm } from '@kubed/components';
import { Enterprise } from '@kubed/icons';
interface Props {
  detail: FormattedNetworkIPPool;
  visible: boolean;
  onOk: Function;
  confirmLoading?: boolean;
  onCancel?: () => void;
  cluster?: string;
}

const ALL_WORKSPACE = '';

function IPPoolWorkspaceModal({ detail, onOk, onCancel, visible, confirmLoading, cluster }: Props) {
  const [form] = useForm();
  const [formTemplate] = useState(cloneDeep(detail._originData));
  const { useWorkspaces } = workspaceStore;

  const { data: workspaces = [] } = useWorkspaces({
    limit: -1,
    cluster,
  });

  const getWorkspaces = () => {
    return [
      { label: t('ALL'), value: '' },
      ...workspaces.map(({ name }) => {
        return {
          label: name,
          value: name,
        };
      }),
    ];
  };

  const workspaceValidator = (
    rule: any,
    value: string,
    callback: (error?: any) => void,
  ): Promise<any> | void => {
    if (!value) {
      return callback();
    }

    const hasAllocation = get(detail, 'status.allocations', 0) > 0;
    const workspace = detail.workspace;

    if (hasAllocation && workspace && value !== workspace) {
      return callback({
        message: t('IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING'),
        field: rule.field,
      });
    }

    if (hasAllocation && value !== ALL_WORKSPACE) {
      return callback({
        message: t('IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING'),
        field: rule.field,
      });
    }
    callback();
  };

  const handleSubmit = () => {
    form.validateFields().then((data: any) => {
      const formData = {};
      const workspace = get(data, "metadata.labels['kubesphere.io/workspace']");
      if (workspace === ALL_WORKSPACE) {
        set(formData, "metadata.labels['kubesphere.io/workspace']", null);
        set(formData, "metadata.labels['ippool.network.kubesphere.io/default']", '');
      } else {
        set(formData, "metadata.labels['kubesphere.io/workspace']", workspace || null);
        set(formData, "metadata.labels['ippool.network.kubesphere.io/default']", null);
      }
      onOk?.(formData);
    });
  };

  const renderForm = () => {
    if (detail.isDefault) {
      set(formTemplate, "metadata.labels['kubesphere.io/workspace']", ALL_WORKSPACE);
    }
    const hasAllocation = get(detail, 'status.allocations', 0) > 0;

    const workspace = detail.workspace;
    return (
      <Form form={form} initialValues={formTemplate}>
        {hasAllocation && workspace ? (
          <Alert className="mb12" type="warning">
            {t('IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING')}
          </Alert>
        ) : (
          <Alert className="mb12" type="info" showIcon={false}>
            {t('IPPOOL_ASSIGN_WORKSPACE_DESC')}
          </Alert>
        )}
        <FormItem
          label={t('WORKSPACE')}
          desc={t('SELECT_WORKSPACE_DESC')}
          name={['metadata', 'labels', 'kubesphere.io/workspace']}
          rules={[{ validator: workspaceValidator }]}
        >
          <Select
            options={getWorkspaces()}
            pagination={pick(workspaces, ['page', 'total', 'limit'])}
            showSearch
            allowClear
            placeholder=" "
          />
        </FormItem>
      </Form>
    );
  };
  return (
    <Modal
      title={t('ASSIGN_WORKSPACE')}
      titleIcon={<Enterprise />}
      width={691}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleSubmit}
      bodyStyle={{ padding: '20px' }}
    >
      {renderForm()}
    </Modal>
  );
}

export default IPPoolWorkspaceModal;
