/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { merge } from 'lodash';
import {
  DetailPagee,
  formatTime,
  getDisplayName,
  DeleteConfirmModal,
  EditYamlModal,
  yaml,
  networkIPPoolStore,
  EditBaseInfoModal,
  FormattedNetworkIPPool,
} from '@ks-console/shared';
import { NAME } from '../constants';
import { EipGroup, Enterprise, Eye, Pen, Trash } from '@kubed/icons';
import { Loading, notify } from '@kubed/components';
import { IPPoolWorkspaceModal } from '../../../../components';

import { Netmask } from 'netmask';

const PATH = '/clusters/:cluster/ippools/:name';

const {
  module,
  getResourceUrl,
  useGetNetworkIPPool,
  useNetworkIPPoolEditMutation,
  useNetworkIPPoolUpdateMutation,
  useNetworkIPPoolDeleteMutation,
} = networkIPPoolStore;

export interface EditYamlConfig {
  editResource: FormattedNetworkIPPool | null;
  visible: boolean;
  yaml: string;
  readOnly: boolean;
}

export default function NetworkIPPoolDetail() {
  const { cluster, name, namespace } = useParams();
  const navigate = useNavigate();
  const url = getResourceUrl();

  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [modifyVisible, setModifyVisible] = useState<boolean>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });

  const {
    data: detail = {} as FormattedNetworkIPPool,
    refetch,
    isLoading,
    isError,
  } = useGetNetworkIPPool({ name, namespace });

  const block = !isLoading ? new Netmask(detail.cidr) : { base: '', broadcast: '' };
  const attrs = !isLoading
    ? [
        {
          label: t('NETWORK_SEGMENT'),
          value: detail?.cidr,
        },
        {
          label: t('NETWORK'),
          value: block?.base,
        },
        {
          label: t('START_IP_ADDRESS'),
          value: block?.base,
        },
        {
          label: t('END_IP_ADDRESS'),
          value: block?.broadcast,
        },
        {
          label: t('CREATION_TIME_TCAP'),
          value: detail?.createTime ? formatTime(detail?.createTime) : '',
        },
        {
          label: t('CREATOR'),
          value: detail?.creator || '',
        },
      ]
    : undefined;

  const tabs = [
    { path: `${PATH}/workspaces`, title: t('WORKSPACE_PL') },
    { path: `${PATH}/pods`, title: t('POD_PL') },
  ];

  const actions = [
    {
      key: 'edit',
      icon: <Pen />,
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      show: true,
      onClick: () => {
        setEditVisible(true);
      },
    },
    {
      key: 'viewYaml',
      icon: <Eye />,
      text: t('VIEW_YAML'),
      action: 'view',
      show: true,
      onClick: () => {
        setEditYamlConfig({
          visible: true,
          yaml: yaml.getValue(detail._originData),
          readOnly: true,
          editResource: detail as FormattedNetworkIPPool,
        });
      },
    },
    {
      key: 'modify',
      icon: <Enterprise />,
      text: t('ASSIGN_WORKSPACE'),
      action: 'edit',
      onClick: () => {
        setModifyVisible(true);
      },
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      onClick: () => {
        setDeleteVisible(true);
      },
    },
  ];

  const { mutate: mutateNetworkIPPoolDelete, isLoading: isDeleteLoading } =
    useNetworkIPPoolDeleteMutation({
      onSuccess: () => {
        setDeleteVisible(false);
        notify.success(t('DELETED_SUCCESSFULLY'));
        navigate(`/clusters/${cluster}/secrets`);
      },
    });

  const { mutate: mutateNetworkIPPoolEdit, isLoading: isEditLoading } =
    useNetworkIPPoolEditMutation({
      onSuccess: () => {
        setEditVisible(false);
        notify.success(t('UPDATE_SUCCESSFUL'));
        refetch();
      },
    });

  const { mutate: mutateNetworkIPPoolModifyWorkspace, isLoading: isModifyLoading } =
    useNetworkIPPoolEditMutation({
      onSuccess: () => {
        setModifyVisible(false);
        notify.success(t('UPDATE_SUCCESSFUL'));
        refetch();
      },
    });

  const { mutate: mutateEditYaml, isLoading: isEditYamlLoading } = useNetworkIPPoolUpdateMutation(
    {
      apiPath: url,
      name: editYamlConfig.editResource?.name as string,
      namespace: editYamlConfig.editResource?.namespace as string,
    },
    {
      onSuccess: () => {
        setEditYamlConfig({
          editResource: null,
          visible: false,
          yaml: '',
          readOnly: false,
        });
        notify.success(t('UPDATE_SUCCESSFUL'));
        refetch();
      },
    },
  );

  const handleEditBaseInfo = (info: object) => {
    const data = merge(detail?._originData, info);
    mutateNetworkIPPoolEdit({
      params: {
        name: detail?.name,
        namespace: detail?.namespace,
      },
      data,
    });
  };

  const handleEditYaml = (value: string) => {
    const data = yaml.load(value);
    mutateEditYaml(data);
  };

  const handleModifyWorkspace = (data: object) => {
    mutateNetworkIPPoolModifyWorkspace({
      params: {
        name: detail?.name,
        namespace: detail?.namespace,
        cluster: cluster,
      },
      data,
    });
  };

  const handleDelete = () => {
    if (detail) {
      mutateNetworkIPPoolDelete(detail);
    }
  };

  return isLoading || isError ? (
    <Loading className="page-loading" />
  ) : (
    <>
      <DetailPagee
        tabs={tabs}
        cardProps={{
          name: getDisplayName<FormattedNetworkIPPool>(detail),
          authKey: module,
          actions,
          attrs,
          params: { cluster, name, namespace },
          icon: <EipGroup size={28} style={{ verticalAlign: 'middle' }} />,
          breadcrumbs: {
            label: t('POD_IP_POOL_PL'),
            url: `/clusters/${cluster}/ippools`,
          },
          desc: detail?.description,
        }}
      />
      {editVisible && (
        <EditBaseInfoModal
          visible={editVisible}
          initialValues={detail._originData}
          onCancel={() => setEditVisible(false)}
          onOk={handleEditBaseInfo}
          confirmLoading={isEditLoading}
        />
      )}
      {editYamlConfig.visible && (
        <EditYamlModal
          visible={editYamlConfig.visible}
          yaml={editYamlConfig.yaml}
          readOnly={editYamlConfig.readOnly}
          onOk={handleEditYaml}
          confirmLoading={isEditYamlLoading}
          onCancel={() =>
            setEditYamlConfig({
              ...editYamlConfig,
              visible: false,
            })
          }
        />
      )}

      {modifyVisible && (
        <IPPoolWorkspaceModal
          visible={modifyVisible}
          detail={detail}
          onCancel={() => {
            setModifyVisible(false);
          }}
          confirmLoading={isModifyLoading}
          onOk={handleModifyWorkspace}
          cluster={cluster}
        />
      )}

      {deleteVisible && (
        <DeleteConfirmModal
          visible={deleteVisible}
          type={NAME}
          resource={detail?.name}
          confirmLoading={isDeleteLoading}
          onOk={handleDelete}
          onCancel={() => setDeleteVisible(false)}
        />
      )}
    </>
  );
}
