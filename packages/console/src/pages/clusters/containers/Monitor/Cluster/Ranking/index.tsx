/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo, useEffect } from 'react';
import { get, isEmpty } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
  rankStore,
  nodeRankStore,
  Icon,
  hasPermission,
  getValueByUnit,
  getSuitableUnit,
  RankTable,
  Pagination,
  CellPropsColumn,
  hideGPUByLicense,
} from '@ks-console/shared';
import { saveAs } from 'file-saver';
import { Button, LoadingOverlay, Select } from '@kubed/components';
import {
  AverageLoad,
  Label,
  PanelList,
  PanelPagination,
  PanelTitle,
  PanelToolbar,
  Paragraph,
  SortButton,
  ToolbarButton,
  ToolbarFilter,
  Wrapper,
} from './styles';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { metrics_filter, resource, sort_metric_options } = nodeRankStore;
const { useBaseRankList, handleResult } = rankStore;

function NodeRanking() {
  const { cluster } = useParams();
  const [sortMetric, setSortMetric] = useState(sort_metric_options[0]);
  const [sortType, setSortType] = useState<string>('desc');
  const {
    data = {},
    total,
    page,
    nextPage,
    prevPage,
    pageSize,
    isLoading,
    reFetch,
  } = useBaseRankList<any>({
    pathParams: {},
    params: {
      cluster,
      resource,
      limit: 5,
      sort_type: sortType,
      sort_metric: sortMetric,
      metrics_filter: hideGPUByLicense(metrics_filter, cluster!).join('|'),
    },
    options: {
      pageSize: 5,
    },
  });

  useEffect(() => {
    reFetch({
      sort_type: sortType,
      sort_metric: sortMetric,
    });
  }, [sortMetric, sortType]);

  const changeSortType = () => {
    setSortType(sortType === 'desc' ? 'asc' : 'desc');
  };

  const results = useMemo(() => {
    if (isEmpty(data)) {
      return {};
    }
    return handleResult(data);
  }, [data]);

  const download = (fileName: string) => {
    const json = JSON.stringify(results, null, 2);
    const blob = new Blob([json], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, fileName);
  };

  const options = hideGPUByLicense(sort_metric_options, cluster!).map((option: any) => ({
    value: option,
    label: t(`SORT_BY_${option.toUpperCase()}`),
  }));

  const iconWidth = 40;
  const rankTdWidth = 124;

  const toPercentage = (num: string) => {
    const number = Number(num) || 0;
    return `${Math.ceil(number * 100)}%`;
  };

  const canViewNode = hasPermission({
    cluster,
    module: 'nodes',
    action: 'view',
  });

  const columns: CellPropsColumn[] = [
    {
      width: iconWidth,
      field: 'icon',
      title: '',
      render() {
        return <Icon name="nodes" type="dark" size={40} />;
      },
    },
    {
      title: t('NODE'),
      field: 'node',
      render(value, node) {
        const link = get(node, 'role', []).includes('edge')
          ? `/clusters/${cluster}/edgenodes/${node.node}`
          : `/clusters/${cluster}/nodes/${node.node}`;

        return (
          <div>
            <h3>
              {canViewNode ? <Link to={link}>{node.node}</Link> : node.node}
              {node.role === 'master' && <Label>{t('CONTROL_PLANE')}</Label>}
            </h3>
            <Paragraph>{get(node, 'host_ip', '-')}</Paragraph>
          </div>
        );
      },
    },
    {
      field: 'cpu',
      width: rankTdWidth,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_cpu_utilisation' }),
      },
      // sort_metric: 'node_cpu_utilisation',
      title: t('CPU_USAGE'),
      render: (value, node) => {
        const unit = getSuitableUnit(node.node_cpu_total, 'cpu');
        return (
          <div>
            <h3>{toPercentage(node.node_cpu_utilisation)}</h3>
            <div>
              {getValueByUnit(node.node_cpu_usage, unit) || '-'}/{''}
              {getValueByUnit(node.node_cpu_total, unit) || '-'} {unit}
            </div>
          </div>
        );
      },
    },
    {
      width: rankTdWidth,
      field: 'cpu_load',
      title: <AverageLoad>{t('AVERAGE_CPU_LOAD')}</AverageLoad>,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_load1' }),
      },
      render: (value, node) => (
        <div>
          <h3>{(node.node_load1 && Number(node.node_load1).toFixed(2)) || '-'}</h3>
        </div>
      ),
    },
    {
      width: rankTdWidth,
      // sort_metric: 'node_memory_utilisation',
      title: t('MEMORY_USAGE'),
      field: 'Memory',
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_memory_utilisation' }),
      },
      render: (value, node) => (
        <div>
          <h3>{toPercentage(node.node_memory_utilisation)}</h3>
          <div>
            {getValueByUnit(node.node_memory_usage_wo_cache, 'Gi') || '-'}/
            {getValueByUnit(node.node_memory_total, 'Gi') || '-'} Gi
          </div>
        </div>
      ),
    },
    {
      width: rankTdWidth,
      title: t('GPU_USAGE'),
      field: 'GPU',
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_gpu_utilization' }),
      },
      render: (value, node) => {
        const unit = getSuitableUnit(node.node_gpu_total, 'gpu');

        return (
          <div>
            <h3>{toPercentage(node.node_gpu_utilization)}</h3>
            <div>
              {getValueByUnit(node.node_gpu_usage, unit) || '-'}/
              {getValueByUnit(node.node_gpu_total, unit) || '-'} {'GPU'}
            </div>
          </div>
        );
      },
    },
    {
      width: rankTdWidth,
      title: t('GPU_MEMORY_USAGE'),
      field: 'gpu_memory',
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_gpu_memory_utilization' }),
      },
      render: (value, node) => {
        const unit = 'Gi';

        return (
          <div>
            <h3>{toPercentage(node.node_gpu_memory_utilization)}</h3>
            <div>
              {getValueByUnit(node.node_gpu_memory_usage, unit) || '-'}/
              {getValueByUnit(node.node_gpu_memory_total, unit) || '-'} {unit}
            </div>
          </div>
        );
      },
    },
    {
      title: t('DISK_USAGE'),
      field: 'disk',
      // sort_metric: 'node_disk_size_utilisation',
      width: rankTdWidth,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_disk_size_utilisation' }),
      },
      render: (value, node) => (
        <div>
          <h3>{toPercentage(node.node_disk_size_utilisation)}</h3>
          <div>
            {getValueByUnit(node.node_disk_size_usage, 'GB') || '-'}/
            {getValueByUnit(node.node_disk_size_capacity, 'GB') || '-'} GB
          </div>
        </div>
      ),
    },
    {
      width: rankTdWidth,
      title: t('INODE_USAGE'),
      field: 'usage',
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_disk_inode_utilisation' }),
      },
      render: (value, node) => (
        <div>
          <h3>{toPercentage(node.node_disk_inode_utilisation)}</h3>
          <div>
            {node.node_disk_inode_usage || '-'}/{node.node_disk_inode_total || '-'}
          </div>
        </div>
      ),
    },
    {
      title: t('POD_USAGE'),
      field: 'Pod',
      width: rankTdWidth,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'node_pod_utilisation' }),
      },
      render: (value, node) => (
        <div>
          <h3>{toPercentage(node.node_pod_utilisation)}</h3>
          <div>
            {node.node_pod_running_count || '-'}/{node.node_pod_quota || '-'}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      <PanelTitle>{t('RESOURCE_USAGE_RANKING')}</PanelTitle>
      <PanelToolbar>
        <ToolbarFilter>
          <Select value={sortMetric} onChange={value => setSortMetric(value)} options={options} />
          <SortButton>
            <Icon
              name={sortType === 'desc' ? 'sort-descending' : 'sort-ascending'}
              type="coloured"
              size={16}
              onClick={changeSortType}
            />
          </SortButton>
        </ToolbarFilter>
        <ToolbarButton>
          <Button onClick={() => download('node.usage.rank.json')}>{t('EXPORT')}</Button>
        </ToolbarButton>
      </PanelToolbar>
      <PanelList>
        <LoadingOverlay visible={isLoading} />
        <RankTable data={results} columns={hideGPUByLicense(columns, cluster!)} />
      </PanelList>
      <PanelPagination>
        <Pagination
          totalCount={total}
          showTotal={false}
          onNextPage={nextPage}
          onPreviousPage={prevPage}
          page={page - 1}
          pageSize={pageSize}
        />
      </PanelPagination>
    </Wrapper>
  );
}

export default NodeRanking;
