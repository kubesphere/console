/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useRef, useState } from 'react';
import { get, omit } from 'lodash';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Link, useParams } from 'react-router-dom';
import { Application, Pen, Trash } from '@kubed/icons';
import { Field, notify } from '@kubed/components';

import {
  Icon,
  Image,
  Column,
  TableRef,
  DataTable,
  formatTime,
  useItemActions,
  useTableActions,
  StatusIndicator,
  openpitrixStore,
  useBatchActions,
  DeleteConfirmModal,
  DeployVersionModal,
  DeployYamlModal,
  useListQueryParams,
  safeBtoa,
  useV3action,
} from '@ks-console/shared';

import type { ApplicationsInstanceDetail, AppDeployFormData } from '@ks-console/shared';

import CreateOPAppModal from './CreateOPModal';
import { OPAppEditModal } from '../../../../components/Modals';
import type { OPAppItem, OPAppsResponse } from '../../../../types';
import CreateOPAppWithTemplatesModal from './CreateOPAppWithTemplatesModal';

import { EmptyPlaceholder } from '../styles';

enum AppType {
  'helm' = 'helm 应用',
  'yaml' = 'yaml 应用',
  'edge' = '边缘模板应用',
}
const {
  deployApp,
  dataItemFormatter,
  getApplicationUrl,
  useAppEditMutation,
  useAppDeleteMutation,
  CLUSTER_QUERY_STATUS,
} = openpitrixStore;

export function OPAppTable(): JSX.Element {
  const { cluster = '', workspace = '', namespace = '', appType } = useParams();
  const tableRef = useRef<TableRef>();
  const [urlPrefix] = useStore('wujieUrlPrefix');
  const [modalType, setModalType] = useState('');

  const showTemplateItem = globals.config.globalNavs.children?.find(
    ({ name }: any) => name === 'apps-manage',
  );
  const [selectedRows, setSelectedRows] = useState<ApplicationsInstanceDetail[]>();
  const [selectedAppTemplates, setSelectedAppTemplates] = useState<ApplicationsInstanceDetail>();
  const baseMutateData = useMemo(() => {
    return (selectedRows || []).map(({ metadata }) => {
      return {
        workspace,
        cluster,
        name: metadata.name,
      };
    });
  }, [selectedRows]);
  const { mutate: mutateDelete, isLoading: isDeleting } = useAppDeleteMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      closeModal();
      notify.success(t('DELETED_SUCCESSFUL'));
      tableRef?.current?.refetch();
    },
  });
  const { mutate: mutateUpdate, isLoading: isUpdating } = useAppEditMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      closeModal();
      notify.success(t('UPDATE_SUCCESSFUL'));
      tableRef?.current?.refetch();
    },
  });
  const renderTableActions = useTableActions({
    authKey: 'applications',
    params: { workspace },
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        onClick: () => setModalType('create'),
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });
  const renderBatchActions = useBatchActions({
    authKey: 'applications',
    params: { workspace },
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          // @ts-ignore TODO
          setSelectedRows(selectedFlatRows);
          setModalType('delete');
        },
        props: {
          color: 'error',
        },
      },
    ],
  });
  const renderItemActions = useItemActions<ApplicationsInstanceDetail>({
    authKey: 'applications',
    params: { workspace },
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: (_, record) => {
          setSelectedRows([record]);
          setModalType('edit');
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        onClick: (_, record) => {
          setSelectedRows([record]);
          setModalType('delete');
        },
      },
    ],
  });
  const columns: Column<ApplicationsInstanceDetail>[] = [
    {
      title: t('NAME'),
      field: 'metadata.name',
      searchable: true,
      render: (name, record) => {
        const iconName = get(record, 'app.icon');

        return (
          <Field
            value={
              <Link
                to={`${urlPrefix}/applications/${appType}/${record.metadata?.labels?.['kubesphere.io/cluster']}`}
                replace={true}
              >
                {name}
              </Link>
            }
            label={record.metadata?.annotations?.['kubesphere.io/description']}
            avatar={
              iconName ? (
                <Icon name={iconName} size={40} />
              ) : (
                // @ts-ignore TODO
                <Image iconSize={40} src="" iconLetter={name} />
              )
            }
          />
        );
      },
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      width: '16%',
      render: status => {
        // @ts-ignore TODO
        // if (record.status?.error_info) {
        //   return (
        //     <Tooltip content={record.status?.error_info}>
        //       <StatusIndicator type={status}>{t(status.toUpperCase())}</StatusIndicator>
        //     </Tooltip>
        //   );
        // }
        // @ts-ignore TODO
        return <StatusIndicator type={status}>{t(status)}</StatusIndicator>;
      },
    },
    {
      title: t('APP_TYPE'),
      field: 'spec.app_type',
      canHide: true,
      width: '16%',
      // @ts-ignore TODO
      render: (types: typeof AppType) => AppType[types],
    },
    {
      title: t('APP_TEMPLATE'),
      field: 'spec.app_id',
      canHide: true,
      width: '16%',
      render: name => <Link to={`/apps/${name}`}>{name}</Link>,
    },
    {
      title: t('VERSION'),
      field: 'metadata.annotations["application.kubesphere.io/app-version"]',
      canHide: true,
      width: '16%',
      render: (_, record) =>
        record.metadata?.annotations?.['application.kubesphere.io/app-version'] || '',
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      field: 'status.lastUpdate',
      sortable: true,
      canHide: true,
      width: 180,
      render: (time, record) =>
        formatTime((time as string) || record.metadata?.creationTimestamp, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 'more',
      title: '',
      width: 20,
      // @ts-ignore TODO
      render: renderItemActions,
    },
  ];
  const tableParameters = {
    order: 'status_time',
    status: CLUSTER_QUERY_STATUS,
  };

  const formatServerData = (serverData: OPAppsResponse) => {
    return {
      ...serverData,
      totalItems: serverData.totalItems,
    };
  };

  const transformRequestParams = (params: Record<string, any>): Record<string, string> => {
    const { parameters, filters, sortBy, pageIndex } = params;
    const keyword = filters?.[0]?.value;
    const formattedParams: Record<string, any> = useListQueryParams({
      ...parameters,
      page: pageIndex + 1,
    });
    let conditions = formattedParams.conditions + `,ascending=${sortBy[0].desc}`;

    if (keyword) {
      conditions += `,keyword=${keyword}`;
    }

    return {
      ...formattedParams,
      conditions,
    };
  };

  const closeModal = () => {
    setModalType('');
    setSelectedRows(undefined);
    setSelectedAppTemplates(undefined);
  };

  const handleDelete = () => {
    if (selectedRows) {
      mutateDelete(baseMutateData);
    }
  };

  const handleEdit = (params: any) => {
    if (selectedRows?.[0]) {
      mutateUpdate({ ...baseMutateData?.[0], params });
    }
  };

  const handleDeploy = async (data: AppDeployFormData): Promise<void> => {
    const params = {
      kind: 'ApplicationRelease',
      metadata: {
        name: data?.name,
        annotations: {
          'kubesphere.io/description': data.description,
          ...data.annotations,
        },
      },
      spec: {
        appID: data.appName,
        appType: data.appType,
        appVersionID: data?.versionID,
        values: safeBtoa(data.conf),
      },
    };

    await deployApp(omit(params, ['cluster', 'workspace', 'namespace']), {
      cluster,
      workspace,
      namespace,
    });
    tableRef.current?.refetch();
    closeModal();
    notify.success(t('DEPLOYED_SUCCESSFUL'));
  };

  const { open, render: renderEdgeModal } = useV3action();
  const handleEdgeModal = (detail: any) => {
    setModalType('createEdgeTemplate');
    open({
      action: 'batch.deploy.app.create.v2',
      v3Module: 'edgeTemplateStore',
      v3StoreParams: {
        module: 'edgeappsets',
        detail,
      },
      success: () => {
        notify.success(t('UPDATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    });
  };

  function renderDelopyModal() {
    if (selectedAppTemplates?.spec.appType === 'heml') {
      return (
        <DeployVersionModal
          visible={true}
          appName={selectedAppTemplates?.metadata.name}
          detail={selectedAppTemplates}
          onCancel={closeModal}
          onOk={handleDeploy}
        />
      );
    }
    if (selectedAppTemplates?.spec.appType === 'yaml') {
      return (
        <DeployYamlModal
          visible={true}
          // @ts-ignore TODO
          detail={selectedAppTemplates}
          onCancel={closeModal}
          onOk={handleDeploy}
        />
      );
    }
  }

  return (
    <>
      <DataTable
        ref={tableRef}
        rowKey="metadata.name"
        tableName="apps"
        simpleSearch
        url={getApplicationUrl({ workspace, namespace, cluster })}
        parameters={tableParameters}
        columns={columns}
        useStorageState={false}
        placeholder={t('SEARCH_BY_NAME')}
        toolbarRight={renderTableActions()}
        batchActions={renderBatchActions()}
        transformRequestParams={transformRequestParams}
        format={item => dataItemFormatter(item as OPAppItem)}
        serverDataFormat={serverData => formatServerData(serverData as OPAppsResponse)}
        emptyOptions={{
          element: (
            <EmptyPlaceholder
              title={t('NO_TEMPLATE_BASED_APP_FOUND')}
              description={t('TEMPLATE_BASED_APP_EMPTY_DESC')}
              image={<Application size={48} />}
            />
          ),
        }}
        filteredEmptyOptions={false}
      />
      {modalType === 'delete' && (
        <DeleteConfirmModal
          visible={true}
          type="APP"
          resource={
            selectedRows?.map((item: ApplicationsInstanceDetail) => item.metadata.name) || ''
          }
          onOk={handleDelete}
          onCancel={closeModal}
          confirmLoading={isDeleting}
        />
      )}
      {modalType === 'edit' && (
        <OPAppEditModal
          visible={true}
          onCancel={closeModal}
          appDetail={selectedRows?.[0]}
          onOk={handleEdit}
          isUpdating={isUpdating}
        />
      )}
      {modalType === 'createOpAppByTemplates' && (
        <CreateOPAppWithTemplatesModal
          visible={true}
          onCancel={closeModal}
          openDeployModal={appDetail => {
            setSelectedAppTemplates(appDetail);
            setModalType('deploy');
          }}
          openEdgeTemplateAppCreateModal={handleEdgeModal}
        />
      )}
      {modalType === 'create' && (
        <CreateOPAppModal
          visible={true}
          showTemplate={showTemplateItem}
          onCancel={closeModal}
          openTemplateOPAppCreateModal={() => setModalType('createOpAppByTemplates')}
        />
      )}
      {modalType === 'deploy' && renderDelopyModal()}
      {renderEdgeModal()}
    </>
  );
}

export default OPAppTable;
