/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { Button, Modal, notify } from '@kubed/components';
import Icon from '../../Icon';
import { useV3action } from '../../../hooks';
import { openpitrixStore, workspaceStore } from '../../../stores';
import { getCreateAppParams, getCreateAppParamsFormData } from '../../../utils';
import { CreateHelmApp } from './CreateHelmApp';
import { CreateYamlApp } from './CreateYamlApp';
import { Header, HeaderFieldItem, Logo, FieldItem } from './styles';

type Props = {
  visible?: boolean;
  onOk?: (data: any, params: any) => void;
  onOkFormData?: (data: any, formData: FormData, params: any) => void;
  onCancel?: () => void;
  tableRef?: any;
  workspace?: string;
  isDetail?: boolean;
  appName?: string;
  refresh?: () => void;
};

type ModalType = 'create_helm' | 'create_yaml' | 'create_edge';

const { createApp, createAppFormData } = openpitrixStore;
const { useFetchWorkspaceQuery } = workspaceStore;

export function CreateApp({
  visible,
  onCancel,
  tableRef,
  onOk,
  onOkFormData,
  workspace = '',
  isDetail,
  appName,
  refresh,
}: Props): JSX.Element {
  const { open, render: RenderTemplate } = useV3action();
  const [modalType, setModalType] = useState<ModalType>('create_helm');
  const [modalVisible, setModalVisible] = useState(false);
  const { data: workspaces } = useFetchWorkspaceQuery({ workspace });
  const labels = workspaces?.metadata?.labels?.['cluster-role.kubesphere.io/edge'];
  function handleBtn(type: ModalType) {
    onCancel?.();
    if (type === 'create_edge') {
      const cluster = labels;
      open({
        action: 'app.template.create.v2',
        v3Module: 'edgeStore',
        module: 'apptemplates',
        appName,
        workspace,
        cluster,
        onlyDockerHub: false,
        v3StoreParams: {
          module: 'edgeappsets',
        },
        onOk,
        success: () => {
          setModalVisible(false);
          tableRef?.current?.refetch();
          refresh?.();
        },
        onCancel: () => {
          onCancel?.();
          setModalVisible(false);
        },
      });
      return;
    }

    setModalType(type);
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    const appType = sessionStorage.getItem('appType')?.split('=')?.[1];
    if (workspace && visible && isDetail) {
      handleBtn(`create_${appType}` as ModalType);
    }
  }, [workspace, visible, isDetail]);

  async function handleCreate(fileData: any): Promise<void> {
    fileData.maintainers = [{ name: globals.user.username }];
    fileData.workspace = workspace;
    if (onOk) {
      onOk(getCreateAppParams(fileData), { workspace });
      notify.success(t('UPLOAD_SUCCESSFUL'));

      setModalVisible(false);
      onCancel?.();
      tableRef?.current?.refetch();
      return;
    }
    sessionStorage.removeItem('appType');
    await createApp({ workspace }, fileData);
    notify.success(t('UPLOAD_SUCCESSFUL'));
    setModalVisible(false);
    onCancel?.();
    tableRef?.current?.refetch();
  }

  // todo When using formData and an external operation function is passed, use onOkFormData
  async function handleCreateFormData(fileData: any, formData: FormData): Promise<void> {
    fileData.maintainers = [{ name: globals.user.username }];
    fileData.workspace = workspace;
    if (onOkFormData) {
      onOkFormData(getCreateAppParamsFormData(fileData), formData, { workspace });
      notify.success(t('UPLOAD_SUCCESSFUL'));

      setModalVisible(false);
      onCancel?.();
      tableRef?.current?.refetch();
      return;
    }
    sessionStorage.removeItem('appType');
    await createAppFormData({ workspace }, fileData, formData);
    notify.success(t('UPLOAD_SUCCESSFUL'));
    setModalVisible(false);
    onCancel?.();
    tableRef?.current?.refetch();
  }
  function renderModal() {
    if (modalType === 'create_helm') {
      return (
        <CreateHelmApp
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleCreate}
          onOkFormData={!onOk || onOkFormData ? handleCreateFormData : undefined}
        />
      );
    }
    if (modalType === 'create_yaml') {
      return (
        <CreateYamlApp
          appName={isDetail ? appName : ''}
          visible={modalVisible}
          workspace={workspace}
          onCancel={() => setModalVisible(false)}
          onOk={handleCreate}
        />
      );
    }
    return <></>;
  }

  return (
    <>
      <Modal
        width={600}
        onCancel={onCancel}
        visible={visible && !isDetail}
        header={null}
        closable={false}
        footer={<Button onClick={onCancel}>{t('CANCEL')}</Button>}
      >
        <Header>
          <Logo src="/assets/application.svg" alt="" />
          <HeaderFieldItem value={t('CREATE_APP')} label={t('CREATE_APP_DESC')} />
        </Header>
        <div
          style={{ marginTop: 100 }}
          className={cx('item')}
          onClick={() => handleBtn('create_helm')}
        >
          <FieldItem
            value={t('UPLOAD_HELM_TITLE')}
            label={t('HELM_CHART_FORMAT_DESC')}
            avatar={<Icon name="templet" size={40} />}
          />
        </div>
        <div className={cx('item')} onClick={() => handleBtn('create_yaml')}>
          <FieldItem
            value={t('CREATE_YAML_APPS')}
            label={t('CREAT_YAML_FORMAT_DESC')}
            avatar={<Icon name="templet" size={40} />}
          />
        </div>
      </Modal>
      {modalVisible && renderModal()}
      {RenderTemplate?.()}
    </>
  );
}

export default CreateApp;
