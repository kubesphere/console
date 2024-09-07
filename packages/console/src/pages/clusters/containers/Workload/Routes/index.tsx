/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useRef } from 'react';
import { isUndefined } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { Banner, Field, notify } from '@kubed/components';
import {
  DataTable,
  Icon,
  NamespaceSelector,
  ingresStore,
  TableRef,
  getDisplayName,
  formatTime,
  useItemActions,
  yaml,
  EditYamlModal,
  DeleteConfirmModal,
  useBatchActions,
} from '@ks-console/shared';
import { Avatar } from '../../../components';
import { ProjectWrapper } from './styles';

import type { IngressDetail, Column } from '@ks-console/shared';

const {
  getResourceUrl,
  mapper,
  getWatchListUrl,
  useUpdateIngressMutation,
  useDeleteIngressMutation,
  useBatchDeleteIngressMutation,
} = ingresStore;

interface EditYamlConfig {
  editSource: IngressDetail | null;
  visible: boolean;
  yaml: string;
  readonly: boolean;
}

interface ModalBase {
  source: IngressDetail | null;
  visible: boolean;
}

interface ModalBatchBase {
  source: IngressDetail[] | null;
  visible: boolean;
}

const IngressRoutes = () => {
  const module = 'ingresses';
  const authKey = module;
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const tableRef = useRef<TableRef<IngressDetail>>();
  const [namespace, setNamespace] = useState('');

  const [batchDeleteConfig, setBatchDeleteConfig] = useState<ModalBatchBase>();
  const [deleteConfig, setDeleteConfig] = useState<ModalBase>();
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig>();

  const { mutate: mutateBatchDelete, isLoading: batchDeleteIsLoading } =
    useBatchDeleteIngressMutation({
      onSuccess: () => {
        notify.success(t('DELETED_SUCCESSFULLY'));
        setBatchDeleteConfig({
          visible: false,
          source: null,
        });
      },
    });
  const { mutate: mutateEditYaml, isLoading: editYamlIsLoading } = useUpdateIngressMutation({
    onSuccess: () => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      setEditYamlConfig({
        visible: false,
        yaml: '',
        editSource: null,
        readonly: false,
      });
    },
  });
  const { mutate: mutateDelete, isLoading: deleteIsLoading } = useDeleteIngressMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setDeleteConfig({
        visible: false,
        source: null,
      });
    },
  });

  const showAction = (record: Record<string, any>) => !record.isFedManaged;
  const renderItemActions = useItemActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: showAction,
        onClick: () => {},
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: showAction,
        onClick: (e, record) => {
          setEditYamlConfig({
            editSource: record as IngressDetail,
            visible: true,
            readonly: false,
            yaml: yaml.getValue(record._originData),
          });
        },
      },
      // {
      //   key: 'editRules',
      //   icon: <Icon name="firewall" />,
      //   text: t('EDIT_ROUTING_RULES'),
      //   action: 'edit',
      //   show: showAction,
      //   onClick: () => {},
      // },
      // {
      //   key: 'editAnnotations',
      //   icon: <Icon name="firewall" />,
      //   text: t('EDIT_ANNOTATIONS'),
      //   action: 'edit',
      //   show: showAction,
      //   onClick: () => {},
      // },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: showAction,
        onClick: (e, record) => {
          setDeleteConfig({
            visible: true,
            source: record as IngressDetail,
          });
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
      render: (name, record) => (
        <Field
          avatar={<Avatar record={record} module={module} />}
          value={
            <Link to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}>
              {getDisplayName<IngressDetail>(record as IngressDetail)}
            </Link>
          }
          label={record.description || '-'}
        />
      ),
    },
    {
      title: t('GATEWAY_ADDRESS_TCAP'),
      field: 'loadBalancerIngress',
      canHide: true,
      width: '22%',
      render: loadBalancerIngress => loadBalancerIngress.join('; '),
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
      width: '18%',
      render: ingressNamespace => (
        <Link to={`/clusters/${cluster}/projects/${ingressNamespace}`}>{ingressNamespace}</Link>
      ),
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: 150,
      render: time => formatTime(time),
    },
    {
      title: '',
      field: 'more',
      sortable: false,
      width: 58,
      render: (value, row) => renderItemActions(value, row),
    },
  ];
  const renderBatchActions = useBatchActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() as IngressDetail[];
          setBatchDeleteConfig({
            source: selectedRows,
            visible: true,
          });
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  // left namespace
  const handleNamespaceChange = (name: string) => {
    setNamespace(isUndefined(name) ? '' : name);
  };
  const LeftProject = (
    <ProjectWrapper>
      <NamespaceSelector cluster={cluster} onChange={handleNamespaceChange} />
    </ProjectWrapper>
  );

  const handleEditYaml = (value: string) => {
    mutateEditYaml({
      params: {
        cluster,
        namespace: editYamlConfig?.editSource?.namespace,
        name: editYamlConfig?.editSource?.name,
      },
      data: yaml.load(value),
    });
  };
  const handleDelete = () => {
    mutateDelete({
      cluster,
      namespace: deleteConfig?.source?.namespace,
      name: deleteConfig?.source?.name,
    });
  };
  const handleBatchDelete = () => {
    mutateBatchDelete(batchDeleteConfig?.source as IngressDetail[]);
  };

  const url = getResourceUrl({ cluster, namespace });
  return (
    <>
      <Banner
        className="mb12"
        icon={<Icon name="loadbalancer" size={48} />}
        title={t('ROUTE_PL')}
        description={t('ROUTE_DESC')}
      />
      <DataTable
        ref={tableRef}
        tableName={module}
        rowKey={'uid'}
        url={url}
        columns={columns}
        format={mapper}
        useStorageState={false}
        parameters={{}}
        watchOptions={{
          enabled: true,
          module,
          url: getWatchListUrl(params),
        }}
        batchActions={renderBatchActions()}
        toolbarLeft={LeftProject}
      />
      {batchDeleteConfig?.visible && (
        <DeleteConfirmModal
          visible={batchDeleteConfig.visible}
          type={'ROUTE'}
          resource={batchDeleteConfig.source?.map(item => item.name)}
          confirmLoading={batchDeleteIsLoading}
          onCancel={() =>
            setBatchDeleteConfig({
              visible: false,
              source: null,
            })
          }
          onOk={handleBatchDelete}
        />
      )}
      {editYamlConfig?.visible && (
        <EditYamlModal
          visible={editYamlConfig.visible}
          yaml={editYamlConfig.yaml}
          readOnly={editYamlConfig.readonly}
          confirmLoading={editYamlIsLoading}
          onCancel={() =>
            setEditYamlConfig({
              ...editYamlConfig,
              visible: false,
            })
          }
          onOk={handleEditYaml}
        />
      )}
      {deleteConfig?.visible && (
        <DeleteConfirmModal
          visible={deleteConfig.visible}
          type={'ROUTE'}
          resource={deleteConfig.source?.name}
          confirmLoading={deleteIsLoading}
          onCancel={() =>
            setDeleteConfig({
              visible: false,
              source: null,
            })
          }
          onOk={handleDelete}
        />
      )}
    </>
  );
};

export default IngressRoutes;
