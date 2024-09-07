/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { isUndefined, get } from 'lodash';
import { useParams, Link } from 'react-router-dom';
import { Banner, Field, Text, Tooltip, notify } from '@kubed/components';
import Avatar from '../../../components/Avatar';
import {
  Icon,
  DataTable,
  NamespaceSelector,
  EditYamlModal,
  serviceStore,
  getDisplayName,
  formatTime,
  useItemActions,
  yaml,
  DeleteConfirmModal,
  useBatchActions,
  TableRef,
} from '@ks-console/shared';

import type { Column, OriginalService } from '@ks-console/shared';

import { ProjectWrapper, TextWrapper } from './styles';

interface YamlProps {
  visible: boolean;
  source: Record<string, any> | null;
  yaml: string;
  readOnly: boolean;
}

const {
  SERVICE_TYPES,
  mapper,
  getResourceUrl,
  getWatchListUrl,
  useUpdateYamlMutation,
  useDeleteMutation,
  useBatchDeleteMutation,
} = serviceStore;
const TYPE = 'SERVICE';

const Services = () => {
  const module = 'services';
  const authKey = module;
  const params = useParams();
  const { cluster } = params;
  const tableRef = useRef<TableRef>();
  const [namespace, setNamespace] = useState<string>();
  const [editYamlConfig, setEditYamlConfig] = useState<YamlProps>();
  const [deleteConfig, setDeleteConfig] = useState<{
    visible: boolean;
    source: Record<string, any> | null;
  }>();
  const [batchDeleteConfig, setBatchDeleteConfig] = useState<{
    visible: boolean;
    source: Record<string, any>[] | null;
  }>();

  // update yaml
  const { mutate: mutateUpdateYaml, isLoading: updateYamlIsLoading } = useUpdateYamlMutation({
    onSuccess: () => {
      notify.success(t('UPDATE_SUCCESSFUL'));
      setEditYamlConfig({
        visible: false,
        yaml: '',
        readOnly: false,
        source: null,
      });
    },
  });
  const handleEditYaml = (value: string) => {
    mutateUpdateYaml({
      params: {
        cluster,
        namespace: get(editYamlConfig, 'source.namespace', ''),
        name: get(editYamlConfig, 'source.name', ''),
      },
      data: yaml.load(value),
    });
  };

  const { mutate: mutateDelete, isLoading: deleteIsLoading } = useDeleteMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setDeleteConfig({
        visible: false,
        source: null,
      });
    },
  });
  const handleDelete = () => {
    mutateDelete({
      cluster,
      name: get(deleteConfig, 'source.name', ''),
      namespace: get(deleteConfig, 'source.namespace', ''),
    });
  };
  const { mutate: mutateBatchDelete, isLoading: batchDeleteLoading } = useBatchDeleteMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setBatchDeleteConfig({
        visible: false,
        source: null,
      });
    },
  });
  const handleBatchDelete = () => {
    mutateBatchDelete({
      cluster,
      data: batchDeleteConfig?.source as Record<string, any>[],
    });
  };

  const showAction = (record: any) => !record.isFedManaged;
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
        onClick: () => {
          // TODO: edit base info modal
        },
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        show: showAction,
        onClick: (_, record) => {
          setEditYamlConfig({
            visible: true,
            source: record,
            yaml: yaml.getValue(record._originData),
            readOnly: false,
          });
        },
      },
      {
        key: 'editService',
        icon: <Icon name="network-router" />,
        text: t('EDIT_SERVICE'),
        action: 'edit',
        show: showAction,
        onClick: () => {
          // TODO: edit service modal
        },
      },
      {
        key: 'editGateway',
        icon: <Icon name="ip" />,
        text: t('EDIT_EXTERNAL_ACCESS'),
        action: 'edit',
        show: record => showAction(record) && record.type === SERVICE_TYPES.VirtualIP,
        onClick: () => {
          // TODO: edit gateway modal
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: showAction,
        onClick: (_, record) => {
          setDeleteConfig({
            visible: true,
            source: record,
          });
        },
      },
    ],
  });
  const renderBatchActions = useBatchActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedRows = tableRef.current?.getSelectedFlatRows() as Record<string, any>[];
          setBatchDeleteConfig({
            visible: true,
            source: selectedRows,
          });
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const renderExternalService = (data: Record<string, any>) => {
    const text = {
      des: '-',
      title: '-',
    };

    if (data.specType === 'NodePort') {
      text.des = t('PORT_PL');
      text.title = data.ports
        .filter((port: Record<string, any>) => port.nodePort)
        .map((port: Record<string, any>) => `${port.nodePort}/${port.protocol}`)
        .join('; ');
    }

    if (data.specType === 'LoadBalancer') {
      text.des =
        data.loadBalancerIngress.length > 1 ? t('LOAD_BALANCERS_SCAP') : t('LOAD_BALANCER_SCAP');
      text.title = data.loadBalancerIngress.join('; ');
    }

    if (data.externalName) {
      return (
        <Text>
          <TextWrapper>
            <Tooltip content={data.externalName}>
              <span>{text.title}</span>
            </Tooltip>
          </TextWrapper>
        </Text>
      );
    }

    return (
      <Text>
        <TextWrapper>
          <div>{text.title}</div>
          <div>{t(`${text.des}`)}</div>
        </TextWrapper>
      </Text>
    );
  };

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      sortable: true,
      render: (value, record) => (
        <Field
          avatar={<Avatar record={record} module={module} />}
          label={record.description || '-'}
          value={
            <Link to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${record.name}`}>
              {getDisplayName(record)}
            </Link>
          }
        />
      ),
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
      width: '15%',
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
    },
    {
      title: t('INTERNAL_ACCESS'),
      field: 'annotations["kubesphere.io/serviceType"]',
      canHide: true,
      width: '15%',
      render: (_, record) => {
        return (
          <Text>
            <TextWrapper>
              <div>{record.clusterIP || ''}</div>
              <div>{t(`${record.type}`)}</div>
            </TextWrapper>
          </Text>
        );
      },
    },
    {
      title: t('EXTERNAL_ACCESS'),
      field: 'specType',
      canHide: true,
      width: '20%',
      render: (_, record) => renderExternalService(record),
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: '12%',
      render: time => formatTime(time),
    },
    {
      title: '',
      field: 'more',
      canHide: true,
      sortable: false,
      width: 58,
      render: (value, row) => renderItemActions(value, row),
    },
  ];

  // Left namespace select
  const handleNamespaceChange = (name: string) => {
    setNamespace(isUndefined(name) ? '' : name);
  };
  const LeftProject = (
    <ProjectWrapper>
      <NamespaceSelector cluster={cluster || ''} onChange={handleNamespaceChange} />
    </ProjectWrapper>
  );

  const url = getResourceUrl({ cluster, namespace });
  return (
    <>
      <Banner
        className="mb12"
        icon={<Icon name="appcenter" size={40} />}
        title={t('SERVICE')}
        description={t('SERVICE_DESC')}
      />
      <DataTable
        ref={tableRef}
        tableName={module}
        rowKey="uid"
        placeholder={t('SEARCH')}
        url={url}
        columns={columns}
        parameters={{}}
        useStorageState={false}
        watchOptions={{
          enabled: true,
          module,
          url: getWatchListUrl(params),
        }}
        format={data => mapper(data as OriginalService)}
        disableRowSelect={record => !showAction(record)}
        batchActions={renderBatchActions()}
        toolbarLeft={LeftProject}
      />
      {batchDeleteConfig?.visible && (
        <DeleteConfirmModal
          visible={batchDeleteConfig.visible}
          type={TYPE}
          resource={batchDeleteConfig.source?.map(item => item.name)}
          confirmLoading={batchDeleteLoading}
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
          readOnly={editYamlConfig.readOnly}
          confirmLoading={updateYamlIsLoading}
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
          type={TYPE}
          resource={get(deleteConfig, 'source.name', '')}
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

export default Services;
