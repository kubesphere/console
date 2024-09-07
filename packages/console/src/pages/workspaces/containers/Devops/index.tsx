/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import {
  Avatar,
  defaultCheckboxColumn,
  devopsStore,
  FormattedDevops,
  getDisplayName,
  getLocalTime,
  PodsStore,
  StatusIndicator,
  tableState2Query,
  useBatchActions,
  useCacheStore,
  useCommonActions,
  useItemActions,
  useTableActions,
  useUrlSearchParamsStatus,
  useV3action,
} from '@ks-console/shared';
import { ColumnDef, Table } from '@tanstack/react-table';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import useWorkspaceClusterSelect from './ClusterSelect';
import { Pen, StrategyGroup, Trash } from '@kubed/icons';
import { Banner, BannerTip, Card, DataTable, notify } from '@kubed/components';

const module = devopsStore.module;

const Devops = () => {
  const { workspace } = useParams<{ workspace: string }>();

  const {
    paramsRef,
    params,
    render: renderSelect,
  } = useWorkspaceClusterSelect({
    workspace,
    showAll: false,
  });

  const { cluster } = params;
  const { state, setState } = useUrlSearchParamsStatus([]);

  const { open: openV3Modal } = useV3action();

  const commonParams = {
    cluster: cluster,
    workspace: workspace,
  };

  const query = React.useMemo(() => {
    return {
      ...tableState2Query(state),
      ...commonParams,
    };
  }, [state, params]);

  const { data, isLoading, isFetching, refetch } = devopsStore.useQueryList(query, {
    enabled: !!cluster,
  });

  const tableRef = React.useRef<Table<FormattedDevops>>();

  const { del } = useCommonActions({
    store: devopsStore,
    params: commonParams,
    callback: callBackType => {
      if (callBackType === 'delete') {
        tableRef.current?.resetRowSelection();
      }
      refetch();
    },
  });
  const renderItemActions = useItemActions({
    authKey: module,
    params: commonParams,
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: (_, record) => {
          openV3Modal({
            module: 'devops',
            v3Module: 'devopsStore',
            ...commonParams,
            detail: record,
            v3StoreParams: '',
            action: 'devops.edit',
            success: () => {
              refetch();
            },
          });
        },
      },
      {
        key: 'delete',
        icon: <Trash size={16} />,
        text: t('DELETE'),
        action: 'delete',
        onClick: (_, record) => {
          del({
            resource: [{ ...record, delDisplayName: record.name, name: record.devops }],
            type: 'DEVOPS_PROJECT',
            onSuccess: () => {
              tableRef.current?.resetRowSelection();
              refetch();
            },
          });
        },
      },
    ],
  });

  const renderBatchActions = useBatchActions({
    authKey: module,
    params: commonParams,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {
          const resource = tableRef.current?.getSelectedRowModel()?.rows.map(row => ({
            ...row.original!,
            name: row.original!.devops,
            delDisplayName: row.original!.name,
          }));
          del({
            resource,
            type: 'DEVOPS_PROJECT',
            onSuccess: () => {
              tableRef.current?.resetRowSelection();
              refetch();
            },
          });
        },
        props: {
          color: 'error',
        },
      },
    ],
  });

  const renderTableActions = useTableActions({
    authKey: module,
    params: commonParams,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        onClick: () => {
          openV3Modal({
            action: 'devops.create',
            v3Module: 'devopsStore',
            v3StoreParams: {},
            module: 'devops',
            cluster: paramsRef.current.cluster,
            workspace: workspace,
            success: () => {
              refetch();
            },
          });
        },
        props: {
          color: 'secondary',
          shadow: true,
        },
      },
    ],
  });

  const columns = React.useMemo<ColumnDef<FormattedDevops, any>[]>(() => {
    return [
      defaultCheckboxColumn,
      {
        accessorKey: 'name',
        header: t('name'),
        meta: {
          sortable: true,
          searchKey: 'name',
        },
        cell: info => (
          <Avatar
            icon={<StrategyGroup size={40} />}
            title={getDisplayName(info.row.original)}
            description={info.row.original?.description ?? '-'}
            to={`/${workspace}/clusters/${paramsRef.current.cluster}/devops/${
              info.row.original?.devops
            }/base-info`}
          />
        ),
      },
      {
        accessorKey: 'status',
        header: t('STATUS'),
        enableHiding: true,
        cell: info => {
          const status = info.row.original?.status;
          if (!status) return '-';
          return (
            <StatusIndicator type={status as 'SUCCESS'}>{t(status.toUpperCase())}</StatusIndicator>
          );
        },
      },
      {
        accessorKey: 'creator',
        header: t('CREATOR'),
        enableHiding: true,
        cell: info => info.row.original?.creator ?? '-',
      },
      {
        header: t('CREATION_TIME_TCAP'),
        accessorKey: 'createTime',
        meta: {
          sortable: true,
          th: {
            width: 250,
          },
        },
        enableHiding: true,
        cell: info => {
          const time = info.getValue();
          if (!time) return '-';
          return getLocalTime(time).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        accessorKey: 'more',
        header: '',
        meta: {
          th: {
            width: 82,
          },
        },
        cell: info => renderItemActions('', info.row.original),
      },
    ];
  }, [cluster]);

  const baseConfig = React.useState(() =>
    DataTable.getDefaultTableOptions<FormattedDevops>({
      tableName: 'workspace-devops-list',
      manual: true,
      enableVisible: true,
      enableSelection: true,
      enableMultiSelection: true,
    }),
  )[0];

  const table = DataTable.useTable<FormattedDevops>({
    ...baseConfig,
    columns,
    loading: isLoading || isFetching,
    data: data?.data ?? [],
    rowCount: data?.total ?? 0,
    onParamsChange: setState,
    state,
    getRowId: React.useCallback(row => row.uid, []),
    meta: {
      ...baseConfig.meta,
      refetch,
      getProps: {
        table: () => {
          return {
            stickyHeader: true,
            tableWrapperClassName: 'table',
          };
        },
        toolbar: () => {
          return {
            toolbarLeft: renderSelect(),
            batchActions: renderBatchActions(),
            toolbarRight: renderTableActions(),
          };
        },
        filters: () => {
          return {
            simpleMode: false,
            suggestions: [
              {
                key: 'name',
                label: t('name'),
              },
              {
                key: 'alias',
                label: t('ALIAS'),
              },
            ],
          };
        },
        empty: () => {
          if (!cluster) {
            return {
              image: <StrategyGroup size={40} />,
              description: t('PLEASE_SELECT_CLUSTER_OR_PROJECT'),
            };
          }
          return {
            image: <StrategyGroup size={40} />,
          };
        },
      },
    },
  });

  React.useEffect(() => {
    tableRef.current = table;
  }, []);

  const banner = {
    icon: <StrategyGroup />,
    title: t('DEVOPS.DEVOPS_PROJECT_PL'),
    description: t('DEVOPS.DEVOPS_DESCRIPTION'),
  };

  const tips = [
    {
      title: t('DEVOPS.DEVOPS_TIP_GITOPS_Q'),
      description: t('DEVOPS_TIP_GITOPS_A'),
    },
    {
      title: t('DEVOPS.DEVOPS_TIP_TYPE_Q'),
      description: t('DEVOPS.DEVOPS_TIP_TYPE_A'),
    },
  ];

  const renderTip = (tip: { title: string; description: string }) => {
    return <BannerTip key={tip.title} title={tip.title} children={tip.description} />;
  };

  return (
    <>
      <Banner className="mb12" {...banner}>
        {tips.map(renderTip)}
      </Banner>
      <Card padding={0}>
        <DataTable.DataTable table={table} />
      </Card>
    </>
  );
};

export default Devops;
