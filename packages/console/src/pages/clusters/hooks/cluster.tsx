/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import styled from 'styled-components';
import { useModal, useForm, Field, Form } from '@kubed/components';
import { Cluster, Error } from '@kubed/icons';
import { FormattedCluster, clusterStore, ClusterTitle, safeBtoa } from '@ks-console/shared';

import ClusterBaseInfoFrom from '../components/Forms/ClusterBaseInfo';
import KubeConfigForm from '../components/Forms/KubeConfig';
import { ClusterUnbind } from '../components/Modals';

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

interface ActionProps {
  cluster: FormattedCluster;
  callback: () => void;
}

export const useClusterAction = () => {
  const modal = useModal();
  const [form] = useForm();
  const [kubeConfigForm] = useForm();

  const editBaseInfo = ({ cluster, callback }: ActionProps) => {
    const initialValues = cluster?._originData;
    form.resetFields();
    form.setFieldsValue(initialValues);

    const modalId = modal.open({
      width: 691,
      title: t('EDIT_INFORMATION'),
      description: t('EDIT_CLUSTER_INFO_DESC'),
      titleIcon: <Cluster size={40} />,
      className: 'modal-pd',
      content: <ClusterBaseInfoFrom form={form} initialValues={initialValues} disableName />,
      onAsyncOk: async () => {
        await form.validateFields();
        const data = form.getFieldsValue(true);
        return clusterStore.patch(cluster, data).then(() => {
          callback();
          modal.close(modalId);
        });
      },
    });
  };

  const updateKubeConfig = ({ cluster, callback }: ActionProps) => {
    kubeConfigForm.resetFields();

    const modalId = modal.open({
      width: 960,
      title: t('UPDATE_KUBECONFIG'),
      className: 'modal-pd',
      okText: t('UPDATE'),
      content: (
        <>
          <Header>
            <ClusterTitle cluster={cluster} />
            <Field label={t('PROVIDER')} value={cluster.provider ?? '-'} />
          </Header>
          <Form form={kubeConfigForm}>
            <KubeConfigForm />
          </Form>
        </>
      ),
      onAsyncOk: () => {
        const data = kubeConfigForm.getFieldsValue(true);
        const newData = { kubeconfig: safeBtoa(data.kubeconfig) };
        return clusterStore.updateKubeConfig(cluster.name, newData).then(() => {
          callback();
          modal.close(modalId);
        });
      },
    });
  };

  const unbindCluster = ({ cluster, callback }: ActionProps) => {
    const modalId = modal.open({
      title: t('REMOVE_CLUSTER'),
      header: null,
      titleIcon: <Error size={20} />,
      footer: null,
      content: (
        <ClusterUnbind
          cluster={cluster}
          onCancel={() => {
            modal.close(modalId);
          }}
          onOk={() => {
            return clusterStore.delete(cluster).then(() => {
              callback();
              modal.close(modalId);
            });
          }}
        />
      ),
    });
  };

  return {
    editBaseInfo,
    updateKubeConfig,
    unbindCluster,
  };
};
