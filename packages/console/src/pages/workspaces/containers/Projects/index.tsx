/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Column,
  FormattedNamespace,
  getDisplayName,
  getSuitableValue,
  hideGPUByLicense,
  ListPage,
  StatusIndicator,
  TableRef,
  transformRequestParams,
  useActionMenu,
  useCommonActions,
  projectNewStore,
  formatTime,
  clusterStore,
  quotaStore,
  FavoriteHistory,
  removeDashboardHistory,
  hasExtensionModuleAnnotation,
  hasClusterModule,
} from '@ks-console/shared';
import { notify } from '@kubed/components';
import { Pen, Project, Trash } from '@kubed/icons';
import { get, isEqual } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryProjectMonitor } from '../../../clusters/stores/monitor/projectMonitor';

import { MetricTypes, PROJECTS_SYSTEM_KEY, PROJECTS_USER_KEY } from './constants';
import {
  useProjectAnnotationsModal,
  useProjectCreateModal,
  useProjectEditQuotasModal,
} from '../../../../actions/project';
import { withModalProvider } from '../../../../components/useModal';
import { SelectWrapper, AvatarWrapper } from './styles';

const PROJECT_MODULE = 'projects';

interface ProjectsProps {
  type?: typeof PROJECTS_USER_KEY | typeof PROJECTS_SYSTEM_KEY;
}

const Projects = (props: ProjectsProps) => {
  const { type = PROJECTS_USER_KEY } = props;

  const transformProjectTableParams = React.useCallback(
    (params: unknown) => {
      const p = transformRequestParams(params as any);
      return {
        ...p,
        labelSelector:
          p.labelSelector ||
          `kubesphere.io/managed=true,kubesphere.io/kubefed-host-namespace!=true`,
      };
    },
    [type],
  );

  const banner = {
    icon: <Project />,
    title: t('PROJECT_PL'),
    description: t('PROJECT_DESC'),
  };

  const tableRef = React.useRef<TableRef>(null);
  const params1 = useParams();
  const { workspace } = params1;
  const [cluster, setCluster] = React.useState<string>('');

  const { data: clusters, isLoading: clusterLoading } = clusterStore.fetchList(params1, true);

  const params = {
    workspace,
    cluster,
  };

  React.useEffect(() => {
    if (Array.isArray(clusters) && clusters.length && !cluster) {
      setCluster(clusters.filter(i => i.isReady)[0]?.name);
    }
  }, [clusters]);
  const callback = () => {
    tableRef?.current?.refetch();
  };
  const { editBaseInfo, del } = useCommonActions({
    store: projectNewStore,
    params: { cluster, workspace },
    callback,
  });

  const hasMonitoring = hasClusterModule(cluster, 'whizard-monitoring');

  const hasGpuMonitoring =
    hasExtensionModuleAnnotation(
      'whizard-monitoring',
      'monitoring.kubesphere.io/enable-gpu-monitoring',
    ) && hasClusterModule(cluster, 'whizard-monitoring');

  const [list, setlist] = React.useState<FormattedNamespace[]>([]);
  const {
    data: metricsData,
    isFetching,
    refetch,
  } = useQueryProjectMonitor(
    {
      ...params,
      resources: list.map(item => item.name),
      metrics: Object.values(hideGPUByLicense(MetricTypes, cluster!)),
      last: true,
    },
    {
      enabled: !!hasMonitoring,
    },
  );

  const { open: openAnnotationsModal, close: closeAnnotationsModal } = useProjectAnnotationsModal();
  const { open: openCreateModal, close: closeCreateModal } = useProjectCreateModal();
  const { openWithDeps: openEditQuotasModal, close: closeQuotasModal } = useProjectEditQuotasModal({
    deps: {
      cluster,
    },
  });

  const getLastValue = (record: FormattedNamespace, monitorType: string) => {
    const result: Record<string, any>[] = get(metricsData, `${monitorType}.data.result`) || [];
    const metrics = result.find(item => get(item, 'metric.namespace') === record.name);
    return get(metrics, 'value[1]', 0);
  };

  const showAction = (record: FormattedNamespace) => !record?.isFedManaged;

  const actions: any = React.useMemo(
    () => [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT'),
        action: 'edit',
        show: showAction,
        onClick: editBaseInfo,
      },
      {
        key: 'edit-annotations',
        icon: <Pen />,
        text: t('EDIT_ANNOTATIONS'),
        action: 'manage',
        show: (record: FormattedNamespace) => {
          return record?.workspace !== globals?.config?.systemWorkspace && showAction(record);
        },
        onClick: (record: FormattedNamespace) => {
          openAnnotationsModal(
            {
              initialValues: record._originData,
              store: projectNewStore,
            },
            {
              params: { ...params, name: record.name },
              onSuccess: () => {
                closeAnnotationsModal();
                notify.success(t('UPDATE_SUCCESSFUL'));
                tableRef.current?.refetch();
              },
            },
          );
        },
      },
      {
        key: 'editQuota',
        icon: <Pen />,
        text: t('EDIT_PROJECT_QUOTAS'),
        action: 'edit',
        onClick: (detail: FormattedNamespace) => {
          openEditQuotasModal(({ cluster: c }) => [
            {
              store: quotaStore,
              params: {
                cluster: c,
                namespace: detail.name,
                name: detail.name,
                workspace: params.workspace,
              },
              detail,
            },
            {
              detail,
              params: {
                cluster: c,
                namespace: detail.name,
                name: detail.name,
                workspace: params.workspace,
              },
              onSuccess: () => {
                closeQuotasModal();
                tableRef.current?.refetch();
                notify.success(t('UPDATE_SUCCESSFUL'));
              },
            },
          ]);
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: (record: FormattedNamespace) =>
          record?.workspace !== globals.config?.systemWorkspace && showAction(record),
        onClick: (item: FormattedNamespace) => {
          del([{ ...item, cluster }]);
          removeDashboardHistory(globals.user.username, item.uid);
        },
      },
    ],
    [type, cluster],
  );
  const renderBatchActions = useActionMenu({
    authKey: PROJECT_MODULE,
    params: { workspace },
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          del((tableRef?.current?.getSelectedFlatRows() || []).map(item => ({ ...item, cluster })));
          removeDashboardHistory(
            globals.user.username,
            (tableRef?.current?.getSelectedFlatRows() || []).map(r => r.uid),
          );
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const renderTableActions = useActionMenu({
    authKey: PROJECT_MODULE,
    params: { workspace },
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        show: type === PROJECTS_USER_KEY,
        onClick: () => {
          openCreateModal(
            {
              params: { cluster, workspace },
              store: projectNewStore,
              hideCluster: false,
            },
            {
              params,
              onSuccess: () => {
                closeCreateModal();
                notify.success(t('CREATE_SUCCESSFUL'));
                tableRef.current?.refetch();
              },
            },
          );
        },
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });

  const renderItemActions = useActionMenu({
    authKey: projectNewStore.module,
    params: { workspace },
    actions,
  });

  const omitKeys = new Set(
    !hasMonitoring
      ? [
          'namespace_cpu_usage',
          'namespace_memory_usage_wo_cache',
          'namespace_gpu_usage',
          'namespace_gpu_memory_usage',
          'namespace_pod_count',
        ]
      : !hasGpuMonitoring
        ? ['namespace_gpu_usage', 'namespace_gpu_memory_usage']
        : [],
  );

  const columns: Column<FormattedNamespace>[] = (
    [
      {
        title: t('NAME'),
        field: 'name',
        searchable: true,
        id: 'name',
        sortable: true,
        render: (value, record) => {
          const detailUrl =
            record.status === 'Terminating'
              ? ''
              : `/${record.workspace}/clusters/${cluster}/projects/${record.name}`;

          return (
            <AvatarWrapper
              title={getDisplayName(record)}
              icon={<Project size={40} />}
              description={record.description}
              to={detailUrl}
              isMultiCluster={record.isFedHostNamespace}
            />
          );
        },
      },
      {
        title: t('STATUS'),
        field: 'status',
        canHide: true,
        id: 'status',
        render: (_, { status }) =>
          status ? (
            <StatusIndicator type={status as any}>{t(status.toUpperCase())}</StatusIndicator>
          ) : null,
      },
      {
        title: t('CPU_USAGE'),
        field: 'namespace_cpu_usage',
        id: 'namespace_cpu_usage',
        canHide: true,
        render: (_, record) => getSuitableValue(getLastValue(record, MetricTypes.cpu), 'cpu', '-'),
      },
      {
        title: t('MEMORY_USAGE'),
        field: 'namespace_memory_usage_wo_cache',
        id: 'namespace_memory_usage_wo_cache',
        canHide: true,
        render: (_, record) =>
          getSuitableValue(getLastValue(record, MetricTypes.memory), 'memory', '-'),
      },
      {
        title: t('GPU_USAGE'),
        field: 'namespace_gpu_usage',
        id: 'namespace_gpu_usage',
        canHide: true,
        render: (_, record) => getSuitableValue(getLastValue(record, MetricTypes.gpu), 'gpu', '-'),
      },
      {
        title: t('GPU_MEMORY_USAGE'),
        field: 'namespace_gpu_memory_usage',
        id: 'namespace_gpu_memory_usage',
        canHide: true,
        render: (_, record) =>
          getSuitableValue(getLastValue(record, MetricTypes.gpu_memory), 'memory', '-'),
      },
      {
        title: t('POD_PL'),
        field: 'namespace_pod_count',
        id: 'namespace_pod_count',
        canHide: true,
        render: (_, record) => getLastValue(record, MetricTypes.pod),
      },
      {
        title: t('CREATION_TIME_TCAP'),
        field: 'createTime',
        sortable: true,
        canHide: true,
        width: '19%',
        render: time => formatTime(time as number),
      },
      {
        id: 'favorite',
        title: '',
        width: 20,
        render: (_, record) => {
          return (
            <FavoriteHistory
              user={globals.user.username}
              item={{
                id: record.uid,
                name: record.name,
                url: `/${record.workspace}/clusters/${cluster}/projects/${record.name}`,
                type: 'Project',
                isHost: false,
              }}
            />
          );
        },
      },
      {
        id: 'more',
        title: '',
        width: 20,
        render: (value, row) => renderItemActions(row),
      },
    ] as Column<FormattedNamespace>[]
  ).filter(i => !omitKeys.has(i.id!));

  const listRef = React.useRef<FormattedNamespace[]>(list);
  const onChangeData = React.useCallback((e: FormattedNamespace[]) => {
    if (
      e &&
      !isEqual(
        e.map(item => item.name),
        listRef.current.map(item => item.name),
      )
    ) {
      setlist(e);
      listRef.current = e;
    }
  }, []);

  const renderClusterSelect = () => {
    return (
      <SelectWrapper
        loading={clusterLoading}
        options={(clusters ?? []).map(i => ({
          value: i.name,
          label: t('CLUSTER_VALUE', { value: getDisplayName(i) }),
          disabled: !i.isReady,
        }))}
        value={cluster}
        onChange={setCluster}
      />
    );
  };
  const table = React.useMemo(() => {
    return {
      ref: tableRef,
      tableName: `${cluster}.workspace.namespace:table:${type}:list`,
      columns: columns as Column[],
      transformRequestParams: transformProjectTableParams,
      batchActions: renderBatchActions({}),
      toolbarRight: renderTableActions({}),
      toolbarLeft: renderClusterSelect(),
      isLoading: isFetching && clusterLoading,
      onChangeData: onChangeData,
      onRefresh: refetch,
      url: projectNewStore.getListUrl({
        ...params,
        cluster,
      }),
    };
  }, [type, isFetching, cluster, clusterLoading]);
  return (
    <ListPage banner={banner} table={table as any} currentTab={type} store={projectNewStore} />
  );
};

export default withModalProvider(Projects);
