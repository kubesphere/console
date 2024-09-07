/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isUndefined } from 'lodash';
import { Banner, notify } from '@kubed/components';
import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  podStore,
  DataTable,
  Icon,
  NamespaceSelector,
  PodIndicator,
  EditYamlModal,
  useItemActions,
  formatTime,
  TableRef,
  yaml,
  DeleteConfirmModal,
  useBatchActions,
} from '@ks-console/shared';
import { ProjectWrapper } from './styles';

import type { Column, OriginalPod, FormattedPod } from '@ks-console/shared';
import type { EditYamlConfig, ModalBaseConfig, BatchOptConfig } from '../../../types/workload';
const { getListUrl, formatPod, getWatchListUrl, usePodDeleteMutation, usePodBatchDeleteMutation } =
  podStore;

const POD_TYPE = 'POD';
const Pods = () => {
  const module = 'pods';
  const authKey = module;
  const params: Record<string, any> = useParams();
  const { cluster } = params;

  const tableRef = useRef<TableRef<FormattedPod>>();
  const [namespace, setNamespace] = useState('');
  const [editYamlConfig, setEditYamlConfig] = useState<EditYamlConfig<FormattedPod>>({
    editResource: null,
    visible: false,
    yaml: '',
    readOnly: true,
  });
  const [deleteConfig, setDeleteConfig] = useState<ModalBaseConfig<FormattedPod>>({
    source: null,
    visible: false,
  });
  const [batchDeleteConfig, setBatchDeleConfig] = useState<BatchOptConfig<FormattedPod>>({
    source: null,
    visible: false,
  });

  // mutation
  const { mutate: mutatePodBatchDelete } = usePodBatchDeleteMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setBatchDeleConfig({
        visible: false,
        source: null,
      });
    },
  });
  const { mutate: mutatePodDelete } = usePodDeleteMutation({
    onSuccess: () => {
      notify.success(t('DELETED_SUCCESSFULLY'));
      setDeleteConfig({
        visible: false,
        source: null,
      });
    },
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
          const selectedRows = tableRef.current?.getSelectedFlatRows() as FormattedPod[];
          setBatchDeleConfig({
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
  const renderItemActions = useItemActions({
    authKey,
    params: { cluster },
    actions: [
      {
        key: 'viewYaml',
        text: t('VIEW_YAML'),
        action: 'view',
        icon: <Icon name="eye" />,
        onClick: (_, record) => {
          setEditYamlConfig({
            editResource: null,
            visible: true,
            readOnly: true,
            yaml: yaml.getValue(record._originData),
          });
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: record => !record.isFedManaged,
        onClick: (_, record) => {
          setDeleteConfig({
            visible: true,
            source: record as FormattedPod,
          });
        },
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      sortable: true,
      render: (name, record) =>
        PodIndicator({
          cluster,
          module,
          record: record as FormattedPod,
        }),
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      searchable: true,
      width: '5%',
      render: (_, { podStatus }) => <span>{t(podStatus.type.toUpperCase())}</span>,
    },
    {
      title: t('NODE_SI'),
      field: 'node',
      width: '18%',
      canHide: true,
      render: (_, record) => {
        const { node, nodeIp } = record;

        if (!node) return '-';

        const text = t('NODE_IP', { node, ip: nodeIp });

        return <Link to={`/clusters/${cluster}/nodes/${node}`}>{text}</Link>;
      },
    },
    {
      title: t('POD_IP_ADDRESS'),
      field: 'podIp',
      width: '15%',
      canHide: true,
      render: podIp => <span>{podIp}</span>,
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      field: 'startTime',
      sortable: true,
      canHide: true,
      width: 150,
      render: time => formatTime(time),
    },
    {
      title: '',
      field: 'more',
      canHide: false,
      sortable: false,
      width: 58,
      render: (value, row) => renderItemActions(value, row),
    },
  ];

  // left namespace
  const handleNamespaceChange = (name: string) => {
    setNamespace(isUndefined(name) ? '' : name);
  };
  const LeftProject = (
    <ProjectWrapper>
      <NamespaceSelector cluster={cluster} onChange={handleNamespaceChange} />
    </ProjectWrapper>
  );

  // delete item
  const handleDelete = () => {
    mutatePodDelete(deleteConfig?.source as FormattedPod);
  };
  const handleCancelDelete = () => {
    setDeleteConfig({
      source: null,
      visible: false,
    });
  };
  const handleBatchDelete = () => {
    mutatePodBatchDelete(batchDeleteConfig?.source as FormattedPod[]);
  };
  const handleCancelBatchDelete = () => {
    setBatchDeleConfig({
      visible: false,
      source: null,
    });
  };

  const url = getListUrl({ ...params, namespace });
  return (
    <>
      <Banner
        className="mb12"
        icon={<Icon name="pod" size={40} />}
        title={t('POD')}
        description={t('POD_DESC')}
      ></Banner>
      <DataTable
        ref={tableRef}
        rowKey={'uid'}
        tableName={module}
        placeholder={t('SEARCH')}
        columns={columns}
        url={url}
        format={data => formatPod(data as OriginalPod)}
        useStorageState={false}
        parameters={{}}
        watchOptions={{
          enabled: true,
          module,
          url: getWatchListUrl(params),
        }}
        toolbarLeft={LeftProject}
        batchActions={renderBatchActions()}
      />
      {batchDeleteConfig.visible && (
        <DeleteConfirmModal
          visible={batchDeleteConfig.visible}
          type={POD_TYPE}
          resource={batchDeleteConfig.source?.map(item => item.name)}
          onOk={handleBatchDelete}
          onCancel={handleCancelBatchDelete}
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
      {deleteConfig?.visible && (
        <DeleteConfirmModal
          visible={deleteConfig.visible}
          type={POD_TYPE}
          resource={deleteConfig.source?.name}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default Pods;
