/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState, ReactNode, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { isEmpty, get } from 'lodash';
import cx from 'classnames';

import { Banner, BannerTip, Tooltip, Field, notify } from '@kubed/components';
import {
  ClusterDetail,
  Column,
  StatusIndicator,
  cpuFormat,
  memoryFormat,
  TableRef,
  nodeStore,
  kubekeyStore,
  FormattedNode,
  monitorStore,
  useBatchActions,
  useTableActions,
  getNodeStatus,
  getDisplayName,
  getValueByUnit,
  hideGPUByLicense,
  KubectlModal,
  useItemActions,
  useCommonActions,
  hasExtensionModuleAnnotation,
  hasClusterModule,
} from '@ks-console/shared';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Nodes, Exclamation, Start, Stop, Trash, Terminal } from '@kubed/icons';
import { FieldLabel, Resource, Taints, DataTableWrapper } from './styles';
import Count from './count';
import { TaintBatchModal } from './TaintModal/TaintBatchModal';
import AddNodeModal from './AddNode';
import {
  authKey,
  MetricTypes,
  transformRequestParams,
  tips,
  toPercentage,
  getUnschedulable,
  getReady,
  MASTER_ROLE,
} from './contants';

const {
  getResourceUrl,
  mapper: nodeMapper,
  fetchCount,
  nodeCordon,
  nodeUncordon,
  useBatchPatchTaints,
  fetchList,
} = nodeStore;

const { useKubeKeyUpdateMutation } = kubekeyStore;
const { useMonitorStore, apiVersion } = monitorStore;

const renderTaintsTip = (data: Record<string, string>[]) => (
  <div>
    <div>{t('TAINTS')}:</div>
    <div>
      {data.map(item => {
        const text = `${item.key}=${item.value || ''}:${item.effect}`;
        return (
          <div style={{ wordBreak: 'break-all' }} key={text}>
            {text}
          </div>
        );
      })}
    </div>
  </div>
);

function Node() {
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const [currentCluster] = useStore<ClusterDetail>('cluster');

  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [taintVisible, setTaintVisible] = useState<boolean>(false);
  const [kubeCtlVisible, setKubeCtlVisible] = useState<boolean>(false);

  const [kubeCtlParams, setKubeCtlParams] = useState<Record<string, any>>({});
  const [selectedNodes, setSelectedNodes] = useState<FormattedNode[]>([]);

  const url = getResourceUrl(params);
  const getApi = () => `${apiVersion({})}/node_metrics`;
  const { fetchMetrics } = useMonitorStore({ getApiFn: getApi });

  const { data: nodeCount } = useQuery(['fetchCount'], () => {
    return fetchCount({ cluster });
  });

  const { data: { data: tableList = [], total: totalCount } = {} } = useQuery(
    [`cluster-${cluster}-nodes`],
    () => {
      const queryParams = transformRequestParams({ ...params, filters: [], pageIndex: -1 });
      return fetchList(queryParams);
    },
  );

  const tableRef = useRef<TableRef>();

  const { data: monitorData, refetch } = useQuery(
    ['monitor', tableList],
    () => {
      if (hasClusterModule(cluster, 'whizard-monitoring') && !isEmpty(tableList)) {
        return fetchMetrics({
          cluster,
          resources: tableList.map((node: any) => node.name),
          metrics: Object.values(hideGPUByLicense(MetricTypes, cluster)),
          last: true,
        });
      } else {
        return {
          data: undefined,
          isLoading: false,
        };
      }
    },
    {
      staleTime: 60 * 1000,
    },
  );

  const handleTableScroll = (event: any) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.target;

    const isAtStart = scrollLeft === 0;
    const isAtEnd = scrollLeft === scrollWidth - clientWidth;

    const tableNameElements = document.querySelectorAll('.table-name');
    const tableMoreElements = document.querySelectorAll('.table-more');

    if (isAtStart) {
      tableNameElements.forEach(element => {
        element.classList.remove('table-name-shadow');
      });
      if (isAtEnd) {
        tableMoreElements.forEach(element => {
          element.classList.remove('table-more-shadow');
        });
      } else {
        tableMoreElements.forEach(element => {
          element.classList.add('table-more-shadow');
        });
      }
    } else if (isAtEnd) {
      tableMoreElements.forEach(element => {
        element.classList.remove('table-more-shadow');
      });
      tableNameElements.forEach(element => {
        element.classList.add('table-name-shadow');
      });
    } else {
      tableMoreElements.forEach(element => {
        element.classList.add('table-more-shadow');
      });
      tableNameElements.forEach(element => {
        element.classList.add('table-name-shadow');
      });
    }
  };

  useEffect(() => {
    const table = document.querySelector('.table-main');
    if (table) {
      const handleResize = () => {
        const hasScroll = table.scrollWidth > table.clientWidth;
        const tableMoreElements = document.querySelectorAll('.table-more');
        if (hasScroll) {
          tableMoreElements.forEach(element => {
            element.classList.add('table-more-shadow');
          });
        } else {
          tableMoreElements.forEach(element => {
            element.classList.remove('table-more-shadow');
          });
        }
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(table);

      table.addEventListener('scroll', handleTableScroll);

      return () => {
        if (resizeObserver) {
          resizeObserver.unobserve(table);
        }
        table.removeEventListener('scroll', handleTableScroll);
      };
    }
  }, [tableRef.current]);

  const getLastValue = (node: any, type: string, unit: string) => {
    const metricsData: Record<string, string> = monitorData || {};
    const result = get(metricsData[type], 'data.result') || [];
    const metrics = result.find((item: any) => get(item, 'metric.node') === node.name);
    return getValueByUnit(get(metrics, 'value[1]', 0), unit);
  };

  const getRecordMetrics = (record: any, configs: Record<string, any>[]) => {
    const metrics: Record<string, any> = {};
    configs.forEach(cfg => {
      metrics[cfg.type] = getLastValue(
        record,
        hideGPUByLicense(MetricTypes, cluster)[cfg.type],
        cfg.unit,
      );
    });
    return metrics;
  };

  const renderCPUTooltip = (record: any) => {
    const metrics = getRecordMetrics(record, [
      { type: 'allocatable_cpu_total' },
      { type: 'allocatable_cpu_utilisation' },
      { type: 'limit_cpu_total' },
      { type: 'limit_cpu_utilisation' },
    ]);
    const content = (
      <p>
        {cpuFormat(metrics.limit_cpu_total) === 1
          ? t('CPU_LIMIT_SI', {
              core: cpuFormat(metrics.limit_cpu_total),
              percent: toPercentage(metrics.limit_cpu_utilisation),
            })
          : t('CPU_LIMIT_PL', {
              core: cpuFormat(metrics.limit_cpu_total),
              percent: toPercentage(metrics.limit_cpu_utilisation),
            })}
      </p>
    );
    return (
      <Tooltip content={content} placement="top">
        <Field
          value={
            cpuFormat(metrics.allocatable_cpu_total) === 1
              ? t('CPU_REQUEST_SI', {
                  core: cpuFormat(metrics.allocatable_cpu_total),
                  percent: toPercentage(metrics.allocatable_cpu_utilisation),
                })
              : t('CPU_REQUEST_PL', {
                  core: cpuFormat(metrics.allocatable_cpu_total),
                  percent: toPercentage(metrics.allocatable_cpu_utilisation),
                })
          }
          label={t('RESOURCE_REQUEST')}
        />
      </Tooltip>
    );
  };

  const renderMemoryTooltip = (record: any) => {
    const metrics = getRecordMetrics(record, [
      { type: 'allocatable_memory_total' },
      { type: 'allocatable_memory_utilisation' },
      { type: 'limits_memory_total' },
      { type: 'limits_memory_utilisation' },
    ]);
    const content = (
      <p>
        {t('MEMORY_LIMIT_VALUE', {
          gib: memoryFormat(metrics.limits_memory_total, 'Gi'),
          percent: toPercentage(metrics.limits_memory_utilisation),
        })}
      </p>
    );
    return (
      <Tooltip content={content} placement="top">
        <Field
          value={t('MEMORY_REQUEST_VALUE', {
            gib: memoryFormat(metrics.allocatable_memory_total, 'Gi'),
            percent: toPercentage(metrics.allocatable_memory_utilisation),
          })}
          label={t('RESOURCE_REQUEST')}
        />
      </Tooltip>
    );
  };

  const callback = () => {
    tableRef?.current?.refetch();
  };

  const { del } = useCommonActions({
    store: nodeStore,
    params: { cluster },
    callback,
  });

  const renderItemAction = useItemActions({
    authKey,
    params,
    appendTo: document.body,
    actions: [
      {
        key: 'uncordon',
        icon: <Start />,
        text: t('UNCORDON'),
        action: 'edit',
        show: record => record.importStatus === 'success' && getUnschedulable(record),
        onClick: (e, record) => {
          nodeUncordon(record).then(() => callback());
        },
      },
      {
        key: 'cordon',
        icon: <Stop />,
        text: t('CORDON'),
        action: 'edit',
        show: record => record.importStatus === 'success' && !getUnschedulable(record),
        onClick: (e, record) => {
          nodeCordon(record).then(() => callback());
        },
      },
      {
        key: 'terminal',
        icon: <Terminal />,
        text: t('OPEN_TERMINAL'),
        action: 'edit',
        show: record => {
          return (
            record.importStatus === 'success' &&
            getReady(record) &&
            (!record?.role?.some((role: string) => MASTER_ROLE.includes(role)) ||
              globals.config.enableNodeListTerminal)
          );
        },
        onClick: (e, record) => {
          setKubeCtlParams({ cluster, nodename: record.name, isEdgeNode: true });
          setKubeCtlVisible(true);
        },
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: item => item.importStatus === 'failed',
        onClick: (e, record: any) => {
          del({ ...record, type: 'CLUSTER_NODE' });
        },
      },
    ],
  });

  const renderTableAction = useTableActions({
    authKey,
    params,
    actions: [
      {
        key: 'add',
        text: t('ADD'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
        },
        onClick: () => {
          setAddVisible(true);
        },
      },
    ],
  });

  const renderBatchAction = useBatchActions({
    authKey,
    params,
    actions: [
      {
        key: 'taint',
        text: t('EDIT_TAINTS'),
        action: 'edit',
        onClick: () => {
          const selectedFlatRows = tableRef?.current?.getSelectedFlatRows() || [];
          setSelectedNodes(selectedFlatRows as FormattedNode[]);
          setTaintVisible(true);
        },
      },
    ],
  });

  const { mutate: mutateNodesTaint, isLoading: isNodesTaintLoading } = useBatchPatchTaints({
    onSuccess: () => {
      callback();
      notify.success(t('UPDATE_SUCCESSFUL'));
      setTaintVisible(false);
    },
  });

  const { mutate: mutateKKUpdate, isLoading: isKKUpdateLoading } = useKubeKeyUpdateMutation({
    detail: {
      name: currentCluster.kkName,
      ...params,
    },
    onSuccess: () => {
      callback();
      setAddVisible(false);
      notify.success(t('UPDATE_SUCCESSFUL'));
    },
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      searchable: true,
      sortable: true,
      render: (value, row) => (
        <Field
          value={<Link to={value}>{getDisplayName(row)}</Link>}
          avatar={<Nodes size={40} />}
          label={<FieldLabel>{row.ip || '-'}</FieldLabel>}
        />
      ),
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      render: (value, row) => {
        const status = getNodeStatus(row);
        const taints = row.taints;
        return (
          <div>
            <StatusIndicator type={status}>
              {t(`NODE_STATUS_${status.toUpperCase()}`)}
            </StatusIndicator>
            {!isEmpty(taints) && row.importStatus === 'success' && (
              <Tooltip content={renderTaintsTip(taints)}>
                <Taints>{taints.length}</Taints>
              </Tooltip>
            )}
          </div>
        );
      },
    },
    {
      title: t('ROLE'),
      field: 'role',
      canHide: true,
      render: roles => {
        return !roles?.some((role: string) => MASTER_ROLE.includes(role))
          ? t('WORKER')
          : t('CONTROL_PLANE');
      },
    },
    ...(hasClusterModule(cluster, 'whizard-monitoring')
      ? ([
          {
            title: t('CPU_USAGE'),
            field: 'cpu',
            canHide: true,
            render: (value, row) => {
              const metrics = getRecordMetrics(row, [
                {
                  type: 'cpu_used',
                  unit: 'Core',
                },
                {
                  type: 'cpu_total',
                  unit: 'Core',
                },
                {
                  type: 'cpu_utilisation',
                },
              ]);
              return (
                <Field
                  value={
                    <Resource>
                      <span>{toPercentage(metrics.cpu_utilisation)}</span>
                      {metrics.cpu_utilisation >= 0.9 && <Exclamation />}
                    </Resource>
                  }
                  label={`${metrics.cpu_used}/${metrics.cpu_total} ${t('CORE_PL')}`}
                />
              );
            },
          },
          {
            title: t('MEMORY_USAGE'),
            field: 'memory',
            canHide: true,
            render: (value, row) => {
              const metrics = getRecordMetrics(row, [
                {
                  type: 'memory_used',
                  unit: 'Gi',
                },
                {
                  type: 'memory_total',
                  unit: 'Gi',
                },
                {
                  type: 'memory_utilisation',
                },
              ]);
              return (
                <Field
                  value={
                    <Resource>
                      <span>{toPercentage(metrics.memory_utilisation)}</span>
                      {metrics.memory_utilisation >= 0.9 && <Exclamation />}
                    </Resource>
                  }
                  label={`${metrics.memory_used}/${metrics.memory_total} GiB`}
                />
              );
            },
          },
          {
            title: t('DISK_SIZE_UTILISATION'),
            field: 'node',
            canHide: true,
            render: (value, row) => {
              const metrics = getRecordMetrics(row, [
                {
                  type: 'node_disk_size_utilisation',
                },
              ]);

              return (
                <Field
                  value={
                    <Resource>
                      <span>{toPercentage(metrics.node_disk_size_utilisation)}</span>
                    </Resource>
                  }
                />
              );
            },
          },
          ...(hasExtensionModuleAnnotation(
            'whizard-monitoring',
            'monitoring.kubesphere.io/enable-gpu-monitoring',
          ) && hasClusterModule(cluster, 'whizard-monitoring')
            ? ([
                {
                  title: t('GPU_USAGE'),
                  field: 'gpu',
                  canHide: true,
                  render: (value, row) => {
                    const metrics = getRecordMetrics(row, [
                      {
                        type: 'gpu_used',
                        unit: 'Core',
                      },
                      {
                        type: 'gpu_total',
                        unit: 'Core',
                      },
                      {
                        type: 'gpu_utilization',
                      },
                    ]);
                    return (
                      <Field
                        value={
                          <Resource>
                            <span>{toPercentage(metrics.gpu_utilization)}</span>
                            {metrics.gpu_utilization >= 0.9 && <Exclamation />}
                          </Resource>
                        }
                        label={`${metrics.gpu_used}/${metrics.gpu_total} GPU`}
                      />
                    );
                  },
                },
                {
                  title: t('GPU_MEMORY_USAGE'),
                  field: 'gpu_memory',
                  canHide: true,
                  render: (value, row) => {
                    const metrics = getRecordMetrics(row, [
                      {
                        type: 'gpu_memory_used',
                        unit: 'Gi',
                      },
                      {
                        type: 'gpu_memory_total',
                        unit: 'Gi',
                      },
                      {
                        type: 'gpu_memory_utilization',
                      },
                    ]);
                    return (
                      <Field
                        value={
                          <Resource>
                            <span>{toPercentage(metrics.gpu_memory_utilization)}</span>
                            {metrics.gpu_memory_utilization >= 0.9 && <Exclamation />}
                          </Resource>
                        }
                        label={`${metrics.gpu_memory_used}/${metrics.gpu_memory_total} GiB`}
                      />
                    );
                  },
                },
              ] as Column[])
            : []),
          {
            title: t('POD_PL'),
            field: 'pods',
            canHide: true,
            render: (value, row) => {
              const metrics = getRecordMetrics(row, [
                {
                  type: 'pod_used',
                },
                {
                  type: 'pod_total',
                },
              ]);
              const uitilisation = metrics.pod_total ? metrics.pod_used / metrics.pod_total : 0;
              return (
                <Field
                  value={`${toPercentage(uitilisation)}`}
                  label={`${metrics.pod_used}/${metrics.pod_total}`}
                />
              );
            },
          },
          {
            title: t('ALLOCATED_CPU'),
            field: 'allocated_resources_cpu',
            canHide: true,
            render: (value, row) => renderCPUTooltip(row),
          },
          {
            title: t('ALLOCATED_MEMORY'),
            field: 'allocated_resources_memory',
            canHide: true,
            render: (value, row) => renderMemoryTooltip(row),
          },
        ] as Column[])
      : []),
    {
      id: 'more',
      title: ' ',
      render: (value, row) => renderItemAction(value, row),
    },
  ];

  const formatServerData = (serverData: Record<string, any>) => {
    return {
      ...serverData,
      totalItems: serverData.totalItems,
    };
  };

  return (
    <>
      <Banner
        icon={<Nodes />}
        title={t('CLUSTER_NODE_PL')}
        description={t('CLUSTER_NODE_DESC')}
        className="mb12"
      >
        {tips.map((key: any) => (
          <BannerTip key={key.key} title={t(key.title)}>
            {t(key.description)}
          </BannerTip>
        ))}
      </Banner>
      <Count totalCount={totalCount} masterNum={nodeCount?.masterNum ?? 0} />
      <DataTableWrapper
        ref={tableRef}
        url={url}
        columns={hideGPUByLicense(columns, cluster)}
        tableName="nodes"
        rowKey="name"
        transformRequestParams={transformRequestParams}
        serverDataFormat={formatServerData}
        batchActions={renderBatchAction() as ReactNode}
        toolbarRight={currentCluster.kkName ? renderTableAction() : null}
        format={(item: any) => ({ ...params, ...nodeMapper(item) })}
        initialState={{ sortBy: [{ id: 'name', desc: false }] }}
        className={cx({ 'no-selector': !renderBatchAction() })}
        onRefresh={refetch}
      />

      {taintVisible && (
        <TaintBatchModal
          visible={taintVisible}
          nodes={selectedNodes}
          onOk={mutateNodesTaint}
          confirmLoading={isNodesTaintLoading}
          onCancel={() => setTaintVisible(false)}
        />
      )}
      {addVisible && (
        <AddNodeModal
          visible={addVisible}
          onOk={mutateKKUpdate}
          confirmLoading={isKKUpdateLoading}
          addAfterCreate={true}
          onCancel={() => setAddVisible(false)}
        />
      )}
      {kubeCtlVisible && (
        <KubectlModal
          visible={kubeCtlVisible}
          title={kubeCtlParams.nodename}
          params={kubeCtlParams}
          onCancel={() => setKubeCtlVisible(false)}
        />
      )}
    </>
  );
}

export default Node;
