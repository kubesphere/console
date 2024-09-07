/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, merge } from 'lodash';
import React, { useState, useRef } from 'react';

import { useParams, Link } from 'react-router-dom';
import {
  Column,
  DataTable,
  getDisplayName,
  networkIPPoolStore,
  useItemActions,
  TableRef,
  useUrl,
  useTableActions,
  useBatchActions,
  EditYamlModal,
  yaml,
  EditBaseInfoModal,
  DeleteConfirmModal,
  Text,
  OriginalNetworkIPPool,
  FormattedNetworkIPPool,
  FormDataCreateNetworkIPPool,
} from '@ks-console/shared';
import { Banner, Card, Field, notify, BannerTip, Empty } from '@kubed/components';
import { Pen, Trash, Documentation, Firewall, EipGroup, Eye, Enterprise } from '@kubed/icons';

import { FieldLabel, ListWrapper } from './styles';
import { NAME } from './constants';
import CreateIPPoolModal from '../../../components/NetworkIPPools/CreateIPPoolModal';
import IPPoolWorkspaceModal from '../../../components/NetworkIPPools/IPPoolWorkspaceModal';
import styled from 'styled-components';

const {
  module,
  getResourceUrl,
  formatNetworkIPPool,
  useNetworkIPPoolEditMutation,
  useNetworkIPPoolsDeleteMutation,
  useNetworkIPPoolCreateMutation,
} = networkIPPoolStore;

const StyledEmpty = styled(Empty)`
  padding: 32px;
`;

export interface EditYamlConfig {
  editResource: FormattedNetworkIPPool | null;
  visible: boolean;
  yaml: string;
  readOnly: boolean;
}

function IPPools() {
  const { getDocsUrl } = useUrl({ module });

  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const url = getResourceUrl({ cluster });
  const tableRef = useRef<TableRef<any>>(null);
  const docUrl = getDocsUrl();
  const [activeRecord, setActiveRecord] = useState<FormattedNetworkIPPool | null>();

  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [deleteVisible, setDeleteVisible] = useState<boolean>();
  const [modifyVisible, setModifyVisible] = useState<boolean>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: false,
  });

  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [selectedNetworkIPPools, setSelectedNetworkIPPools] = useState<FormattedNetworkIPPool[]>(
    [],
  );

  const { mutate: mutateNetworkIPPoolCreate, isLoading: isCreateLoading } =
    useNetworkIPPoolCreateMutation(
      {
        cluster,
      },
      {
        onSuccess: () => {
          setCreateVisible(false);
          notify.success(t('CREATE_SUCCESSFUL'));
          tableRef?.current?.refetch();
        },
      },
    );

  const { mutate: mutateNetworkIPPoolEdit, isLoading: isEditLoading } =
    useNetworkIPPoolEditMutation({
      onSuccess: () => {
        setEditVisible(false);
        notify.success(t('UPDATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    });

  const { mutate: mutateNetworkIPPoolModifyWorkspace, isLoading: isModifyLoading } =
    useNetworkIPPoolEditMutation({
      onSuccess: () => {
        setModifyVisible(false);
        notify.success(t('UPDATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    });

  const { mutate: mutateNetworkIPPoolsDelete, isLoading: isDeleteLoading } =
    useNetworkIPPoolsDeleteMutation({
      onSuccess: () => {
        tableRef?.current?.refetch();
        notify.success(t('DELETED_SUCCESSFULLY'));
        setDeleteVisible(false);
      },
    });

  const renderBatchActions = useBatchActions({
    authKey: module,
    params,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          setSelectedNetworkIPPools(selectedFlatRows as FormattedNetworkIPPool[]);
          setDeleteVisible(true);
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const renderItemAction = useItemActions({
    authKey: module,
    params,
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: (e, record) => {
          setEditVisible(true);
          setActiveRecord(record as FormattedNetworkIPPool);
        },
      },
      {
        key: 'viewYaml',
        icon: <Eye />,
        text: t('VIEW_YAML'),
        action: 'view',
        onClick: (e, record) => {
          setEditYamlConfig({
            visible: true,
            yaml: yaml.getValue(record._originData),
            readOnly: true,
            editResource: record as FormattedNetworkIPPool,
          });
        },
      },
      {
        key: 'modify',
        icon: <Enterprise />,
        text: t('ASSIGN_WORKSPACE'),
        action: 'edit',
        onClick: (e, record) => {
          setModifyVisible(true);
          setActiveRecord(record as FormattedNetworkIPPool);
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !row.isFedManaged,
        onClick: (e, record) => {
          setDeleteVisible(true);
          setSelectedNetworkIPPools([record as FormattedNetworkIPPool]);
          setActiveRecord(record as FormattedNetworkIPPool);
        },
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      width: '40%',
      render: (value, row) => {
        return (
          <Field
            value={
              <Link to={`/clusters/${cluster}/${module}/${value}`}>{getDisplayName(row)}</Link>
            }
            avatar={<Firewall size={40} />}
            label={<FieldLabel>{row.description || '-'}</FieldLabel>}
          />
        );
      },
    },
    {
      title: t('NETWORK_SEGMENT'),
      field: 'cidr',
    },
    {
      title: t('USED_IP_ADDRESSES'),
      field: 'status',
      render: status => {
        const capacity = get(status, 'capacity', 0);
        const unallocated = get(status, 'unallocated', 0);

        return (
          <Text
            title={capacity - unallocated}
            description={t('TOTAL_VALUE', { value: capacity })}
          />
        );
      },
    },
    {
      title: t('WORKSPACE'),
      field: 'workspace',
      render: (workspace, record) => (record.isDefault ? t('ALL') : workspace || t('NOT_ASSIGNED')),
    },

    {
      id: 'more',
      title: ' ',
      width: 20,
      render: (value, row) => renderItemAction(value, row),
    },
  ];

  const renderTableAction = useTableActions({
    authKey: module,
    params,
    actions: [
      {
        key: 'create',
        text: t('CREATE_BTN'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
        },
        onClick: () => {
          setCreateVisible(true);
        },
      },
    ],
  });

  const handleEditBaseInfo = (info: object) => {
    const data = merge(activeRecord?._originData, info);
    mutateNetworkIPPoolEdit({
      params: {
        name: activeRecord?.name,
        namespace: activeRecord?.namespace,
      },
      data,
    });
  };

  const handleModifyWorkspace = (data: object) => {
    mutateNetworkIPPoolModifyWorkspace({
      params: {
        name: activeRecord?.name,
        namespace: activeRecord?.namespace,
        cluster: cluster,
      },
      data,
    });
  };

  const handleDelete = () => {
    mutateNetworkIPPoolsDelete(selectedNetworkIPPools);
  };

  const handleCreate = (data: FormDataCreateNetworkIPPool) => {
    mutateNetworkIPPoolCreate(data);
  };

  const desc = (
    <div className="banner-desc">
      {t('POD_IP_POOL_DESC')}
      <Documentation size={20} />
      <a href={docUrl}>{t('LEARN_MORE')}</a>
    </div>
  );

  return (
    <ListWrapper>
      <Banner
        icon={<EipGroup />}
        title={t('POD_IP_POOL_PL')}
        description={docUrl ? desc : t('POD_IP_POOL_DESC')}
        className="mb12"
      >
        <BannerTip title={t('IPPOOL_USAGE_Q')} key="ippool_usage_q">
          {t('IPPOOL_USAGE_A')}
        </BannerTip>
      </Banner>

      <Card padding={0}>
        <DataTable
          ref={tableRef}
          url={url}
          columns={columns}
          tableName="NETWORK_POLICY"
          rowKey="key"
          placeholder={t('SEARCH_BY_NAME')}
          format={policy => formatNetworkIPPool(policy as OriginalNetworkIPPool)}
          batchActions={renderBatchActions()}
          toolbarRight={renderTableAction()}
          emptyOptions={{
            withoutTable: true,
            element: (
              <StyledEmpty
                title={t('EMPTY_WRAPPER', { resource: t('NETWORK_POLICY') })}
                description={<span>{t('NETWORK_POLICY_EMPTY_DESC')}</span>}
                image={<EipGroup size={48} />}
              />
              // todo: add create button
            ),
          }}
        />
      </Card>
      {createVisible && (
        <CreateIPPoolModal
          visible={createVisible}
          onOk={handleCreate}
          onCancel={() => {
            setCreateVisible(false);
          }}
          confirmLoading={isCreateLoading}
        />
      )}
      {editVisible && activeRecord && (
        <EditBaseInfoModal
          visible={editVisible}
          initialValues={activeRecord._originData}
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
          onCancel={() =>
            setEditYamlConfig({
              ...editYamlConfig,
              visible: false,
            })
          }
        />
      )}
      {modifyVisible && activeRecord && (
        <IPPoolWorkspaceModal
          visible={modifyVisible}
          detail={activeRecord}
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
          resource={selectedNetworkIPPools?.map(item => item.name)}
          confirmLoading={isDeleteLoading}
          onOk={handleDelete}
          onCancel={() => setDeleteVisible(false)}
        />
      )}
    </ListWrapper>
  );
}

export default IPPools;
