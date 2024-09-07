/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useRef, useState } from 'react';
import { get, last, map } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { Application, Pen, Trash } from '@kubed/icons';
import { Field, notify } from '@kubed/components';

import {
  useItemActions,
  useTableActions,
  useBatchActions,
  useListQueryParams,
} from '../../../../../hooks';
import { formatTime } from '../../../../../utils/formatter';
import { openpitrixStore } from '../../../../../stores';
import Icon from '../../../../Icon';
import Image from '../../../../Image';
import { DataTable, TableRef, Column } from '../../../../DataTable';
import { DeleteConfirmModal } from '../../../../Modals/DeleteConfirm';
import CreateOPAppModal from './CreateOPModal';
import { OPAppEditModal } from './OPAppEditModal';
import AppsDeploySpaceModal from '../../../AppsDeploySpaceModal';
import CreateOPAppWithTemplatesModal from './CreateOPAppWithTemplatesModal';
import { AppStatusWithLogInfo } from '../../../AppStatusWithLogInfo';
import {
  getAuthKey,
  getDisplayName,
  getProjectAliasName,
  getClusterAliasName,
  getWorkspacesAliasName,
  getUserAliasName,
} from '../../../../../utils';

import type {
  // OPAppItem,
  OPAppsResponse,
  ApplicationsInstanceDetail,
} from '../../../../../types';
import { AppType } from '../../../../../types';

import { EmptyPlaceholder } from '../styles';

export interface OPAppTableProps {
  cluster?: string;
  workspace?: string;
  namespace?: string;
}

const {
  getApplicationUrl,
  dataItemFormatter,
  useAppEditMutation,
  useAppDeleteMutation,
  CLUSTER_QUERY_STATUS,
} = openpitrixStore;

export function OPAppTable({
  cluster: clusters,
  workspace: workspaces,
  namespace: namespaces,
}: OPAppTableProps): JSX.Element {
  const { cluster = clusters, workspace = workspaces, namespace = namespaces } = useParams();

  const placement = {
    cluster: cluster,
    workspace: workspace,
    namespace: namespace,
  }; // TODO 创建应用的时候默认设置 workspace、cluster、cluster

  const authKey = getAuthKey(placement.namespace ? 'app-releases' : 'manage-app');

  const tableRef = useRef<TableRef>();
  const [modalType, setModalType] = useState('');
  const [visible, setVisible] = useState<boolean>(false);

  const showTemplateItem = globals.config.globalNavs.children?.find(
    ({ name }: any) => name === 'apps-manage',
  );
  const [selectedRows, setSelectedRows] = useState<ApplicationsInstanceDetail[]>();
  const [selectedAppTemplates, setSelectedAppTemplates] = useState<ApplicationsInstanceDetail>();
  const [selectedVersionId, setSelectedVersionId] = useState<string>();
  const baseMutateData = useMemo(() => {
    return (selectedRows || []).map(({ metadata }) => {
      return {
        // workspace,
        // cluster,
        namespace: namespace || metadata.labels?.['kubesphere.io/namespace'],
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
    authKey,
    params: placement,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'namespace-create-app-releases',
        onClick: () => setModalType('create'),
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });
  const renderBatchActions = useBatchActions({
    authKey,
    params: placement,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'namespace-delete-app-releases',
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
    authKey,
    params: placement,
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'namespace-create-app-releases',
        onClick: (_, record) => {
          setSelectedRows([record]);
          setModalType('edit');
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'namespace-delete-app-releases',
        show: val => {
          // TODO Due to Edgewize's need to determine whether the workload has been deleted, the delete button is hidden here
          return val.spec.appType !== 'edge';
        },
        onClick: (_, record) => {
          setSelectedRows([record]);
          setModalType('delete');
        },
      },
    ],
  });
  let manages: any = [];
  if (!cluster) {
    manages = [
      {
        title: t('WORKSPACE_PL'),
        field: 'workspace',
        canHide: true,
        width: 150,
        render: (_: string, record: any) =>
          getWorkspacesAliasName(get(record, 'metadata.labels["kubesphere.io/workspace"]')),
      },
      {
        title: t('PROJECT'),
        field: 'project',
        canHide: true,
        width: 150,
        render: (_: string, record: any) =>
          getProjectAliasName(
            get(record, 'metadata.labels["kubesphere.io/namespace"]'),
            get(record, 'metadata.labels["kubesphere.io/workspace"]'),
          ),
      },
      {
        title: t('CLUSTER_PL'),
        field: 'cluster',
        canHide: true,
        width: 150,
        render: (_: string, record: any) =>
          getClusterAliasName(get(record, 'metadata.labels["kubesphere.io/cluster"]')),
      },
      {
        title: t('OPERATOR'),
        field: 'creator',
        canHide: true,
        width: 150,
        render: (_: string, record: any) =>
          getUserAliasName(get(record, 'metadata.annotations["kubesphere.io/creator"]')),
      },
    ];
  }

  const columns: Column<ApplicationsInstanceDetail>[] = [
    {
      title: t('NAME'),
      field: 'metadata.name',
      searchable: true,
      width: '25%',
      render: (name, record) => {
        const iconName = get(record, 'spec.icon');
        return (
          <Field
            value={<Link to={`${name}`}>{getDisplayName(record)}</Link>}
            label={record?.metadata?.annotations?.['kubesphere.io/description']}
            avatar={
              iconName ? (
                <Icon name={iconName} size={40} />
              ) : (
                // @ts-ignore TODO
                <Image iconSize={40} src="" iconLetter={getDisplayName(record)} />
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
      width: 130,
      render: (_, record) => {
        // @ts-ignore
        const status: 'failed' | 'active' | 'created' = get(record, 'status', 'created');
        const jobName = get(record, '_status.installJobName', '');
        const appType = get(record, 'spec.appType', '');
        const message = get(record, '_status.message', '');
        return (
          <AppStatusWithLogInfo
            message={message}
            showLogInfo={appType === 'helm'}
            status={status}
            jobName={jobName}
            cluster={get(record, 'metadata.labels.["kubesphere.io/cluster"]', '')}
            namespace={get(record, 'metadata.labels.["kubesphere.io/namespace"]', '')}
          />
        );
      },
    },
    ...manages,
    {
      // TODO appType
      title: t('APP_TYPE'),
      field: 'spec.appType',
      canHide: true,
      width: 120,
      // @ts-ignore TODO
      render: (types: typeof AppType) => t(AppType[types]) || '-',
    },
    {
      title: t('APP_TEMPLATE'),
      field: 'spec.appID',
      canHide: true,
      width: '16%',
      render: (name, record) => {
        const aliasName =
          record?.metadata.annotations?.['application.kubesphere.io/app-displayName'];
        const link = workspace
          ? `/workspaces/${workspace}/app-templates/${name}`
          : `/apps-manage/store/${name}`;
        return <Link to={link}>{aliasName || name}</Link>;
      },
    },
    {
      title: t('VERSION'),
      field: 'metadata.annotations["application.kubesphere.io/app-version"]',
      canHide: true,
      width: 100,
      render: (_, record) =>
        record?.metadata?.annotations?.['application.kubesphere.io/app-versionName'] ||
        last(record.spec.appVersionID.split('-')) ||
        '-',
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      field: '_status.lastUpdate',
      sortable: true,
      canHide: true,
      width: 200,
      render: (time = '', record) =>
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
    order: 'creationTimestamp',
    status: CLUSTER_QUERY_STATUS,
  };

  const formatServerData = (serverData: OPAppsResponse) => {
    return {
      ...serverData,
      items: map(serverData.items, dataItemFormatter),
    };
  };

  const transformRequestParams = (val: Record<string, any>): Record<string, string> => {
    const { parameters, filters, sortBy, pageIndex } = val;
    const keyword = filters?.[0]?.value;
    const formattedParams: Record<string, any> = useListQueryParams({
      ...parameters,
      page: pageIndex + 1,
    });
    let conditions = formattedParams.conditions;
    if (cluster) {
      formattedParams.labelSelector = `kubesphere.io/cluster=${cluster}`;
    }
    return {
      ...formattedParams,
      name: keyword,
      conditions,
      ascending: !sortBy[0].desc as any,
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

  const handleEdit = (val: any) => {
    if (selectedRows?.[0]) {
      mutateUpdate({ ...baseMutateData?.[0], params: val });
    }
  };

  return (
    <>
      <DataTable
        ref={tableRef}
        rowKey="metadata.name"
        tableName="apps"
        simpleSearch
        disableRowSelect={(val: any) => val.spec.appType === 'edge'}
        url={getApplicationUrl({ namespace })}
        parameters={tableParameters}
        columns={columns as any}
        useStorageState={false}
        placeholder={t('SEARCH_BY_NAME')}
        toolbarRight={renderTableActions()}
        batchActions={renderBatchActions()}
        transformRequestParams={transformRequestParams}
        format={item => item}
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
          openDeployModal={(appDetail, versionID) => {
            setSelectedAppTemplates(appDetail);
            setSelectedVersionId(versionID);
            setVisible(true);
          }}
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
      <AppsDeploySpaceModal
        {...placement}
        onCancel={() => setVisible(false)}
        success={() => {
          tableRef?.current?.refetch();
          setModalType('');
        }}
        visible={visible}
        appName={selectedAppTemplates?.metadata.name as string}
        detail={selectedAppTemplates}
        versionID={selectedVersionId}
      />
    </>
  );
}

export default OPAppTable;
