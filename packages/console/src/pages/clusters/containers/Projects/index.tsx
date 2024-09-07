/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Avatar,
  Column,
  FormattedNamespace,
  getDisplayName,
  getSuitableValue,
  hasClusterModule,
  hasExtensionModuleAnnotation,
  hideGPUByLicense,
  ListPage,
  StatusIndicator,
  TableRef,
  transformRequestParams,
  useActionMenu,
  useCommonActions,
  hasKSModule,
} from '@ks-console/shared';
import { notify } from '@kubed/components';
import { Pen, Project, Restart, Trash } from '@kubed/icons';
import { get, isEmpty, isEqual } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryProjectMonitor } from '../../stores/monitor/projectMonitor';
import projectNewStore from '../../stores/project.new';

import { MetricTypes, PROJECTS_SYSTEM_KEY, PROJECTS_USER_KEY } from './constants';
import {
  useProjectAnnotationsModal,
  useProjectCreateModal,
  useProjectModifyModal,
} from './hooks/useProjectModals';

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
          type === PROJECTS_SYSTEM_KEY
            ? 'kubesphere.io/workspace=system-workspace'
            : type === PROJECTS_USER_KEY
              ? 'kubesphere.io/workspace!=system-workspace'
              : p.labelSelector || `kubesphere.io/managed=true`,
      };
    },
    [type],
  );
  const banner = {
    icon: <Project />,
    title: t('PROJECT_PL'),
    description: t('PROJECT_DESC'),
  };

  const tabs = [
    {
      id: PROJECTS_USER_KEY,
      navLabel: t('USER_PROJECTS'),
      banner: { icon: <Project /> },
    },
    {
      id: PROJECTS_SYSTEM_KEY,
      navLabel: t('SYSTEM_PROJECTS'),
      banner: { icon: <Project /> },
    },
  ];
  const tableRef = React.useRef<TableRef>(null);
  const params = useParams();
  const { cluster } = params;

  const callback = () => {
    tableRef?.current?.refetch();
  };
  const { editBaseInfo, del } = useCommonActions({
    store: projectNewStore,
    params: { cluster },
    callback,
  });

  const hasMonitoring = cluster && hasClusterModule(cluster, 'whizard-monitoring');
  const hasGpuMonitoring =
    cluster &&
    hasExtensionModuleAnnotation(
      'whizard-monitoring',
      'monitoring.kubesphere.io/enable-gpu-monitoring',
    ) &&
    hasClusterModule(cluster, 'whizard-monitoring');

  const [list, setlist] = React.useState<FormattedNamespace[]>([]);
  const {
    data: metricsData,
    isFetching,
    refetch,
  } = useQueryProjectMonitor(
    {
      ...params,
      cluster,
      resources: list.map(item => item.name),
      metrics: Object.values(hideGPUByLicense(MetricTypes, cluster!)),
      last: true,
    },
    {
      enabled: !!hasMonitoring && !isEmpty(list),
    },
  );

  const { open: openAnnotationsModal, close: closeAnnotationsModal } = useProjectAnnotationsModal();
  const { open: openModifyModal, close: closeModify } = useProjectModifyModal();
  const { open: openCreateModal, close: closeCreateModal } = useProjectCreateModal();

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
        onClick: record => {
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
        key: 'modify',
        icon: <Restart />,
        text: t('ASSIGN_WORKSPACE'),
        action: 'manage',
        show: (record: FormattedNamespace) => !record?.workspace && showAction(record),
        onClick: record => {
          openModifyModal(
            {
              params,
              store: projectNewStore,
              initialValues: record._originData,
            },
            {
              params: { ...params, name: record.name },
              onSuccess: () => {
                closeModify();
                notify.success(t('UPDATE_SUCCESSFUL'));
                tableRef.current?.refetch();
              },
            },
          );
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: (record: FormattedNamespace) =>
          record?.workspace !== globals.config?.systemWorkspace && showAction(record),
        onClick: del,
      },
    ],
    [type],
  );
  const renderBatchActions = useActionMenu({
    authKey: PROJECT_MODULE,
    params: { cluster: cluster as string },
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          del(tableRef?.current?.getSelectedFlatRows() || []);
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const renderTableActions = useActionMenu({
    authKey: PROJECT_MODULE,
    params: { cluster },
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
              cluster,
              store: projectNewStore,
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
    authKey: PROJECT_MODULE,
    params: { cluster: cluster as string },
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
            record.status === 'Terminating' ? '' : `/clusters/${cluster}/projects/${record.name}`;
          return (
            <Avatar
              title={getDisplayName(record)}
              icon={<Project size={40} />}
              description={record.description}
              to={detailUrl}
              isMultiCluster={hasKSModule('kubefed') && record.isFedHostNamespace}
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
        title: t('WORKSPACE'),
        field: 'workspace',
        id: 'workspace',
        canHide: true,
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
        isHideable: true,
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

  const table = React.useMemo(() => {
    return {
      ref: tableRef,
      tableName: `namespace:table:${type}:list`,
      columns: columns as Column[],
      transformRequestParams: transformProjectTableParams,
      batchActions: renderBatchActions({}),
      toolbarRight: renderTableActions({}),
      isLoading: isFetching,
      onChangeData: onChangeData,
      onRefresh: refetch,
    };
  }, [type, isFetching]);
  return (
    <ListPage
      banner={banner}
      table={table as any}
      tabs={tabs}
      currentTab={type}
      store={projectNewStore}
    />
  );
};

export default Projects;
