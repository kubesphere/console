/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { saveAs } from 'file-saver';
import {
  rankStore,
  projectRankStore,
  Icon,
  getSuitableValue,
  Pagination,
  RankTable,
  CellPropsColumn,
  hideGPUByLicense,
} from '@ks-console/shared';
import { Button, Field, LoadingOverlay, Select } from '@kubed/components';
import {
  PanelList,
  PanelPagination,
  PanelToolbar,
  SortButton,
  ToolbarButton,
  ToolbarFilter,
  Wrapper,
} from '../../../Cluster/Ranking/styles';
import { Project } from '@kubed/icons';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { metrics_filter, sort_metric_options, getApi } = projectRankStore;
const { useBaseRankList, handleResult } = rankStore;

type ProjectPathParams = {
  cluster?: string;
  workspace?: string;
};

function ProjectRanking({ cluster, workspace }: { cluster?: string; workspace?: string }) {
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
  } = useBaseRankList<any, ProjectPathParams>({
    getApiFn: getApi,
    pathParams: {},
    params: {
      cluster,
      workspace,
      limit: 10,
      sort_type: sortType,
      sort_metric: sortMetric,
      metrics_filter: metrics_filter.join('|'),
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

  const rankTdWidth = 124;

  const prefix = `${workspace ? `/${workspace}` : ''}/clusters/${cluster}/projects`;

  const columns: CellPropsColumn[] = [
    {
      field: 'namespace',
      title: t('PROJECT'),
      render(namespace) {
        return (
          <Field
            avatar={<Project size={40} />}
            value={<Link to={`${prefix}/${namespace}`}>{namespace}</Link>}
          />
        );
      },
    },
    {
      title: t('CPU_USAGE'),
      field: 'cpu',
      width: rankTdWidth,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'namespace_cpu_usage' }),
      },
      render(value, node) {
        return (
          <div>
            <h3>{getSuitableValue(node.namespace_cpu_usage, 'cpu', '-')}</h3>
            <div>
              {t('QUOTA_VALUE', {
                value: getSuitableValue(node.namespace_cpu_limit_hard, 'cpu', '-'),
              })}
            </div>
          </div>
        );
      },
    },
    {
      field: 'memory',
      width: rankTdWidth,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'namespace_memory_usage_wo_cache' }),
      },
      title: t('MEMORY_USAGE'),
      render: (value, node) => {
        return (
          <div>
            <h3>{getSuitableValue(node.namespace_memory_usage_wo_cache, 'memory', '-')}</h3>
            <div>
              {t('QUOTA_VALUE', {
                value: getSuitableValue(node.namespace_memory_limit_hard, 'memory', '-'),
              })}
            </div>
          </div>
        );
      },
    },
    {
      field: 'gpu',
      width: rankTdWidth,
      title: <div>{t('GPU_USAGE')}</div>,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'namespace_gpu_usage' }),
      },
      render: (value, node) => (
        <div>
          <h3>{getSuitableValue(node.namespace_gpu_usage, 'gpu', '-')}</h3>
          <div>
            {t('QUOTA_VALUE', {
              value: getSuitableValue(node.namespace_gpu_limit_hard, 'gpu', '-'),
            })}
          </div>
        </div>
      ),
    },
    {
      field: 'gpu_memory',
      width: rankTdWidth,
      title: <div>{t('GPU_MEMORY_USAGE')}</div>,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'namespace_gpu_memory_usage' }),
      },
      render: (value, node) => (
        <div>
          <h3>{getSuitableValue(node.namespace_gpu_memory_usage, 'memory', '-')}</h3>
        </div>
      ),
    },
    {
      width: rankTdWidth,
      field: 'pod',
      title: t('POD_COUNT'),
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'namespace_pod_count' }),
      },
      render: (value, node) => (
        <div>
          <h3>{node.namespace_pod_count || '-'}</h3>
          <div>{t('QUOTA_VALUE', { value: node.namespace_pods_hard || '-' })}</div>
        </div>
      ),
    },
    {
      width: rankTdWidth,
      title: t('OUTBOUND_TRAFFIC'),
      field: 'namespace_net_bytes_transmitted',
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'namespace_net_bytes_transmitted' }),
      },
      render: (value, node) => (
        <div>
          <h3>{getSuitableValue(node.namespace_net_bytes_transmitted, 'bandwidth', '-')}</h3>
        </div>
      ),
    },
    {
      title: t('INBOUND_TRAFFIC'),
      field: 'namespace_net_bytes_received',
      // sort_metric: 'node_disk_size_utilisation',
      width: rankTdWidth,
      cellProps: {
        className: classNames({ rankCol: sortMetric === 'namespace_net_bytes_received' }),
      },
      render: (value, node) => (
        <div>
          <h3>{getSuitableValue(node.namespace_net_bytes_received, 'bandwidth', '-')}</h3>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
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
          <Button onClick={() => download('project.usage.rank.json')}>{t('EXPORT')}</Button>
        </ToolbarButton>
      </PanelToolbar>
      <PanelList>
        <LoadingOverlay visible={isLoading} />
        <RankTable data={results} columns={hideGPUByLicense(columns, cluster!)} />
        {/* TODO: */}
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

export default ProjectRanking;
