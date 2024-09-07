/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useMemo, useState, forwardRef, useImperativeHandle, Ref } from 'react';
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { Card, LoadingOverlay, Select } from '@kubed/components';
import { Cluster, Refresh } from '@kubed/icons';

import { usePodsList } from '../../stores/pod';
import { useMonitorStore } from '../../stores/monitoring';
import { getApi } from '../../stores/monitoring/pod';
import { getParams, getPodMetrics, MetricTypes, ParamsType } from './utils';
import PodItem from './item';
import { hasKSModule, hideGPUByLicense } from '../../utils';
import {
  Body,
  Empty,
  Header,
  Actions,
  IconWrapper,
  SearchInput,
  ActionButton,
  SelectWrapper,
  StyledPagination,
} from './styles';

const CurrentSelect = styled(Select)<{ iconWidth?: number }>`
  width: 260px;
  margin-right: 12px;
  .kubed-select-selector {
    padding-left: 30px;
  }
`;

interface MonitorStoreProps {
  getApiFn?: (params: any) => any;
  getParamsFn?: (params: any) => any;
  handleParamsFn?: (params: any) => any;
}
interface Props {
  prefix?: string;
  title?: string;
  detail: Record<string, any>;
  details?: Record<any, any>;
  hideHeader?: boolean;
  hideFooter?: boolean;
  isFederated?: boolean;
  clusters?: string[];
  limit?: number;
  noWrapper?: boolean;
  monitorOptions?: MonitorStoreProps;
  queryOptions?: Record<string, any>;
  webSocketOptions?: Record<string, any>;
  onSearch?: (value: string) => void;
  onRefresh?: () => void;
  onPageChange?: (page: number) => void;
}

type PodsCardRefType = {
  reFetch: () => void;
};

function PodsCard(
  {
    title = 'PODS',
    detail,
    details = {},
    isFederated,
    prefix,
    clusters,
    hideHeader,
    hideFooter,
    noWrapper,
    limit = 10,
    queryOptions = {},
    monitorOptions = { getApiFn: getApi },
    onSearch,
    onRefresh,
    onPageChange,
  }: Props,
  ref: Ref<PodsCardRefType>,
) {
  const { fetchMetrics } = useMonitorStore(monitorOptions);
  const [expandItem, setExpandItem] = useState<string>('');
  const [selectCluster, setSelectCluster] = useState(isFederated ? clusters?.[0] : detail.cluster);
  const [params, setParams] = useState<ParamsType>(
    getParams(selectCluster, detail, details, isFederated),
  );
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (!isFederated) {
      return;
    }
    const clusterVal = isFederated ? clusters?.[0] : detail.cluster;
    setSelectCluster(clusterVal);
    setParams(getParams(selectCluster, detail, details, isFederated));
  }, [detail, details, isFederated]);

  const websocketUrl = useMemo(() => {
    const { namespace, labelSelector } = params;
    return `api/v1/watch${
      selectCluster ? `/klusters/${selectCluster}` : ''
    }/namespaces/${namespace}/pods?labelSelector=${labelSelector}`;
  }, [selectCluster, params]);

  const { data, page, isLoading, pageSize, total, reFetch, prevPage, nextPage, refresh } =
    usePodsList({
      params: { ...params, limit },
      queryOptions,
      webSocketOptions: {
        url: websocketUrl,
      },
    });

  useImperativeHandle(ref, () => ({
    reFetch: refresh,
  }));

  useEffect(() => {
    onPageChange?.(page + 1);
  }, [page]);

  const { data: podMetrics, isLoading: isMonitorLoading } = useQuery(
    ['podMetrics', data, params],
    async () => {
      const result = await fetchMetrics({
        step: '1m',
        times: 30,
        resources: data.map(item => item.name),
        metrics: Object.values(hideGPUByLicense(MetricTypes, selectCluster)),
        ...params,
      });
      return result;
    },
    {
      enabled: !!data && !!hasKSModule('whizard-monitoring'),
      refetchInterval: 5000,
    },
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
    reFetch({ name: value });
    onSearch?.(value);
  };

  const handleRefresh = () => {
    refresh();
    if (searchValue) onSearch?.(searchValue);
    else onRefresh?.();
  };

  const handleExpand = (uid: string) => {
    setExpandItem(expandItem === uid ? '' : uid);
  };

  const clusterOptions = useMemo(
    () =>
      clusters?.map(cluster => ({
        label: cluster,
        value: cluster,
      })),
    [clusters],
  );

  const handleClusterChange = (cluster: string) => {
    setSelectCluster(cluster);
    setParams(getParams(cluster, detail, details, isFederated));
  };

  const content = useMemo(() => {
    if (isLoading) return <LoadingOverlay visible />;
    return (
      <Body>
        {isEmpty(data) ? (
          <Empty>{t('NO_RESOURCE_FOUND')}</Empty>
        ) : (
          data.map(pod => (
            <PodItem
              key={pod.uid}
              prefix={isFederated ? `${prefix}/clusters/${selectCluster}` : prefix}
              detail={pod}
              metrics={getPodMetrics(pod, podMetrics)}
              loading={isMonitorLoading}
              expanded={expandItem === pod.uid}
              onExpand={handleExpand}
            />
          ))
        )}
      </Body>
    );
  }, [
    prefix,
    isFederated,
    data,
    podMetrics,
    isLoading,
    expandItem,
    selectCluster,
    isMonitorLoading,
  ]);

  if (noWrapper) {
    return content;
  }

  return (
    <Card sectionTitle={t(title)}>
      {!hideHeader && (
        <Header>
          {isFederated && (
            <SelectWrapper>
              <IconWrapper>
                <Cluster />
              </IconWrapper>
              <CurrentSelect
                value={selectCluster}
                options={clusterOptions}
                onChange={handleClusterChange}
              />
            </SelectWrapper>
          )}
          <SearchInput
            simpleMode
            placeholder={t('SEARCH_BY_NAME')}
            onChange={handleSearch}
            onInputChange={(keyword: string) => !keyword && handleSearch(keyword)}
          />
          <Actions>
            <ActionButton variant="text" onClick={handleRefresh}>
              <Refresh />
            </ActionButton>
          </Actions>
        </Header>
      )}
      {content}
      {!hideFooter && (
        <StyledPagination
          totalCount={total}
          showTotal
          onNextPage={nextPage}
          onPreviousPage={prevPage}
          page={page - 1}
          pageSize={pageSize}
        />
      )}
    </Card>
  );
}

export default forwardRef(PodsCard);
